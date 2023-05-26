(()=>{
    const library = {
        books: [
            {id: 1, title: 'Duma Key', author: 'Stephen King', pages: 607, isRead: true},
            {id: 2, title: 'Harry Potter and the Deathly Hallows', author: 'J. K. Rowling', pages: 607, isRead: true},
            {id: 3, title: 'Revival', author: 'Stephen King', pages: 403, isRead: false},
            {id: 4, title: 'A Game of Thrones', author: 'George R. R. Martin', pages: 694, isRead: true},
            {id: 5, title: 'Harry Potter and the Half-Blood Prince', author: 'J. K. Rowling', pages: 607, isRead: true}
        ],
        init(){
            this.cacheDom();
            this.bindEvents();
            this.renderBooks();
        },
        bindEvents(){
            this.bookForm.addEventListener('submit', this.addBookHandler.bind(this));
        },
        cacheDom() {
            this.bookForm = document.querySelector('#bookForm');
            this.booksContainer = document.querySelector('#booksContainer');
        },
        addBook(newBook){
            this.books.push(newBook);
        },
        addBookHandler(e){
            e.preventDefault();
            const formData = new FormData(this.bookForm);
            const fromEntries = Object.fromEntries(formData);

            this.addBook(new Book(fromEntries.title, fromEntries.author, fromEntries.pages, !!fromEntries?.isRead));
            this.bookForm.reset();
            this.renderBooks();
        },
        deleteBook(bookId){
            this.books = this.books.filter(book => book.id !== bookId);
            this.renderBooks();
        },
        createTdWithText(text){
            const bookTd = document.createElement('td');
            bookTd.innerText = text;
            return bookTd;
        },
        createTdWithCheckbox(isRead){
            const td = document.createElement('td');
            const checked = isRead ? 'checked' : null;

            td.innerHTML = `<label class="checkbox">
                <input name="isRead" type="checkbox" ${checked}>
                    <span></span>
            </label>`;

            return td;
        },
        createBookTdWithDeleteBtn (bookId){
            const bookDeleteTd = document.createElement('td');
            const bookDeleteButton = document.createElement('button');
            bookDeleteButton.setAttribute('class', 'btn')
            bookDeleteButton.textContent = 'delete';
            bookDeleteButton.addEventListener('click', () => this.deleteBook(bookId))
            bookDeleteTd.appendChild(bookDeleteButton);
            return bookDeleteTd;
        },
        createBookNode(book){
            const bookTr = document.createElement('tr');
            const tds = [];

            for(let prop in book) {
                if(prop === 'id') continue;
                if(prop === 'isRead'){
                    tds.push(this.createTdWithCheckbox(book.isRead));
                } else if(book.hasOwnProperty(prop)){
                    tds.push(this.createTdWithText(book[prop]));
                }
            }

            tds.forEach(td => bookTr.appendChild(td));

            bookTr.appendChild(this.createBookTdWithDeleteBtn(book.id));
            bookTr.setAttribute('data-bookId', book.id)
            return bookTr;
        },
        renderBooks(){
            const booksNods = [];
            const books = this.books;
            for (let i = books.length - 1; i > 0; i--) {
                booksNods.push(this.createBookNode(books[i]));
            }

            this.booksContainer.replaceChildren(...booksNods);
        }
    };

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

    library.init();
})();
