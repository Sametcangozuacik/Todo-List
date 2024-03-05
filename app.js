const renderTodoList = () => {
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    todoList.forEach((todo, index) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
            <input type="checkbox" id="todo${index}" name="todo${index}" value="${todo.isDone}" ${todo.isDone && "checked"} />
            <label for="todo${index}">${todo.title}</label>
            <img class="delete-button" src="images/delete-button.svg" onclick="deleteTodo(${index})" />
        `;
        notesContainer.appendChild(todoItem);
    });
};

const toggleButton = document.getElementById("toggle-mode");
const body = document.body;
const image = document.querySelector("#toggleModeImg");

toggleButton.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");

    if (body.classList.contains("dark-mode")) {
        image.src = "images/day-mode.svg"; // Gece modu
    } else {
        image.src = "images/night-mode.svg"; // Gündüz modu
    }
});

function applyNote() {
    const noteInput = document.getElementById("noteInput");
    const note = noteInput.value.trim();
    if (note !== "") {
        const notesContainer = document.getElementById("notesContainer");
        const newNoteDiv = document.createElement("div");
        newNoteDiv.classList.add("notesContainer");

        const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
        const newTodo = {
            id: `${Date.now()}`,
            title: note,
            isDone: false,
        };
        const newTodoList = [...todoList, newTodo];
        localStorage.setItem("todoList", JSON.stringify(newTodoList));
        renderTodoList();

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("note-checkbox");
        newNoteDiv.appendChild(checkbox);

        const noteText = document.createElement("span");
        noteText.textContent = note;
        newNoteDiv.appendChild(noteText);

        const deleteButton = document.createElement("img");
        deleteButton.src = "images/delete-button.svg";
        deleteButton.alt = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.style.cursor = "pointer";
        newNoteDiv.appendChild(deleteButton);

        notesContainer.appendChild(newNoteDiv);

        if (notesContainer.children.length > 1) {
            const previousNote =
                notesContainer.children[notesContainer.children.length - 2];
            previousNote.style.borderBottom = "1px solid #ccc";
            previousNote.style.marginBottom = "10px";
        }

        noteInput.value = "";

        const noteContainer = document.getElementById("noteContainer");
        noteContainer.style.display = "none";
    } else {
        alert("Lütfen bir veri girin.");
    }
}

function deleteTodo(index) {
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    todoList.splice(index, 1); // Verilen indeksteki todo öğesini kaldır
    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderTodoList();

    // Delete işlemi gerçekleştiğinde, delete düğmesinin görüntüsünü değiştir
    const deleteButton = document.querySelector(`#notesContainer .todo-item:nth-child(${index + 1}) img`);
    if (deleteButton) {
        deleteButton.src = "images/delete-confirmed.svg"; // Silinme onayı görüntüsü
    }
}

function cancelNote() {
    const noteContainer = document.getElementById("noteContainer");
    noteContainer.style.display = "none";
}

let isAddModalOpen = false;

function showNoteInput() {
    const noteContainer = document.getElementById("noteContainer");
    noteContainer.style.display = isAddModalOpen ? "none" : "block";
    isAddModalOpen = !isAddModalOpen;
}

renderTodoList();

function deleteTodo() {
    localStorage.removeItem("todoList");
    renderTodoList();

    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = `
     <div class = "notesContainer-all-data-deleted" >
        <img class = "all-data-deleted-img" src="images/Detective-check-footprint 1.svg" alt="All Deleted">
        <p class = "all-data-deleted-p">Empty..</p>
     </div>
    `;
}