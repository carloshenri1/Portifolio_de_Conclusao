// Seleção dos elementos do HTML
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoCategory = document.getElementById('todo-category');
const todoList = document.getElementById('todo-list');

// Carrega as tarefas salvas no LocalStorage ou inicia um array vazio
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para salvar as tarefas no LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para renderizar as tarefas na tela
function renderTasks() {
    todoList.innerHTML = ''; // Limpa a lista antes de redesenhar

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('todo-item', task.category);
        
        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span class="todo-text" onclick="toggleTask(${index})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
        `;

        todoList.appendChild(li);
    });
}

// Função para adicionar uma nova tarefa
todoForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede a página de recarregar

    const newTask = {
        text: todoInput.value,
        category: todoCategory.value,
        completed: false
    };

    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks();

    todoForm.reset(); // Limpa os campos do formulário
});

// Função para marcar/desmarcar como concluída
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveToLocalStorage();
    renderTasks();
}

// Função para deletar uma tarefa
function deleteTask(index) {
    tasks.splice(index, 1); // Remove o item do array
    saveToLocalStorage();
    renderTasks();
}

// Renderiza as tarefas pela primeira vez ao abrir a página
renderTasks();