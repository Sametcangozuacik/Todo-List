const notesContainer = document.getElementById("notesContainer")
const searchInput = document.querySelector("#myText");


searchInput.addEventListener("keyup", (e) => {
    searchText(e.target.value.toLowerCase())
});

const renderTodoList = () => {
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    todoList.forEach((todo, index) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
            <input class="Todo-checkbox" type="checkbox" id="todo${index}" name="todo${index}" value="${todo.isDone}" ${todo.isDone && "checked"} />
            <label for="todo${index}">${todo.title}</label>
            <img class="delete-button" src="images/delete-button.svg" onclick="deleteTodo(${index})" />
        `;
        notesContainer.appendChild(todoItem);
    });

    if (notesContainer.children.length <= 0) {
        showEmptyState();
    }
};

function showEmptyState() {

    notesContainer.innerHTML = `
     <div class="notesContainer-all-data-deleted" >
        <img class="all-data-deleted-img" src="images/Detective-check-footprint 1.svg" alt="All Deleted">
        <p class="all-data-deleted-p">Empty...</p>
     </div>
    `;
}

function deleteTodo(index) {
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderTodoList();
}

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

        if (notesContainer.children.length > 1) {
            const previousNote = notesContainer.children[notesContainer.children.length - 2];
            previousNote.style.borderBottom = "1px solid #ccc";
            previousNote.style.marginBottom = "10px";
        }

        noteInput.value = "";
        noteContainer.style.display = "none";
    } else {
        alert("Lütfen bir veri girin.");
    }
}
let isAddModalOpen = false;

function cancelNote() {
    noteContainer.style.display = "none";
    isAddModalOpen = !isAddModalOpen;
}


function showNoteInput() {
    noteContainer.style.display = isAddModalOpen ? "none" : "block";
    isAddModalOpen = !isAddModalOpen;
}

renderTodoList();

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

const todoList = JSON.parse(localStorage.getItem("todoList")) || [];

function searchText(searchTerm) {
    const filteredList = todoList.filter(todo => todo.title.toLowerCase().includes(searchTerm));
    renderFilteredTodoList(filteredList);
};

const renderFilteredTodoList = (filteredList) => {
    notesContainer.innerHTML = "";

    filteredList.forEach((todo, index) => {
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

function deleteTodo(index) {
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderTodoList();
}