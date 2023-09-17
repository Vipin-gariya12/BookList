// With ES6 

class Book{
    constructor(name, author, type){
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display extends Book{
    add(book){
        // console.log('Adding !!!');
        let tableBody = document.getElementById('tableBody');
        let str = `
        <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
        </tr>`;
        tableBody.innerHTML += str;
    }

    clear(){
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book){
        if (book.name.length < 3 || book.author.length < 3 ){
            return false;
        }
        else
            return true;
    }

    show(type, displayMessage){
        let message = document.getElementById('message');
        let text;
        if(type == 'success')
            text = 'Success';
        else
            text = 'Error';
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${text} :- </strong>${displayMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                             </div>`;
        setTimeout(function() {
            message.innerHTML = ""; 
        }, 3000);
    }
}

    let libraryForm = document.getElementById('libraryForm');
    libraryForm.addEventListener('submit', libraryFormSubmit);

    function libraryFormSubmit(e){
    // console.log('You have submitted library form.');
    
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let fiction = document.getElementById('Fiction');
    let programming = document.getElementById('Programming');
    let cooking = document.getElementById('Cooking');
    
    if(fiction.checked){
        type = fiction.value;
    }
    else if(programming.checked){
        type = programming.value;
    }
    else
        type = cooking.value;

    let book = new Book(name, author, type);
    
    let display = new Display();
    if(display.validate(book)){

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been added successfully.');

    }
    else{
        // Show error to the user
        display.show('danger', 'Unable to add this book. Try again');
    }
    
    e.preventDefault();
}
