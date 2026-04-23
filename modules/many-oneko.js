import { quadtree } from "./d3-quadtree.js";

export async function loadSpriteImageBitmaps() {
  const img = new Image();
  img.src = "/oneko.gif";
  const onloadPromise = new Promise((resolve, reject) => {
    img.onload = function () {
      resolve(img);
    };
  });
  const loadedImg = await onloadPromise;

  // Sprite sheet is 8 across, 4 down
  const bitMaps = new Array(8);
  for (let xIdx = 0; xIdx < 8; xIdx++) {
    const bitMapColumn = new Array(4);
    for (let yIdx = 0; yIdx < 4; yIdx++) {
      const bitmap = await window.createImageBitmap(
        loadedImg,
        xIdx * spriteDimensionPx,
        yIdx * spriteDimensionPx,
        spriteDimensionPx,
        spriteDimensionPx,
      );
      bitMapColumn[yIdx] = bitmap;
    }
    bitMaps[xIdx] = bitMapColumn;
  }

  return bitMaps;
}

export class OnekoCanvas {
  #howMany;
  #canvasEl;
  #ctx;
  #spriteBitmaps;

  #nekoPositionX;
  #nekoPositionY;

  #nekoState;
  #nekoIdleState;

  #nekoTimeInState;
  #nekoFramesInState;
  #nekoTimeInIdleState;

  #mousePositionX;
  #mousePositionY;

  #lastTimestamp;

  #nekoQuadtree;

  constructor(canvasEl, howMany, spriteBitmaps) {
    this.#howMany = howMany;
    this.#canvasEl = canvasEl;
    this.#ctx = canvasEl.getContext("2d");
    // May still be required, but was especially needed when we rendered sprites directly from
    // sheet. Now we're using the image bitmaps which already have the sprites sliced out.
    this.#ctx.imageSmoothingEnabled = false;
    this.#spriteBitmaps = spriteBitmaps;

    this.#nekoPositionX = new Float64Array(howMany);
    this.#nekoPositionY = new Float64Array(howMany);

    this.#nekoState = new Uint8Array(howMany);
    this.#nekoState.fill(idleStateInt);
    this.#nekoIdleState = new Uint8Array(howMany);
    this.#nekoIdleState.fill(idleStateInt);


    this.#nekoTimeInState = new Float64Array(howMany);
    // This way all nekos alert on page load
    this.#nekoTimeInState.fill(minTimeInIdleToAlert);
    this.#nekoFramesInState = new Float64Array(howMany);
    this.#nekoTimeInIdleState = new Float64Array(howMany);

    this.#mousePositionX = canvasEl.width / 2;
    this.#mousePositionY = canvasEl.height / 2;

    this.#lastTimestamp = undefined;

    this.#shuffleNekoPositions();

    // Build outline of 
    const nekoIndices = Array.from(Array(this.#howMany).keys());
    const xAccessor = (idx) => {
      return this.#nekoPositionX[idx];
    };
    const yAccessor = (idx) => {
      return this.#nekoPositionY[idx];
    };
    this.#nekoQuadtree = quadtree(nekoIndices, xAccessor.bind(this), yAccessor.bind(this));
  }

  #rebuildQuadtree() {
    this.#nekoQuadtree.clear();
    const nekoIndices = Array.from(Array(this.#howMany).keys());
    this.#nekoQuadtree.addAll(nekoIndices);
  }

  updateMousePosition(posX, posY) {
    this.#mousePositionX = posX;
    this.#mousePositionY = posY;
  }

  #shuffleNekoPositions() {
    for (let idx = 0; idx < this.#howMany; idx++) {
      this.#nekoPositionX[idx] = Math.random() * this.#canvasEl.width;
      this.#nekoPositionY[idx] = Math.random() * this.#canvasEl.height;
    }
  }

  #updateNekoPositionsAndState(elapsedTime) {
    this.#rebuildQuadtree();

    for (let idx = 0; idx < this.#howMany; idx++) {
      const xPos = this.#nekoPositionX[idx];
      const yPos = this.#nekoPositionY[idx];

      const diffX = xPos - this.#mousePositionX;
      const diffY = yPos - this.#mousePositionY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
      const currentStateInt = this.#nekoState[idx];
      const currentState = nekoStateIntToName(currentStateInt);
      const timeInState = this.#nekoTimeInState[idx];

      // If mouse is within a small range
      if (distance <= nekoSpeed || distance <= minDistanceToMove) {
        this.#setNekoState(idx, idleStateInt, elapsedTime);
        
        // Do idle animations
        if (currentStateInt == idleStateInt) {
          // State transitions:
          //  - idle -> tired [75%]
          //  - idle -> scratch (self or wall if nearby) [25%]
          //  - tired -> sleep [after 2.5 seconds]
          //  - sleep -> idle [after 20 seconds] 
          //  - scratch -> idle [after 1 second]
          const rand = Math.random();
          const currentIdleStateInt = this.#nekoIdleState[idx];
          const timeInIdleState = this.#nekoTimeInIdleState[idx];
          
          switch (currentIdleStateInt) {
            case idleStateInt:
              if (timeInIdleState > millisInIdleBeforeTransition) {
                if (rand <= 0.75) {
                  this.#nekoIdleState[idx] = tiredStateInt;
                } else {
                  const scratchOptions = [scratchSelfStateInt];
                  if (xPos < distanceToWallForScratch) {
                    scratchOptions.push(scratchWallWStateInt);
                  }
                  if (yPos < distanceToWallForScratch) {
                    scratchOptions.push(scratchWallNStateInt);
                  }
                  if (xPos > (this.#canvasEl.width - distanceToWallForScratch)) {
                    scratchOptions.push(scratchWallEStateInt);
                  }
                  if (yPos > (this.#canvasEl.height - distanceToWallForScratch)) {
                    scratchOptions.push(scratchWallSStateInt);
                  }
                  // Randomly select a possible scratch state
                  this.#nekoIdleState[idx] = scratchOptions[Math.floor(Math.random() * scratchOptions.length)];
                }
                this.#nekoTimeInIdleState[idx] = 0;
              }
              break;
            case tiredStateInt:
              if (timeInIdleState > millisInTiredBeforeSleep) {
                this.#nekoIdleState[idx] = sleepingStateInt;
                this.#nekoTimeInIdleState[idx] = 0;
              }
              break;
            case sleepingStateInt:
              if (timeInIdleState > millisInSleepBeforeIdle) {
                this.#nekoIdleState[idx] = idleStateInt;
                this.#nekoTimeInIdleState[idx] = 0;
              }
              break;
            case scratchSelfStateInt:
            case scratchWallWStateInt:
            case scratchWallNStateInt:
            case scratchWallEStateInt:
            case scratchWallSStateInt:
              if (timeInIdleState > millisInScratchBeforeIdle) {
                this.#nekoIdleState[idx] = idleStateInt;
                this.#nekoTimeInIdleState[idx] = 0;
              }
              break;
            default:
              break;
          }
        }

        continue;
      }
      // Otherwise we may need to move

      // If neko was idle for a long enough time, move to alert for a specific duration.
      if (
        (currentStateInt == idleStateInt && timeInState >= minTimeInIdleToAlert) ||
        (currentStateInt == alertStateInt && timeInState < alertDuration)
      ) {
        this.#setNekoState(idx, alertStateInt, elapsedTime);
        continue;
      }

      let direction;
      direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      this.#setNekoState(idx, nekoStateNameToInt(direction), elapsedTime);

      const otherNekosWithinRange = this.#lookupNekosWithinBox(xPos - nekoPushOtherRadius, yPos - nekoPushOtherRadius, xPos + nekoPushOtherRadius, yPos + nekoPushOtherRadius);
      if (otherNekosWithinRange.length > 1) {
        // Remove this neko from list
        otherNekosWithinRange.splice(otherNekosWithinRange.findIndex((otherNekoIdx) => {
          return otherNekoIdx == idx;
        }), 1);

        // Calculate an average vector for all the distances from other nekos to current neko and normalize it
        let sumDiffX = 0;
        let sumDiffY = 0;
        for (const otherNekoIdx of otherNekosWithinRange) {
          sumDiffX += xPos - this.#nekoPositionX[otherNekoIdx];
          sumDiffY += yPos - this.#nekoPositionY[otherNekoIdx];
        }
        sumDiffX /= otherNekosWithinRange.length;
        sumDiffY /= otherNekosWithinRange.length;
        const diffNorm = Math.sqrt(sumDiffX ** 2 + sumDiffY ** 2);
        sumDiffX /= diffNorm;
        sumDiffY /= diffNorm;
        sumDiffX *= nekoPushOtherForce;
        sumDiffY *= nekoPushOtherForce;

        // Move current neko away from other nekos a little bit
        this.#nekoPositionX[idx] += sumDiffX;
        this.#nekoPositionY[idx] += sumDiffY;
      }

      // Move neko towards the mouse position
      this.#nekoPositionX[idx] -= (diffX / distance) * nekoSpeed;
      this.#nekoPositionY[idx] -= (diffY / distance) * nekoSpeed;

      // Prevent neko from going outside canvas
      this.#nekoPositionX[idx] = Math.min(
        Math.max(spriteHalfDimensionPx, this.#nekoPositionX[idx]),
        this.#canvasEl.width - spriteHalfDimensionPx,
      );
      this.#nekoPositionY[idx] = Math.min(
        Math.max(spriteHalfDimensionPx, this.#nekoPositionY[idx]),
        this.#canvasEl.height - spriteHalfDimensionPx,
      );
    }
  }

  #lookupNekosWithinBox(xmin, ymin, xmax, ymax) {
    const results = [];
    this.#nekoQuadtree.visit((node, x1, y1, x2, y2) => {
      if (!node.length) {
        do {
          const idx = node.data;
          const xPos = this.#nekoPositionX[idx];
          const yPos = this.#nekoPositionY[idx];
          if (xPos >= xmin && xPos < xmax && yPos >= ymin && yPos < ymax) {
            results.push(idx);
          }
        } while (node = node.next);
      }
      return x1 >= xmax || y1 >= ymax || x2 < xmin || y2 < ymin;
    });
    return results;
  }

  #setNekoState(nekoIdx, newState, elapsedTime) {
    const previousState = this.#nekoState[nekoIdx];
    if (previousState == newState) {
      this.#nekoTimeInState[nekoIdx] += elapsedTime;
      this.#nekoFramesInState[nekoIdx] += 1;

      if (newState == idleStateInt) {
        this.#nekoTimeInIdleState[nekoIdx] += elapsedTime;
      }
    } else {
      this.#nekoState[nekoIdx] = newState;
      this.#nekoTimeInState[nekoIdx] = 0;
      this.#nekoFramesInState[nekoIdx] = 0;

      if (newState == idleStateInt) {
        this.#nekoTimeInIdleState[nekoIdx] = 0;
      }

      if (previousState == idleStateInt) {
        this.#nekoIdleState[nekoIdx] = idleStateInt;
      }
    }
  }

  #renderFrame() {
    this.#ctx.clearRect(0, 0, this.#canvasEl.width, this.#canvasEl.height);
    for (let idx = 0; idx < this.#howMany; idx++) {
      const nekoFrame = this.#nekoFramesInState[idx];
      const nekoState = this.#nekoState[idx];
      let nekoStateName;
      if (nekoState == idleStateInt) {
        nekoStateName = nekoStateIntToName(this.#nekoIdleState[idx]);
      } else {
        nekoStateName = nekoStateIntToName(nekoState);
      }
      this.#drawSprite(
        nekoStateName,
        nekoFrame,
        this.#nekoPositionX[idx],
        this.#nekoPositionY[idx],
      );
    }
  }

  #drawSprite(stateName, frame, centerX, centerY) {
    const sprite = spriteSets[stateName][frame % spriteSets[stateName].length];
    this.#ctx.drawImage(
      this.#spriteBitmaps[sprite[0]][sprite[1]],
      centerX - spriteHalfDimensionPx,
      centerY - spriteHalfDimensionPx,
    );
  }

  onAnimationFrame(timestamp) {
    if (this.#lastTimestamp == undefined) {
      this.#lastTimestamp = timestamp;
    }
    const elapsedTime = timestamp - this.#lastTimestamp;
    // Only actually update position and render a new frame if sufficient time has passed
    if (elapsedTime < millisBetweenUpdate) {
      return;
    }

    this.#updateNekoPositionsAndState(elapsedTime);
    this.#renderFrame();
    this.#lastTimestamp = timestamp;
  }
}

const nekoPushOtherForce = 5;
const nekoPushOtherRadius = 32;
const alertDuration = 500;
const minTimeInIdleToAlert = 50;
const minDistanceToMove = 48;
const spriteDimensionPx = 32;
const spriteHalfDimensionPx = 16;
const millisBetweenUpdate = 75;
const nekoSpeed = 10;
const distanceToWallForScratch = 32;

// Idle timings
const millisInIdleBeforeTransition = 1000;
const millisInTiredBeforeSleep = 2500;
const millisInSleepBeforeIdle = 20000;
const millisInScratchBeforeIdle = 1000;

const spriteSets = {
  idle: [[3, 3]],
  alert: [[7, 3]],
  scratchSelf: [
    [5, 0],
    [6, 0],
    [7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, 1],
  ],
  scratchWallS: [
    [7, 1],
    [6, 2],
  ],
  scratchWallE: [
    [2, 2],
    [2, 3],
  ],
  scratchWallW: [
    [4, 0],
    [4, 1],
  ],
  tired: [[3, 2]],
  sleeping: [
    [2, 0],
    [2, 1],
  ],
  N: [
    [1, 2],
    [1, 3],
  ],
  NE: [
    [0, 2],
    [0, 3],
  ],
  E: [
    [3, 0],
    [3, 1],
  ],
  SE: [
    [5, 1],
    [5, 2],
  ],
  S: [
    [6, 3],
    [7, 2],
  ],
  SW: [
    [5, 3],
    [6, 1],
  ],
  W: [
    [4, 2],
    [4, 3],
  ],
  NW: [
    [1, 0],
    [1, 1],
  ],
};
const nekoStates = Object.keys(spriteSets);

const idleStateInt = nekoStateNameToInt("idle");
const alertStateInt = nekoStateNameToInt("alert");
const tiredStateInt = nekoStateNameToInt("tired");
const sleepingStateInt = nekoStateNameToInt("sleeping");
const scratchSelfStateInt = nekoStateNameToInt("scratchSelf");
const scratchWallWStateInt = nekoStateNameToInt("scratchWallW");
const scratchWallNStateInt = nekoStateNameToInt("scratchWallN");
const scratchWallEStateInt = nekoStateNameToInt("scratchWallE");
const scratchWallSStateInt = nekoStateNameToInt("scratchWallS");

function nekoStateNameToInt(stateName) {
  const foundIdx = nekoStates.indexOf(stateName);
  if (foundIdx == -1) {
    throw new Error(`Could not translate state '${stateName}' to int`);
  }
  return foundIdx;
}

function nekoStateIntToName(stateInt) {
  return nekoStates[stateInt];
}
