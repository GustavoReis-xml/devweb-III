const API_URL = "/tasks";
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Carregar tarefas ao iniciar
async function loadTasks() {
    // Conexão com a API RESTAURADA
    const res = await fetch(API_URL);
    const tasks = await res.json();

    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        
        // Adiciona a classe principal para o CSS funcionar
        li.className = "task-item";

        // Gera o HTML com o design novo e elegante
        li.innerHTML = `
            <div class="task-hud-corners"></div>
            <div class="task-content">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
            <div class="actions">
                <button class="actions-btn edit-btn" onclick="editTask(${task.id})">EDITAR</button>
                <button class="actions-btn delete-btn" onclick="deleteTask(${task.id})">REMOVER</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Criar nova tarefa
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    // Conexão com a API RESTAURADA
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });
    taskForm.reset();
    loadTasks();
});

// Excluir tarefa
async function deleteTask(id) {
    // Conexão com a API RESTAURADA
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadTasks();
}

// Editar tarefa
async function editTask(id) {
    const newTitle = prompt("Novo título:");
    const newDescription = prompt("Nova descrição:");
    if (newTitle && newDescription) {
        // Conexão com a API RESTAURADA
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle, description: newDescription })
        });
        loadTasks();
    }
}

// Inicializa
loadTasks();