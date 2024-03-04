function searchText() {
    const inputText = document.getElementById("myText").value;
    alert("Girilen metin: " + inputText);
}


const toggleButton = document.getElementById('toggle-mode');
const body = document.body;
const image = document.querySelector('#toggle-mode img');

toggleButton.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    if (body.classList.contains('dark-mode')) {
        image.src = 'images/day-mode.svg'; // Gece modu 
    } else {
        image.src = 'images/night-mode.svg'; // Gündüz modu 
    }
});


function showNoteInput() {
    const noteContainer = document.getElementById("noteContainer");
    noteContainer.style.display = "block";
}

function applyNote() {
    const noteInput = document.getElementById("noteInput");
    const note = noteInput.value.trim();
    if (note !== "") {
        const notesContainer = document.getElementById("notesContainer");
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";
        noteDiv.textContent = note;
        notesContainer.appendChild(noteDiv);
        noteInput.value = "";
        const noteContainer = document.getElementById("noteContainer");
        noteContainer.style.display = "none";
    } else {
        alert("Lütfen bir not girin.");
    }
}

function cancelNote() {
    const noteContainer = document.getElementById("noteContainer");
    noteContainer.style.display = "none";
}