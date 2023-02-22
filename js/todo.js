let todoInp = document.querySelector(".todo-inp");
let addTaskBtn = document.querySelector(".todo-btn");
let taskContainer = document.querySelector(".todo ul");
let taskList = [];
let listsArr = [];

if (localStorage.getItem("tasks")) {
  taskList = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLS();

// to make enter click add button
todoInp.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    addTaskBtn.click();
  }
});

addTaskBtn.addEventListener("click", function () {
  if (todoInp.value !== "") {
    addTaskToArray(todoInp.value);
    todoInp.value = "";
  }
});

function addTaskToArray(str) {
  taskList.push(str);
  addTaskToLS(taskList);
  getDataFromLS();
}

function addTaskToLS(arr) {
  localStorage.setItem("tasks", JSON.stringify(arr));
}

function getDataFromLS() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    showTasksInPage(tasks);
  }
}

function showTasksInPage(arr) {
  taskContainer.innerHTML = "";
  arr.forEach((element) => {
    let task = document.createElement("li");
    task.innerText = element;
    taskContainer.appendChild(task);
  });
  listsArr = document.querySelectorAll(".todo li");
  removeTaskFromPage(listsArr);
}

// remove from page

function removeTaskFromPage(arr) {
  arr.forEach((element) => {
    element.addEventListener("click", function () {
      element.remove();
      removeTaskFromLS(element);
    });
  });
}

function removeTaskFromLS(str) {
  console.log(str);
  taskList = taskList.filter((element) => element != str.innerText);
  addTaskToLS(taskList);
}
