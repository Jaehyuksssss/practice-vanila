const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const submitBtn = document.getElementById("submitbtn");
const leftItems = document.querySelector(".left-items");
const showAllBtn = document.querySelector(".show-all-btn");
const showActiveBtn = document.querySelector(".show-active-btn");
const showCompletedBtn = document.querySelector(".show-completed-btn");
const clearCompletedBtn = document.querySelector(".clear-completed-btn");
const completeAllBtn = document.querySelector(".complete-all-btn");

let todos = [];

function loadStorage() {
  const storedTodos = localStorage.getItem("todos");
  console.log(storedTodos);
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    renderTodos();
  }
}

function saveToStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createList() {
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    const todoItem = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    todos.push(todoItem);
    saveToStorage();
    renderTodos();
    todoInput.value = "";
  }
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todoItem) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.setAttribute("data-id", todoItem.id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todoItem.completed;
    checkbox.addEventListener("change", toggleTodo);

    const text = document.createElement("span");
    text.textContent = todoItem.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", deleteTodo);

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });

  updateLeftItems();
}

function toggleTodo() {
  const todoId = parseInt(this.parentNode.getAttribute("data-id"));
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  todos[todoIndex].completed = !todos[todoIndex].completed;
  saveToStorage();
  renderTodos();
}

function deleteTodo() {
  const todoId = parseInt(this.parentNode.getAttribute("data-id"));
  todos = todos.filter((todo) => todo.id !== todoId);
  saveToStorage();
  renderTodos();
}

function updateLeftItems() {
  const count = todos.filter((todo) => !todo.completed).length;
  leftItems.textContent = `${count}개의 할 일이 남았어요`;
}

submitBtn.addEventListener("click", createList);
showAllBtn.addEventListener("click", () => filterTodos("all"));
showActiveBtn.addEventListener("click", () => filterTodos("active"));
showCompletedBtn.addEventListener("click", () => filterTodos("completed"));
clearCompletedBtn.addEventListener("click", clearCompleted);

function filterTodos(type) {
  const filteredTodos =
    type === "all"
      ? todos
      : type === "active"
      ? todos.filter((todo) => !todo.completed)
      : todos.filter((todo) => todo.completed);

  todoList.innerHTML = "";
  filteredTodos.forEach((todoItem) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", todoItem.id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todoItem.completed;
    checkbox.addEventListener("change", toggleTodo);

    const text = document.createElement("span");
    text.textContent = todoItem.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deleteTodo);

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

function toggleAll() {
  const areAllCompleted = todos.every((todo) => todo.completed);

  todos.forEach((todo) => {
    todo.completed = !areAllCompleted;
  });

  saveToStorage();
  renderTodos();
}

completeAllBtn.addEventListener("click", toggleAll);
function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  saveToStorage();
  renderTodos();
}

function setting() {
  loadStorage();
}
setting();
