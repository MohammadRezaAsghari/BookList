//-------------------------------------------------------------Golbal variables
const title = document.getElementById('title');
const author = document.getElementById('author');
const isbn = document.getElementById('isbn');
const form = document.getElementById('form-book');
const tbody = document.getElementById('tbody');

//--------------Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author
    this.isbn = isbn;
}

//-----------------------------------------------------------localStorage constructor

function SaveLocal() {};

//saveDataOnLocalStorage()
SaveLocal.prototype.saveDataOnLocalStorage = function(arrofObject) {
    localStorage.setItem('books', JSON.stringify(arrofObject));
}

//getDataFromLocalStorage()
SaveLocal.prototype.getDataFromLocalStorage = function(key) {
    if (localStorage.getItem(key) !== null) {
        console.log(JSON.parse(localStorage.getItem(key)));
        return JSON.parse(localStorage.getItem(key));
    } else {
        return []
    }
}
//removeDataFromLocalStorage
SaveLocal.prototype.removeDataFromLocalStorage = function(node , savelocal) {

    bookList.forEach(function (item , indx) {
        
        if(item.title === node.firstElementChild.textContent){
            
            bookList.splice(indx , 1);
           
            savelocal.saveDataOnLocalStorage(bookList);
        }
    });
    console.log(node.firstChild.textContent);
}
//renderElementsFromLocal
SaveLocal.prototype.renderElementsFromLocal = function(arrayOfBook){
    arrayOfBook.forEach(function (item , indx) {    
        const tr = document.createElement('tr');
        tr.innerHTML = 
        `<td>${item.title}</td>
        <td>${item.author}</td>
        <td>${item.isbn}</td>
        <td class="btn-remove">&times;</td>
        <span class="progress"></span>`;
        tbody.appendChild(tr);
    });
}
let savelocal = new SaveLocal();
const bookList = savelocal.getDataFromLocalStorage('books');
savelocal.renderElementsFromLocal(bookList);


//-------------------------------------------------------------UI Constructor
function UI() {};

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
    
    target.parentElement.classList.add('hoverAnimated');
    setTimeout(function() {
        target.parentElement.remove();
    }, 510);

}


//-------------------------------------------------------------------Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    //instanciate book 
    let book = new Book(title.value, author.value, isbn.value);
    //instanciate ui
    let ui = new UI();
    //instanciate saveLocal for localStorage
    let savelocal = new SaveLocal();


    if (title.value !== '' && author.value !== '' && isbn.value !== '') {

        //first lets save it locallly
        bookList.push(book);
        savelocal.saveDataOnLocalStorage(bookList);
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
        //istanciate
        let ui = new UI();
        let savelocal = new SaveLocal();


        savelocal.removeDataFromLocalStorage(e.target.parentElement , savelocal);
        ui.removeElement(e.target);
        ui.showAlert('Removed Successfully', 'info');
    }
})