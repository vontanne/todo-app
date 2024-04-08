let todoItems = [];

function saveToLocalStorage() {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function createTodoElement(todo) {
  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("li");
  node.className = `todo-item ${isChecked}`;
  node.setAttribute("data-key", todo.id);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox" class="tick js-tick" ${
    todo.checked ? "checked" : ""
  }/>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">X</button>
  `;
  return node;
}

function renderTodo(todo) {
  saveToLocalStorage();

  const list = document.querySelector(".js-todo-list");
  const item = list.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item && item.remove();
    if (todoItems.length === 0) list.innerHTML = "";
    return;
  }

  const todoElement = createTodoElement(todo);

  if (item) {
    list.replaceChild(todoElement, item);
  } else {
    list.appendChild(todoElement);
  }
}

function addTodo(text) {
  const todo = {
    text: text.trim().slice(0, 35),
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

function deleteTodo(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  const deletedTodo = {
    deleted: true,
    ...todoItems[index],
  };
  todoItems.splice(index, 1);
  renderTodo(deletedTodo);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const input = document.querySelector(".js-todo-input");
  const text = input.value.trim();

  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
}

function handleListClick(event) {
  const target = event.target;
  const itemKey = target.parentElement.dataset.key;

  if (target.classList.contains("js-tick")) {
    toggleDone(itemKey);
  }

  if (target.classList.contains("js-delete-todo")) {
    deleteTodo(itemKey);
  }
}

function initializeTodos() {
  const storedTodos = localStorage.getItem("todoItems");

  if (storedTodos) {
    todoItems = JSON.parse(storedTodos);
    todoItems.forEach(renderTodo);
  }
}

const form = document.querySelector(".js-form");
form.addEventListener("submit", handleFormSubmit);

const list = document.querySelector(".js-todo-list");
list.addEventListener("click", handleListClick);

document.addEventListener("DOMContentLoaded", initializeTodos);
