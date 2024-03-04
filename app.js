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
        // Yeni notu HTML içeriğine ekle
        const notesContainer = document.getElementById("notesContainer");
        const newNoteDiv = document.createElement("div");
        newNoteDiv.classList.add("note-item");

        // Checkbox oluştur
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("note-checkbox");
        newNoteDiv.appendChild(checkbox);

        // Not metni oluştur
        const noteText = document.createElement("span");
        noteText.textContent = note;
        newNoteDiv.appendChild(noteText);

        // Silme butonu ekle
        const deleteButton = document.createElement("img");
        deleteButton.src = "images/delete-button.svg"; // Silme butonunun resminin yolu
        deleteButton.alt = "Delete"; // Silme butonunun alternatif metni
        deleteButton.classList.add("delete-button");
        deleteButton.style.cursor = "pointer"; // Fare işaretçisini bir el işareti yapar
        deleteButton.addEventListener("click", function () {
            // Silme butonuna tıklandığında notu sil
            newNoteDiv.remove();
        });
        newNoteDiv.appendChild(deleteButton);

        notesContainer.appendChild(newNoteDiv);

        // Her notun altına çizgi ekle
        if (notesContainer.children.length > 1) {
            const previousNote = notesContainer.children[notesContainer.children.length - 2];
            previousNote.style.borderBottom = "1px solid #ccc";
            previousNote.style.marginBottom = "10px";
        }

        // Not giriş kutusunu temizle
        noteInput.value = "";

        // Not giriş kutusunu gizle
        const noteContainer = document.getElementById("noteContainer");
        noteContainer.style.display = "none";
    } else {
        alert("Lütfen bir veri girin.");
    }
}

function cancelNote() {
    const noteContainer = document.getElementById("noteContainer");
    noteContainer.style.display = "none";
}
