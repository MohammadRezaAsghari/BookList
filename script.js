//Book Constructor
function Book(title , author , isbn){
    this.title = title;
    this.author = author
    this.isbn = isbn;
}

//UI constructor
function UI(){}

//UI() methods:
UI.prototype.addBoook = function(book){
    const tbody = document.getElementById('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${book.title}</td> 
    <td>${book.author}</td> 
    <td>${book.isbn}</td>
    <td>X</td>`
    tbody.appendChild(tr);
}


//Event Listenres
document.getElementById('form-book').addEventListener('submit' , function(e){
    e.preventDefault();
    
    //get key elements
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const isbn = document.getElementById('isbn');

    //instanciate book 
    let book = new Book(title.value , author.value , isbn.value);
    //instanciate ui
    let ui = new UI();

    //add book to user interface
    ui.addBoook(book);

    


    

});