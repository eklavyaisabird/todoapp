// localStorage.clear();
// TODO: organise functions and comment code
console.log(localStorage);
if (localStorage.getItem("num") === null) {
  localStorage.setItem("num", "1");
}

function incrementNum() {
  let num = parseInt(localStorage.getItem("num")) + 1;
  localStorage.setItem("num", num.toString());
}

function getNum() {
  return localStorage.getItem("num");
}

function getTodoList() {
  // TODO: sort list by id
  list = [];
  for (i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const task = JSON.parse(localStorage.getItem(key));

    if (key.substring(0, 4) === "Task" && !task.finished) {
      list.push(new TaskObj(task.id, task.name, task.finished));
    }
  }
  list.sort((a, b) => a.id - b.id);
  console.log("list:", list);
  return list;
}

function TaskObj(id, name, finished) {
  this.id = id;
  this.name = name;
  this.finished = finished;
}

function getCompletedList() {
  list = [];
  for (i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const task = JSON.parse(localStorage.getItem(key));
    if (key.substring(0, 4) === "Task" && task.finished) {
      list.push(new TaskObj(task.id, task.name, task.finished));
    }
  }
  list.sort((a, b) => a.id - b.id);
  console.log("list:", list);
  return list;
}
// const obj = new TaskObj(4, "obj name", false);
// console.log("obj = ", obj, JSON.stringify(obj));

// TODO: create list of completed items next to other list

function displayTodoList(element_id) {
  // TODO: filter by completion: only show unfinished items
  const list = document.getElementById(element_id);

  let data = element_id == "list" ? getTodoList() : getCompletedList();
  let ul = data
    .map(
      (todo) =>
        `<div><input onclick="handleCheckboxClick(${
          todo.id
        })" type="checkbox" id="${todo.id}" ${
          todo.finished ? "checked" : ""
        }><label for=${todo.id}>${
          todo.name
        }</label><button onclick="deleteTodo('${
          todo.id
        }')">Delete</button></div>`
    )
    .join("");
  console.log(ul);
  list.innerHTML = ul;
}

function deleteTodo(id) {
  localStorage.removeItem(`Task ${id}`);
  displayTodoList("list");
  displayTodoList("list-completed");
}

function addTodo() {
  const input = document.getElementById("userInput").value;
  document.getElementById("userInput").value = "";
  const newTask = new TaskObj(getNum(), input, false);

  localStorage.setItem(`Task ${getNum()}`, JSON.stringify(newTask));
  incrementNum();
  displayTodoList("list");
}

function getTaskByIDJSON(id) {
  return JSON.parse(localStorage.getItem(`Task ${id}`));
}

function handleCheckboxClick(id) {
  let taskobj = getTaskByIDJSON(id);
  taskobj.finished = !taskobj.finished;
  // update finished value
  localStorage.setItem(`Task ${id}`, JSON.stringify(taskobj));
  displayTodoList("list");
  displayTodoList("list-completed");
}

// Allow pressing Enter to submit
document
  .getElementById("userInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTodo();
    }
  });
document.addEventListener("DOMContentLoaded", function () {
  displayTodoList("list");
  displayTodoList("list-completed");
});
