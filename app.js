import { addTask, advanceTask, deleteTask, filterByStatus, countByStatus, } from "./model.js";
let tasks = [];
let currentFilter = "all";
const formEl = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const listEl = document.getElementById("list");
const statsEl = document.getElementById("stats");
const filterButtons = document.querySelectorAll(".chip");
function render() {
    // Update summary counts
    const todoCount = countByStatus(tasks, "todo");
    const inProgressCount = countByStatus(tasks, "in-progress");
    const doneCount = countByStatus(tasks, "done");
    statsEl.textContent = `${todoCount} to do · ${inProgressCount} in progress · ${doneCount} done`;
    // Filter tasks using typed filterByStatus
    const visibleTasks = currentFilter === "all" ? tasks : filterByStatus(tasks, currentFilter);
    listEl.innerHTML = "";
    if (visibleTasks.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "No tasks in this view.";
        empty.style.color = "#6b7280";
        listEl.appendChild(empty);
        return;
    }
    visibleTasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task-item";
        const infoDiv = document.createElement("div");
        infoDiv.className = "task-info";
        const badge = document.createElement("span");
        badge.className = `badge ${task.status}`;
        badge.textContent = task.status;
        const titleSpan = document.createElement("span");
        titleSpan.textContent = task.title;
        if (task.status === "done") {
            titleSpan.className = "done-text";
        }
        infoDiv.append(badge, titleSpan);
        const actionsDiv = document.createElement("div");
        actionsDiv.className = "actions";
        if (task.status !== "done") {
            const advanceBtn = document.createElement("button");
            advanceBtn.className = "btn-small";
            advanceBtn.textContent = task.status === "todo" ? "Start →" : "Complete ✓";
            advanceBtn.onclick = () => {
                tasks = advanceTask(tasks, task.id);
                render();
            };
            actionsDiv.appendChild(advanceBtn);
        }
        const delBtn = document.createElement("button");
        delBtn.className = "btn-small";
        delBtn.textContent = "✕";
        delBtn.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            render();
        };
        actionsDiv.appendChild(delBtn);
        li.append(infoDiv, actionsDiv);
        listEl.appendChild(li);
    });
}
formEl.onsubmit = (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    if (!title)
        return;
    tasks = addTask(tasks, title);
    titleInput.value = "";
    render();
};
filterButtons.forEach((btn) => {
    btn.onclick = () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const chosen = btn.dataset.filter;
        currentFilter = chosen;
        render();
    };
});
render();
