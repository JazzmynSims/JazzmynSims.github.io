// ToDo Class: Represents a ToDo event
class ToDo {
  constructor(title, type, priority, date) {
    this.title = title;
    this.type = type;
    this.priority = priority;
    this.date = date;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayToDos() {
    const ToDos = Store.getToDos();

    ToDos.forEach((ToDo) => UI.addToDoToList(ToDo));
  }

  static addToDoToList(todo) {
    const list = document.querySelector('#todo-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.type}</td>
      <td>${todo.priority}</td>
      <td>${todo.date}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteToDo(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#todo-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#type').value = '';
    document.querySelector('#priority').value = '';
    document.querySelector('#date').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getToDos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
  }

  static addToDo(todo) {
    const todos = Store.getToDos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  static removeToDo(isbn) {
    const todos = Store.getToDos();

    todos.forEach((todo, index) => {
      if(todo.isbn === isbn) {
        todos.splice(index, 1);
      }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

// Event: Display ToDos
document.addEventListener('DOMContentLoaded', UI.displayToDos);

// Event: Add a ToDo
document.querySelector('#todo-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const type = document.querySelector('#type').value;
  const priority = document.querySelector('#priority').value;
  const date = document.querySelector('#date').value;

  // Validate
  if(title === '' || type === '' || priority === '' || date === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate todo
    const todo = new ToDo(title, type, priority, date);

    // Add ToDo to UI
    UI.addToDoToList(todo);

    // Add todo to store
    Store.addToDo(todo);

    // Show success message
    UI.showAlert('ToDo Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a ToDo
document.querySelector('#todo-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteToDo(e.target);

  // Remove todo from store
  Store.removeToDo(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('ToDo Removed', 'success');
});

// function to set a given theme/color-scheme
        function setTheme(themeName) {
            localStorage.setItem('theme', themeName);
            document.documentElement.className = themeName;
        }

        // function to toggle between light and dark theme
        function toggleTheme() {
            if (localStorage.getItem('theme') === 'theme-dark') {
                setTheme('theme-light');
            } else {
                setTheme('theme-dark');
            }
        }

        // Immediately invoked function to set the theme on initial load
        (function () {
            if (localStorage.getItem('theme') === 'theme-dark') {
                setTheme('theme-dark');
                document.getElementById('slider').checked = false;
            } else {
                setTheme('theme-light');
              document.getElementById('slider').checked = true;
            }
        })();





