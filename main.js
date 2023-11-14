const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

let todos = [];
let id = 0;
console.log(todos);
const init = () => {
  todoInput.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      addTodo();
    }
  });
};

const setTodos = (newTodos) => {
  todos = newTodos;
};

const getAllTodos = () => {
  return todos;
};

const appendTodos = (text) => {
  const newId = id++;
  const newTodos = getAllTodos().concat({
    id: newId,
    isCompleted: false,
    content: text,
  });
  setTodos(newTodos);
  paintTodos();
};
