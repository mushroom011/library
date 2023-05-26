class Library {
    constructor(books) {
        this.books = books;
    }

    addBook = (newBook) => this.books.push(newBook);

    deleteBook = (bookId) => {
        this.books = this.books.filter(book => book.id !== bookId);
    }

    getBooks() {
        return this.books;
    }

    getBookById = (id) => {
        return this.getBooks().find(book => book.id === id);
    }
}

class Book {
    constructor(title, author, pages, isRead = false){
        this.id = Math.floor(Math.random() * 1000) + '_' + title + '_' + author;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleIsRead() {
        this.isRead = !this.isRead;
    }
}

let books = [
    new Book('Duma Key', 'Stephen King', 607, true),
    new Book('Harry Potter and the Deathly Hallows', 'J. K. Rowling', 607, true),
    new Book('Revival', 'Stephen King', 403, false),
    new Book('A Game of Thrones', 'George R. R. Martin', 694, true),
    new Book('Harry Potter and the Half-Blood Prince', 'J. K. Rowling', 607, true),
];

const myLibrary = new Library(books);

const addBookHandler = (e) => {
    e.preventDefault();
    const bookForm = document.querySelector('#bookForm');
    const formData = new FormData(bookForm);
    const fromEntries = Object.fromEntries(formData);

    myLibrary.addBook(new Book(fromEntries.title, fromEntries.author, fromEntries.pages, !!fromEntries?.isRead));
    bookForm.reset();
    renderBooks(myLibrary.getBooks())
}

const bookForm = document.querySelector('#bookForm');
bookForm.addEventListener('submit', addBookHandler);


const createTdWithText = (text) => {
    const bookTd = document.createElement('td');
    bookTd.innerText = text;
    return bookTd;
}

const createTdWithCheckbox = ({id, isRead}) => {
    const td = document.createElement('td');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');

    const isReadClickHandler = () => {
        myLibrary.getBookById(id).toggleIsRead()
    }

    if(isRead) {
        input.setAttribute('checked', isRead);
    }

    input.setAttribute('name','isRead');
    input.setAttribute('type','checkbox');
    input.addEventListener('click', isReadClickHandler)
    label.classList.add('checkbox');
    label.appendChild(input);
    label.appendChild(span);
    td.appendChild(label)

    return td;
}

const createBookTdWithDeleteBtn = (bookId) => {
    const bookDeleteTd = document.createElement('td');
    const bookDeleteButton = document.createElement('button');
    bookDeleteButton.setAttribute('class', 'btn')
    bookDeleteButton.textContent = 'delete';
    bookDeleteButton.addEventListener('click', () => {
        myLibrary.deleteBook(bookId);
        renderBooks(myLibrary.getBooks());
    })
    bookDeleteTd.appendChild(bookDeleteButton);
    return bookDeleteTd;
}

const createBookNode = (book) => {
    const bookTr = document.createElement('tr');
    const tds = [];

    for(let prop in book) {
        if(prop === 'id') continue;
        if(prop === 'isRead'){
            tds.push(createTdWithCheckbox(book));
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
    for (let i = booksList.length - 1; i >= 0; i--) {
        booksNods.push(createBookNode(booksList[i]));
    }

    const booksContainer = document.querySelector('#booksContainer');
    booksContainer.replaceChildren(...booksNods);
}

renderBooks(myLibrary.getBooks());
