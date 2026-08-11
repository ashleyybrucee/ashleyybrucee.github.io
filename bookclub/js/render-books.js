// render-books.js
// Shared functions for turning book data objects into <tr> rows
// and injecting them into a table's <tbody>.

/**
 * Build a row for a "simple" book list (used by Current/Voting books
 * and Past Suggestions — same 4 columns: cover, title/desc, author, pages).
 *
 * Expected book shape:
 * {
 *   cover: "./book-covers/some-book.jpg",
 *   alt: "Book cover of ... shows ...",
 *   title: "Book Title",
 *   description: "One or two sentence blurb.",
 *   author: "Author Name",
 *   pages: 320
 * }
 */
function simpleBookRow(book) {
  return `
    <tr>
      <td>
        <img src="${book.cover}" alt="${book.alt}" />
      </td>
      <td>
        ${book.title}
        <hr />
        <p>${book.description}</p>
      </td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
    </tr>
  `;
}

/**
 * Build a row for the "Previously Read Books" list, which has an extra
 * Date Read column up front and an optional discussion questions link.
 *
 * Expected book shape:
 * {
 *   dateRead: "August 4, 2026",
 *   cover: "./book-covers/some-book.jpg",
 *   alt: "Book cover of ... shows ...",
 *   title: "Book Title",
 *   description: "One or two sentence blurb.",
 *   author: "Author Name",
 *   pages: 320,
 *   discussionQuestions: "./discussion-questions/some-book-dq.pdf" // optional
 * }
 */
function pastBookRow(book) {
  const dqLink = book.discussionQuestions
    ? `<a target="_blank" href="${book.discussionQuestions}">Discussion questions.</a>`
    : "";

  return `
    <tr>
      <td>${book.dateRead}</td>
      <td>
        <img src="${book.cover}" alt="${book.alt}" />
      </td>
      <td>
        <div class="cell-flex">
          ${book.title}
          <hr />
          <p>${book.description}</p>
          ${dqLink}
        </div>
      </td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
    </tr>
  `;
}

/**
 * Render a list of books into the <tbody> of the table that lives inside
 * the element with id = containerId.
 *
 * @param {string} containerId - id of the wrapping div, e.g. "current-books"
 * @param {Array}  books       - array of book data objects
 * @param {Function} rowFn     - simpleBookRow or pastBookRow
 */
function renderBookList(containerId, books, rowFn) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`renderBookList: no element found with id "${containerId}"`);
    return;
  }
  const tbody = container.querySelector("tbody");
  if (!tbody) {
    console.warn(`renderBookList: no <tbody> found inside #${containerId}`);
    return;
  }
  tbody.innerHTML = books.map(rowFn).join("");
}