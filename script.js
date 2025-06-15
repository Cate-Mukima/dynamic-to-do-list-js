<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>To-Do List App</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 10px 0;
      padding: 10px;
      background-color: #f0f0f0;
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

  <h2>To-Do List</h2>
  <input type="text" id="task-input" placeholder="Enter a task">
  <button id="add-button">Add Task</button>
  <ul id="task-list"></ul>

  <script>
    // Setup Event Listener for Page Load
    document.addEventListener('DOMContentLoaded', function () {

      
      const addButton = document.getElementById('add-button');
      const taskInput = document.getElementById('task-input');
      const taskList = document.getElementById('task-list');

      
      loadTasks();

      
      addButton.addEventListener('click', addTask);
      taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
          addTask();
        }
      });

      
      function addTask(taskTextFromStorage = null) {
         const taskText = taskTextFromStorage !== null ? taskTextFromStorage : taskInput.value.trim();

        
        if (taskText === '') {
          if (taskTextFromStorage === null) {
            alert('Please enter a task.');
          }
          return;
        }

        
        const li = document.createElement('li');
        li.textContent = taskText;

       
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        removeBtn.onclick = function () {
          taskList.removeChild(li);
          removeTaskFromStorage(taskText);
        };

        
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        
        if (taskTextFromStorage === null) {
          saveTaskToStorage(taskText);
          taskInput.value = '';
        }
      }

      
      function saveTaskToStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      
      function removeTaskFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      
      function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task)); // Load without resaving
      }

    });
  </script>
</body>
</html>
