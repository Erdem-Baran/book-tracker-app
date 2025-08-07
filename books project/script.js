const body = document.querySelector(".body");
const book = document.querySelector(".book");
const cardGroup = document.querySelector(".card-group");
const authorInput = document.querySelector(".author");
const addButton = document.querySelector(".btn");
const formSelect = document.querySelector(".form-select");

document.addEventListener("DOMContentLoaded", loadItems);

function loadItems() {
    let books = getBooksFromLocalStorage();
    books.forEach(bookData => {
        createCardElement(bookData);
    });
}

function getBooksFromLocalStorage() {
    let books;
    if (localStorage.getItem("books") === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
}

function setBooksToLocalStorage(bookData) {
    let books = getBooksFromLocalStorage();
    books.push(bookData);
    localStorage.setItem("books", JSON.stringify(books));
}

function removeBookFromLocalStorage(bookTitle, authorName) {
    let books = getBooksFromLocalStorage();
    books = books.filter(book => book.title !== bookTitle || book.author !== authorName);
    localStorage.setItem("books", JSON.stringify(books));
}

function createCardElement(bookData) {
    // card
    const card = document.createElement("div");
    card.classList.add("card");

    // title
    const title = document.createElement("h4");
    title.classList.add("book_title");
    title.textContent = bookData.title;

    // author
    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = bookData.author;

    // bi
    const bi = document.createElement("div");
    bi.classList.add("bii");

    // icon
    const icon_read = document.createElement("i");
    const icon_unread = document.createElement("i");

    // remove
    const removeBtn = document.createElement("i");
    removeBtn.classList.add("active", "close", "bi", "bi-trash-fill");
    
    removeBtn.addEventListener("click", function() {
        this.parentElement.remove();
        removeBookFromLocalStorage(bookData.title, bookData.author);
    });

    // select
    if (bookData.status === "read") {
        icon_read.classList.add("read", "bi", "bi-bookmark-check-fill");
        bi.appendChild(icon_read);
    } else if (bookData.status === "unread") {
        icon_unread.classList.add("unread", "bi", "bi-bookmark-dash-fill");
        bi.appendChild(icon_unread);
    }

    card.appendChild(removeBtn);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(bi);
    cardGroup.appendChild(card);
}

function add_item() {
    const bookTitle = book.value.trim();
    const authorName = authorInput.value.trim();
    let bookStatus;

    if (!bookTitle || !authorName) {
        alert("Please fill in the book title and author information!");
        return;
    }

    if (formSelect.value == 1) {
        bookStatus = "read";
    } else if (formSelect.value == 2) {
        bookStatus = "unread";
    } else {
        alert("please select a situation");
        return;
    }

    const newBook = {
        title: bookTitle,
        author: authorName,
        status: bookStatus
    };

    createCardElement(newBook);
  
    setBooksToLocalStorage(newBook);

    book.value = "";
    authorInput.value = "";
    formSelect.value = "0";
}

addButton.addEventListener("click", add_item);