// With ES6 

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display extends Book {
    showBooks() {
        let booksObj;
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

        let booksElem = document.getElementById("tableBody");
        if (booksObj.length != 0) {
            booksElem.innerHTML = html;
        } else {
            booksElem.innerHTML = `Nothing to show! Click on add book`;
        }
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 3 || book.author.length < 3) {
            return false;
        }
        else
            return true;
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let text;
        if (type == 'success')
            text = 'Success';
        else
            text = 'Error';
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${text} :- </strong>${displayMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                             </div>`;
        setTimeout(function () {
            message.innerHTML = "";
        }, 3000);
    }
}

let display = new Display();
display.showBooks();

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    // console.log('You have submitted library form.');

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let fiction = document.getElementById('Fiction');
    let programming = document.getElementById('Programming');
    let cooking = document.getElementById('Cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else
        type = cooking.value;

    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(books);
    }
    let myObj = {
        title: name,
        By: author,
        types: type
    }

    let book = new Book(name, author, type);

    if (display.validate(book)) {
        booksObj.push(myObj);
        localStorage.setItem("books", JSON.stringify(booksObj));
        display.showBooks();
        display.clear();
        display.show('success', 'Your book has been added successfully.');
    }
    else {
        // Show error to the user
        display.show('danger', 'Unable to add this book. Try again');
    }

    e.preventDefault();
}


// Function to delete a note
function deleteBook(index) {

    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books); 
    }

    booksObj.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(booksObj));
    display.showBooks();
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