const cont = new Contact(
    document.querySelector('.list'),
    document.querySelector('.edit-container'));



const nameE = document.querySelector('.name');
const lastNameE = document.querySelector('.lastName');
const phoneE = document.querySelector('.phone');
document.querySelector('.create')
    .addEventListener('click', () => cont.createTodo(nameE.value, lastNameE.value, phoneE.value));



