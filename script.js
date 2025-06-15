<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>To-Do List Application</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 8px 0;
      padding: 10px;
      background-color: #f1f1f1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .remove-btn {
      background-color: red;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <h1>To-Do List</h1>

  <!-- Task input and button -->
  <input type="text" id="task-input" placeholder="Enter a new task">
  <button id="add-button">Add Task</button>

  <!-- Task list container -->
  <ul id="task-list"></ul>

  <script>
    // Listen for when the DOM has fully loaded
    document.addEventListener('DOMContentLoaded', function () {
      // Select DOM elements
      const addButton = document.getElementById('add-button');
      const taskInput = document.getElementById('task-input');
      const taskList = document.getElementById('task-list');

      // Load any saved tasks from localStorage
      loadTasks();

      // Add task when button is clicked
      addButton.addEventListener('click', addTask);

      // Add task when Enter key is pressed
      taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
          addTask();
        }
      });

      // Function to add a task
      function addTask(taskTextFromStorage = null) {
        // Get task text from parameter or input field
        const taskText = taskTextFromStorage !== null ? taskTextFromStorage : taskInput.value.trim();

        // If input is empty and not from storage, alert the user
        if (taskText === '') {
          if (taskTextFromStorage === null) {
            alert("Please enter a task.");
          }
          return;
        }

        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Add event to remove task from list and storage
        removeBtn.onclick = function () {
          taskList.removeChild(li);
          removeTaskFromStorage(taskText);
        };

        // Append button to list item and list item to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save task if it came from input field
        if (taskTextFromStorage === null) {
          saveTaskToStorage(taskText);
          taskInput.value = ''; // Clear input field
        }
      }

      // Save task to localStorage
      function saveTaskToStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      // Remove task from localStorage
      function removeTaskFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      // Load tasks from localStorage
      function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        savedTasks.forEach(task => addTask(task));
      }
    });
  </script>
</body>
</html>
