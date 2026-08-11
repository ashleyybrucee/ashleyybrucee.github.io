// suggested-books.js
// The archive of every book that's been suggested in the past, whether
// or not it won the vote. Add a new object here whenever a suggestion
// doesn't win, so it stays in the running for later.
//
// Note: cover paths use "../book-covers/..." since this data is loaded
// from past-suggestions/index.html, one directory below the site root.

const suggestedBooks = [
  {
    cover: "../book-covers/rose-house.jpg",
    alt: "Book cover of Rose/House shows a glass rose with a stem made of wires and a core of concrete.",
    title: "Rose/House",
    description: "Sentient house reports a murder. What happens next?",
    author: "Arkady Martine",
    pages: 115,
  },
  {
    cover: "../book-covers/psalm-for-the-wild-built.jpg",
    alt: "Book cover for A Psalm for the Wild-Built shows a robot and tea-seller on a winding path.",
    title: "A Psalm for the Wild-Built",
    description:
      "A tea monk meets an unexpected robot. Very cozy and heartwarming.",
    author: "Becky Chambers",
    pages: 151,
  },
  {
    cover: "../book-covers/a-wizard-of-earthsea.jpg",
    alt: "Book cover for A Wizard of Earthsea shows an ancient city on the water.",
    title: "A Wizard of Earthsea (Earthsea #1)",
    description: "The makings of the greatest sorcerer in Earthsea.",
    author: "Ursula Le Guin",
    pages: 183,
  },
  {
    cover: "../book-covers/project-hail-mary.jpg",
    alt: "Book cover of Project Hail Mary shows an astronaut on a tether out of control.",
    title: "Project Hail Mary",
    description: "A lone astronaut on a last-chance mission.",
    author: "Andy Weir",
    pages: 476,
  },
  {
    cover: "../book-covers/the-long-way-to-a-small-angry-planet.jpg",
    alt: "Book cover of The Long Way to a Small Angry Planet shows a sci-fi ship in front of a planet.",
    title: "The Long Way to a Small, Angry Planet",
    description: "Cast of unique characters on a small space ship.",
    author: "Becky Chambers",
    pages: 518,
  },
  {
    cover: "../book-covers/ancillary-justice.jpg",
    alt: "Book cover of Ancillary Justice shows two red & white sci-fi fighter ships racing past a larger ship.",
    title: "Ancillary Justice (Imperial Radch #1)",
    description: "Soldier on a quest for revenge.",
    author: "Anne Leckie",
    pages: 386,
  },
  {
    cover: "../book-covers/i-robot.jpg",
    alt: "Book cover of I, Robot shows a robot with wires all around it.",
    title: "I, Robot",
    description:
      "A collection of interconnected short stories exploring the ethical, logical, and societal implications of Artificial Intelligence.",
    author: "Isaac Asimov",
    pages: 224,
  },
  {
    cover: "../book-covers/eleanor-oliphant.jpg",
    alt: "Book cover of Eleanor Oliphant is Completely Fine shows a woman with her arms crossed.",
    title: "Eleanor Oliphant Is Completely Fine",
    description:
      "Eleanor Oliphant, a socially awkward woman with a traumatic past, lives a regimented, lonely life until she and a new colleague help an elderly man — leading to a journey of friendship, healing, and self-discovery.",
    author: "Gail Honeyman",
    pages: 390,
  },
  {
    cover: "../book-covers/girl-with-all-the-gifts.jpg",
    alt: "Book cover of The Girl With All the Gifts shows the silhouette of a young girl with her arms spread wide.",
    title: "The Girl with All the Gifts",
    description:
      "A post-apocalyptic science fiction novel about a special 10-year-old girl with unique intelligence living in a military base under strict supervision.",
    author: "Mike Carey",
    pages: 461,
  },
  {
    cover: "../book-covers/library-at-mount-char.jpg",
    alt: "Book cover of The Library at Mount Char shows a dark house with its lights on as seen through a hole in a book.",
    title: "The Library at Mount Char",
    description:
      'Twelve children are taken from Earth and each trained in a specialized "catalog" of cosmic knowledge by a god-like figure. After he disappears, his trainees fight over his legacy.',
    author: "Scott Hawkins",
    pages: 390,
  },
  {
    cover: "../book-covers/piranesi.jpg",
    alt: "Book cover of Piranesi shows a Satyr playing a horn on a column in the sky.",
    title: "Piranesi",
    description:
      "Piranesi lives in an endless labyrinth of grand halls, filled with countless rooms, and thousands upon thousands of unique statues. As strange clues begin to surface, he starts uncovering secrets about the house - and himself.",
    author: "Susanna Clarke",
    pages: 245,
  },
  {
    cover: "../book-covers/hobbit.jpg",
    alt: "Book cover of The Hobbit shows a stylistic portrait of some mountains.",
    title: "The Hobbit",
    description:
      "Bilbo Baggins, a comfort-loving hobbit, is reluctantly pulled into a quest with a band of dwarves seeking to reclaim their homeland.",
    author: "J.R.R Tolkien",
    pages: 366,
  },
  {
    cover: "../book-covers/north-woods.jpg",
    alt: "Book cover of The North Woods shows a mountain lion like cat lying on the ground.",
    title: "The North Woods",
    description:
      "Centered around a single house in the woods of New England, this novel follows generations of people whose lives intersect across centuries. Blends history, nature, and interconnected human stories.",
    author: "Daniel Mason",
    pages: 372,
  },
  {
    cover: "../book-covers/fifth-season.jpg",
    alt: "Book cover of The Fifth Season shows a rusted stonework.",
    title: "The Fifth Season (The Broken Earth #1)",
    description:
      "Essun comes home to find her husband has brutally murdered their son and kidnapped their daughter. In the middle of a disastrous apocalypse, Essun goes out to find her daughter.",
    author: "N.K. Jemisin",
    pages: 468,
  },
  {
    cover: "../book-covers/alchemist.jpg",
    alt: "Book cover of The Alchemist shows a styliszed map in the center of a sun.",
    title: "The Alchemist",
    description:
      "Santagio, a shepherd boy, travels the world in search of treasure. Is it really about the destination, or the journey?",
    author: "Paulo Coelho",
    pages: 182,
  },
  {
    cover: "../book-covers/handmaids-tale.jpg",
    alt: "Book cover of Handmaid's Tale shows a stylized handmaiden in red.",
    title: "The Handmaid's Tale",
    description:
      "A future United States is struggling with declining birthrate, and reverts to a society of repressive intolerance.",
    author: "Margaret Atwood",
    pages: 320,
  },
  {
    cover: "../book-covers/ready-player-one.jpg",
    alt: 'Book cover of Ready Player One is the title written in yellow on a red background.',
    title: "Ready Player One",
    description:
      'When the creator of a massive virtual utopia dies, he leaves his entire fortune to whoever can find them, via a series of "Easter Eggs". Wade Watts stumbles upon the first clue.',
    author: "Ernest Cline",
    pages: 480,
  },
  {
    cover: "../book-covers/blood-over-bright-haven.jpg",
    alt: "Book cover of The Blood over Bright Haven shows a flame over a typewriter",
    title: "Blood over Bright Haven",
    description:
      'A "dark academia" novel about the first woman ever admitted to a prestigious order of mages who unravels a secret conspiracy that could change the practice of magic forever. Lots of great themes in here about power, exploitation, race and class. The magic system will appeal to software engineers.',
    author: "M.L. Wang",
    pages: 428,
  },
  {
    cover: "../book-covers/sublimation.JPG",
    alt: "Book cover of Sublimation shows a mirrored image of a woman walking away from the center of the cover.",
    title: "Sublimation",
    description:
      'The debut sci-fi novel that explores immigration through a speculative lens where emigrating creates a second, identical "instance" of a person, one who stays behind while the other moves on. If you were a fan of the tv show Severance, this has similar vibes!',
    author: "Isabel J. Kim",
    pages: 368,
  },
  {
    cover: "../book-covers/death-of-the-author.jpg",
    alt: "Book cover of Death of the Author shows a picture of the autor bordered by stylized hardware.",
    title: "Death of the Author",
    description:
      "From the same author who wrote the Binti series, this sci-fi novel follows the story of a disabled Nigerian-American writer, Zelu, who finds fame after writing a sci-fi novel, Rusted Robots, about androids and AI. The lines between her novel and her life begin to blur and explores the role of technology shaping humanity.",
    author: "Nnedi Okorafor",
    pages: 448,
  },
  {
    cover: "../book-covers/elder-race.png",
    alt: "Book cover of Elder Race shows an enormous tower from across rolling hills.",
    title: "Elder Race",
    description:
      "A short novella but very rich! It blends science fiction and fantasy, telling the same story from two different perspectives: a fantasy-style narrative of a princess seeking a sorcerer to fight a demon, and a science fiction narrative of an anthropologist studying a primitive culture while dealing with a technological threat (a virus) that the locals perceive as supernatural.",
    author: "Adrian Tchaikovsky",
    pages: 199,
  },
  {
    cover: "../book-covers/audition-for-the-fox.jpg",
    alt: "Book cover of Audution for the Fox shows a stylized fox prancing.",
    title: "Audition for the Fox",
    description:
      "A trickster fox god challenges an under achieving acolyte to save herself by saving her own ancestors.",
    author: "Martin Cahill",
    pages: 192,
  },
  {
    cover: "../book-covers/diamond-age.jpg",
    alt: "Book cover of Diamond Age shows a sci-fi woman next to some gears.",
    title: "The Diamond Age",
    description:
      "A coming of age story focused on a young girl named Nell, set in a future world in which nanotechnology affects all aspects of life.",
    author: "Neal Stephenson",
    pages: 499,
  },
  {
    cover: "../book-covers/ministry-for-the-future.jpg",
    alt: "Book cover of Ministry for the Future shows a person standing in a big ship with the sky in the background.",
    title: "The Ministry for the Future",
    description:
      "A story that follows a new UN agency fighting to fix climate change.",
    author: "Kim Stanley Robinsone",
    pages: 563,
  },
  {
    cover: "../book-covers/labyrinths.jpg",
    alt: "Book cover of Labryrinths shows a piece of paper with writing on it twisted to form a neverending path.",
    title: "Labryrinths",
    description:
      "A collection of short stories that explores philosophical paradoxes, infinite libraries, shifting realities, and the mazes of time and memory.",
    author: "Jorge Luis Borges",
    pages: 260,
  },
  {
    cover: "../book-covers/paper-menagerie.jpg",
    alt: "Book cover of Paper Menagerie shows a paper tiger.",
    title: "Paper Menagerie and Other Stories",
    description:
      "A collection of short stories that explore love, race, history, and technology.",
    author: "Ken Liu",
    pages: 450,
  },
];