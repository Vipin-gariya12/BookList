showBooks();

// Constructor
function Book(bookName, author, type) {
    this.name = bookName.value;
    this.author = author.value;
    this.type = type;
}

// Display Constructor
function Display() {

}

// If user adds a book, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let name = document.getElementById('bookName');
    let author = document.getElementById('author');
    let type;

    // for getting value of type
    if (Fiction.checked) {
        type = Fiction.value;
    }
    else if (Programming.checked) {
        type = Programming.value;
    }
    else if (Cooking.checked) {
        type = Cooking.value;
    }
    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }
    let myObj = {
        title: bookName.value,
        By: author.value,
        types: type
    }

    let book = new Book(name, author, type);

    let display = new Display();

    if (display.validate(book)) { 

        booksObj.push(myObj);
        display.show('success', 'Your book has been successfully added !!!')
        localStorage.setItem("books", JSON.stringify(booksObj));
        display.clear();
    }
    else {
        // Show error to the user
        display.show('danger', 'Book not found !!! Sorry you cannot add this book.');
    }

    showBooks();
    e.preventDefault();
});

// showBooks() to show books from the local storage
function showBooks() {
    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }

    let html = "";
    booksObj.forEach(function (books, index) {
        html += `<tr class = "NoteBook">
                    <td>${index + 1}</td>
                    <td>${books.title}</td>
                    <td>${books.By}</td>
                    <td>${books.types}</td>
                    <th scope="col">
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <button id="${index}" onclick="deleteBook(this.id)" type="submit" class="btn btn-primary" >Delete Book</button>
                                </div>
                            </div>
                        </th>
                </tr>`;
    });

    let booksElm = document.getElementById('tableBody');
    if (booksObj.length != 0) {
        booksElm.innerHTML = html;
    }
    else {
        booksElm.innerHTML = `Nothing to show ! Click on Add Book`;
    }

}

// Implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 3 || book.author.length < 3) {
        return false;
    }
    else {
        return true;
    }
}

// Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

// show() to show the message
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message :- </strong> ${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = ''
    }, 3000);

}

// deleteBook() to delete a book from storage
function deleteBook(index){

    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }

    booksObj.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(booksObj));
    showBooks();

}

// for searching
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value;
    let NoteBook = document.getElementsByClassName('NoteBook');
    Array.from(NoteBook).forEach(function(element){
        let Text = element.getElementsByTagName("td")[1].innerText;
        if(Text.includes(inputVal)){
            element.style.display = "";
        }
        else{
            element.style.display = "none";
        }
    })
});