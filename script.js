//global values;
const title = document.getElementById('title');
const author = document.getElementById('author');
const isbn = document.getElementById('isbn');
const form = document.getElementById('form-book');
const tbody = document.getElementById('tbody');
//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author
    this.isbn = isbn;
}

//UI constructor
function UI() {}

//UI() methods:

//addbook()
UI.prototype.addBoook = function(book) {
        const tbody = document.getElementById('tbody');
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${book.title}</td> 
        <td>${book.author}</td> 
        <td>${book.isbn}</td>
        <td class="btn-remove">&times;</td>
        <span class="progress"></span>`
        tbody.appendChild(tr);
    }
    //clearFields
UI.prototype.clearFields = function() {
        title.value = '';
        author.value = '';
        isbn.value = '';
    }
    //showAlert();
UI.prototype.showAlert = function(msg, alertType) {
    let container = document.querySelector('.container');
    let alertEl = document.createElement('div');
    alertEl.className = `alert alert-${alertType}`;
    alertEl.textContent = msg;
    container.insertBefore(alertEl, form);
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

//removeElement function

UI.prototype.removeElement = function(target) {
    console.log('inside timeout')
    target.parentElement.classList.add('hoverAnimated');
    setTimeout(function() {
        target.parentElement.remove();
    }, 510);

}


//Event Listenres
form.addEventListener('submit', function(e) {
    e.preventDefault();

    //instanciate book 
    let book = new Book(title.value, author.value, isbn.value);
    //instanciate ui
    let ui = new UI();

    if (title.value !== '' && author.value !== '' && isbn.value !== '') {
        //add book to user interface
        ui.addBoook(book);
        ui.clearFields();
        ui.showAlert('Added Successfully', 'success')
    } else {
        ui.showAlert('Please Fill Out All Fields', 'danger');
    }

});

tbody.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-remove')) {

        let ui = new UI();


        ui.removeElement(e.target);
        ui.showAlert('Removed Successfully', 'info');
    }
})