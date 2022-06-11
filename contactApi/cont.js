class Contact {
    static  url = 'todos';
    #todos = [];
    #currentTodo = null;
    #EcontContainer = null;
    #currentTodoE = null;
    #http = null;
    #editE = null;
    #editName = null;
    #editLname = null;
    #editPhone = null;
    #CLASSES = {
        todoComplete: 'todo-complete',
        hideButton: 'hide-element',
        close: 'close',
        editContact: 'complete',
        itemTitle: 'item-title',
        itemBody: 'item-body',
        phoneInp: 'time',
        show:'show',
        activeList: 'active-list',
    }
    constructor(el, editEl) {
        this.#EcontContainer = el;
        this.#editE = editEl;
        this.init();
        console.log(this.#http);

    }
    init(){
        this.#http = new Http(Contact.url);
        this.#editName = this.#editE.querySelector('.edit-title');
        this.#editLname = this.#editE.querySelector('.edit-body');
        this.#editPhone = this.#editE.querySelector('.edit-phone');
        this.addListeners();
        this.getTodos();
    }
    addListeners(){
        this.#EcontContainer.addEventListener('click', this.contClick);
        this.#editE.querySelector('.save-btn').addEventListener('click', this.onSave);
    }
    // Получение всех ТУДУШЕК
    getTodos() {
        this.#http.getAll().then((d) => {
            this.#todos = d;
            this.render(this.#todos.reverse());
            console.log(this.#http)
        });
    }
    render(contact) {
        const content = contact.map((t) => this.createTodoElement(t)).join('');
    console.log(contact)
        this.#EcontContainer.innerHTML = content;

    }
// создание структуры ТУДУШКИ
    createTodoElement(cont) {
        return ` 
                   <div class="item" id="${cont.id}">
                    <div class="item-content">
                        <div class="contact-info">
                            <div class="user_avatar">
                                 <img src="../kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66e306b15.0756271715374598221983.png">
                             </div>
                            <div class="item-title"> ${cont.name}</div>
                            <div class="item-body">${cont.lastName}</div>
                            <div class="time">Phone: ${cont.phone}</div>
                        </div>
                        
                        <div class="item-actions">
                            <div class="close">Delete</div>
                            <div class="complete ${cont.isComplete}">Edit</div>
                        </div>
                    </div>
                </div> `;
    }
    // вешаем клики на все нужные елементы
    contClick = (e) =>{
        if(this.#currentTodoE){
            this.#currentTodoE.classList.remove(this.#CLASSES.activeList);
        }
        const target = e.target;
        this.#currentTodoE = e.target.closest('.item');


        if (this.#currentTodoE){
            this.#currentTodo = this.#todos.find(
                (e) => e.id === this.#currentTodoE.id);
        }
        if (e.target.classList.contains(this.#CLASSES.close)){
            console.log('DELETE');
            this.close(this.#currentTodo.id);

            return
        }
        if (e.target.classList.contains(this.#CLASSES.editContact )){
            this.#currentTodoE.classList.add(this.#CLASSES.activeList);
            console.log(this.#editLname)
            this.editTodo();

        }
    }
// Удаление туду
    close(id) {
        this.#http.deleteTodo(id).then((r) => {
            if (r.deletedCount >=1) {
                this.#todos = this.#todos.filter(t=> t.id !== id);
                this.#currentTodoE.remove(this.#CLASSES.activeList);
                this.clearData();
            }
        });
    }

    editTodo() {
        this.#editE.classList.add(this.#CLASSES.show);
        this.#editName.value = this.#currentTodo.name;
        this.#editLname.value = this.#currentTodo.lastName;
        this.#editPhone.value = this.#currentTodo.phone;
    }
    onSave = () =>{
        this.#currentTodo.name = this.#editName.value;
        this.#currentTodo.lastName = this.#editLname.value;
        this.#currentTodo.phone = this.#editPhone.value;
        this.#http.update(this.#currentTodo.id, this.#currentTodo).then((r) =>{
            // if( r && r.id){

                this.#currentTodoE.querySelector('.item-title').innerHTML = r.name;
                this.#currentTodoE.querySelector('.item-body').innerHTML = r.lastName;
                this.#currentTodoE.querySelector('.time').innerHTML = r.phone;
                this.#editE.classList.remove(this.#CLASSES.show);
                this.#currentTodoE.classList.remove(this.#CLASSES.activeList);
                this.getTodos()
                this.clearData();

            // }
        });
    }
    createTodo(name, lastName, phone) {

        const cont = {
            name,
            lastName,
            phone,
        };
        console.log(cont)
        //Сначала делаем  проверку на заполненность форм и если что-то не заполнено, тогда alert,
        //В противном случае (если не сработал первый if) мы добавляем элемент

        if
        ( !name.trim() || !lastName.trim() || !phone.trim()){
            alert('Error! Please fill in all the fields');
        } else {
            this.#http.create(cont).then(r => {
            this.#todos.unshift(r);
            if (r && r.id) {
                const content = this.createTodoElement(cont);
                this.#EcontContainer.insertAdjacentHTML('afterbegin', content);

            }
                console.log(this.#todos)
        })
            nameE.value = "";
            phoneE.value = "";
            lastNameE.value = "";
    }}
    clearData(){
        this.#currentTodo = null;
        this.#currentTodoE = null;
    }

}