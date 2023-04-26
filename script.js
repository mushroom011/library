let myLibrary = [
    {id: 1, title: 'Duma Key', author: 'Stephen King', pages: 607, isRead: true},
    {id: 2, title: 'Harry Potter and the Deathly Hallows', author: 'J. K. Rowling', pages: 607, isRead: true},
    {id: 3, title: 'Revival', author: 'Stephen King', pages: 403, isRead: false},
    {id: 4, title: 'A Game of Thrones', author: 'George R. R. Martin', pages: 694, isRead: true},
    {id: 5, title: 'Harry Potter and the Half-Blood Prince', author: 'J. K. Rowling', pages: 607, isRead: true}
];

function Book(title, author, pages, isRead = false) {
    this.id = Math.floor(Math.random() * 1000) + '_' + title + '_' + author;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleIsRead = function () {
    this.isRead = !this.isRead;
}

const addBookToLibrary = (newBook) => myLibrary.push(newBook);

const addBookHandler = (e) => {
    e.preventDefault();
    const bookForm = document.querySelector('#bookForm');
    const formData = new FormData(bookForm);
    const fromEntries = Object.fromEntries(formData);

    addBookToLibrary(new Book(fromEntries.title, fromEntries.author, fromEntries.pages, !!fromEntries?.isRead))

    renderBooks(myLibrary)
}

const addBookBtn = document.querySelector('#addBook');
addBookBtn.addEventListener('click', addBookHandler);

const deleteBook = (bookId) => {
    myLibrary = myLibrary.filter(book => book.id !== bookId);
    renderBooks(myLibrary);
}

const createTdWithText = (text) => {
    const bookTd = document.createElement('td');
    bookTd.innerText = text;
    return bookTd;
}

const createTdWithCheckbox = (isRead) => {
    const td = document.createElement('td');
    const checked = isRead ? 'checked' : null;

    td.innerHTML = `<label class="checkbox">
        <input name="isRead" type="checkbox" ${checked}>
            <span></span>
    </label>`;

    return td;
}

const createBookTdWithDeleteBtn = (bookId) => {
    const bookDeleteTd = document.createElement('td');
    const bookDeleteButton = document.createElement('button');
    bookDeleteButton.setAttribute('class', 'btn')
    bookDeleteButton.textContent = 'delete';
    bookDeleteButton.addEventListener('click', () => deleteBook(bookId))
    bookDeleteTd.appendChild(bookDeleteButton);
    return bookDeleteTd;
}

const createBookNode = (book) => {
    const bookTr = document.createElement('tr');
    const tds = [];

    for(let prop in book) {
        if(prop === 'id') continue;
        if(prop === 'isRead'){
            tds.push(createTdWithCheckbox(book.isRead));
        } else if(book.hasOwnProperty(prop)){
            tds.push(createTdWithText(book[prop]));
        }
    }

    tds.forEach(td => bookTr.appendChild(td));

    bookTr.appendChild(createBookTdWithDeleteBtn(book.id));
    bookTr.setAttribute('data-bookId', book.id)
    return bookTr;
}

const renderBooks = (booksList) => {
    const booksNods = [];
    for (let i = booksList.length - 1; i > 0; i--) {
        booksNods.push(createBookNode(booksList[i]));
    }

    const booksContainer = document.querySelector('#booksContainer');
    booksContainer.replaceChildren(...booksNods);
}

renderBooks(myLibrary);
