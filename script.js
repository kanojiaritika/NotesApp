let add = document.getElementById("add");
let taskArea = document.getElementById("taskArea");

// Retrieve tasks from localStorage if available
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskArea.innerHTML = ""; // Clear current tasks on screen

  tasks.forEach((taskText, index) => {
    let newTask = document.createElement("div");
    newTask.className = "task";

    let inputArea = document.createElement("input");
    inputArea.type = "text";
    inputArea.value = taskText;
    inputArea.disabled = true;  // Make input read-only by default

    let buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons";

    let saveButton = document.createElement("button");
    saveButton.innerText = "Edit";
    saveButton.className = "saveBtn";

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "deleteBtn";

    buttonsDiv.appendChild(saveButton);
    buttonsDiv.appendChild(deleteButton);

    newTask.appendChild(inputArea);
    newTask.appendChild(buttonsDiv);

    taskArea.appendChild(newTask);

    // Delete task
    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasksToLocalStorage();
      renderTasks();
    });

    // Edit & Save task
    saveButton.addEventListener("click", function () {
      if (inputArea.disabled) {
        inputArea.disabled = false;
        saveButton.innerText = "Save";
      } else {
        inputArea.disabled = true;
        saveButton.innerText = "Edit";
        tasks[index] = inputArea.value;
        saveTasksToLocalStorage();
      }
    });
  });
}

function addTask() {
  tasks.push(""); // Empty text initially
  saveTasksToLocalStorage();
  renderTasks();
}

add.addEventListener("click", addTask);

// Render tasks when page loads
renderTasks();
