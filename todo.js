const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#input-todo");
const  button = document.querySelector(".btn");
 const todoLists = document.querySelector(".lists");
 const messageElement = document.getElementById("message");

 //showmessage

 const showMessage = (text,status) => {
    messageElement.textContent =text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout (()=>{
           messageElement.textContent = " ";
           messageElement.classList.remove(`bg-${status}`);
    },1000)
 }


    //creating to do for each todo

    const createTodo = (todoId,todoValue) => {
        const todoElement = document.createElement("li");
        todoElement.id = todoId;
        todoElement.innerHTML = `
        <span> ${todoValue} </span>
        <span> <button class ="btn" id = "deleteButton"><i class="fa-solid fa-trash"></i> </button> </span>
        `;
       
        todoLists.appendChild(todoElement);
        todoElement.classList.add("li-style");

        const deleteButton = todoElement.querySelector("#deleteButton");
        deleteButton.addEventListener("click",deleteTodo);
    };

    const deleteTodo = (event) => {
     const selectedTodo = event.target.parentElement.parentElement.parentElement;

     todoLists.removeChild(selectedTodo)
     showMessage("Todo is delected","danger");

     let todos = getToDoFromLocalStorage();
     todos = todos.filter((todo) => todo.todoId != selectedTodo.id);
     localStorage.setItem("mytodos",JSON.stringify(todos));
    }

    //gettodosfromlocalstorage

    const  getToDoFromLocalStorage = () => {
       return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [] ;
    }


//add to do function
const addTodo = (event) => {
   event.preventDefault(); 
   const todoValue = todoInput.value;

   //unique id
   const todoId = Date.now().toString();
   createTodo(todoId,todoValue);
   showMessage("todo is added","success");
   //adding todo to localstroage
   const todos = getToDoFromLocalStorage();
   todos.push({todoId,todoValue});
   localStorage.setItem("mytodos",JSON.stringify(todos));
   todoInput.value = " ";



};
///loadtodos

const loadTodos = () => {
  const todos = getToDoFromLocalStorage();
  todos.map((todo) => createTodo(todo.todoId,todo.todoValue))
}

//adding listener
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);