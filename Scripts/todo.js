// load tasks on page open
window.onload = function () {
    loadTasks();

    document.getElementById("taskInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
};

// get tasks for current user
function getTasks() {
    let user = GetUsername();
    if (user === "Guest") {
        return JSON.parse(sessionStorage.getItem("guest_tasks")) || [];
    }
    return JSON.parse(localStorage.getItem(user + "_tasks")) || [];
}

// save tasks
function saveTasks(tasks) {
    let user = GetUsername();
    
    if (user === "Guest") {
        sessionStorage.setItem("guest_tasks", JSON.stringify(tasks));
        return;
    }
    localStorage.setItem(user + "_tasks", JSON.stringify(tasks));
}

// load + display tasks
function loadTasks() {
    let tasks = getTasks();
    let list = document.getElementById("taskList");

    list.innerHTML = "";

   
    let updated = false;
    tasks.forEach((task, index) => {
        if (typeof task === "string") {
            tasks[index] = { text: task, completed: false };
            updated = true;
        }
    });
    if (updated) saveTasks(tasks);

    if (tasks.length === 0) {
        list.innerHTML = "<p>No tasks yet 👀</p>";
        updateProgress(); // Progress Updation
        return;
    }

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div>
                <button onclick="toggleTask(${index})">
                    ${task.completed ? "↺" : "✔"}
                </button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        list.appendChild(li);
    });

    updateProgress(); // 🔥 update circle every time
}

// add task
function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") return;

    let tasks = getTasks();

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks(tasks);

    input.value = "";
    loadTasks();
}

// toggle complete
function toggleTask(index) {
    let tasks = getTasks();

    tasks[index].completed = !tasks[index].completed;

    saveTasks(tasks);
    loadTasks();
}

// delete task
function deleteTask(index) {
    let tasks = getTasks();

    tasks.splice(index, 1);

    saveTasks(tasks);
    loadTasks();
}

// Progress function
function updateProgress() {
    let tasks = getTasks();

    let textEl = document.getElementById("progressText");
    let titleEl = document.getElementById("progressTitle");
    let descEl = document.getElementById("progressDesc");
    let circle = document.querySelector(".progress-circle");

    if (!textEl || !circle) return; // safety check

    if (tasks.length === 0) {
        textEl.innerText = "0%";
        titleEl.innerText = "No tasks";
        descEl.innerText = "Add tasks to get started!";
        circle.style.background = `conic-gradient(#39ff14 0%, #111 0%)`;
        return;
    }

    let completed = tasks.filter(t => t.completed).length;
    let percent = Math.round((completed / tasks.length) * 100);

    textEl.innerText = percent + "%";
    titleEl.innerText = `You have ${tasks.length} task(s)`;
    descEl.innerText = `${completed} completed, ${tasks.length - completed} remaining`;

    // 🔥 update circular progress
    circle.style.background = `conic-gradient(#39ff14 ${percent}%, #111 ${percent}%)`;
}
