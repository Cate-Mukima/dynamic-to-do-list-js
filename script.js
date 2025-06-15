<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Persistent To-Do List</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 10px;
      margin-bottom: 5px;
      background-color: #f4f4f4;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .remove-btn {
      background-color: #ff4d4d;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 4px;
    }
  </style>
</head>
<body>

  <h1>My To-Do List</h1>
  <input type="text" id="task-input" placeholder="Enter a new task">
  <button id="add-button">Add Task</button>
  <ul id="task-list"></ul>

  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const addButton = document.getElementById('add-button');
      const taskInput = document.getElementById('task-input');
      const taskList = document.getElementById('task-list');

      
      loadTasks();

      
      addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
          addTask(taskText); 
          taskInput.value = "";
        } else {
          alert("Please enter a task.");
        }
      });

     
      taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
          const taskText = taskInput.value.trim();
          if (taskText !== "") {
            addTask(taskText); 
            taskInput.value = "";
          } else {
            alert("Please enter a task.");
          }
        }
      });

      
      function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Don't re-save to avoid duplication
      }

     
      function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        
        removeBtn.onclick = function () {
          taskList.removeChild(li);
          removeFromStorage(taskText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        
        if (save) {
          const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
          tasks.push(taskText);
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
      }

     
      function removeFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    });
  </script>

</body>
</html>
