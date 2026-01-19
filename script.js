const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    if (input.value.trim() === "") return;
    const task = {
        id: Date.now(),
        text: input.value,
        completed: false
    };
    tasks.push(task);
    input.value = "";
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        li.addEventListener("click", (e) => {
            if (e.target.tagName !== "BUTTON") {
                toggleTask(task.id);
            }
        });
        taskList.appendChild(li);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Initial Load
renderTasks();