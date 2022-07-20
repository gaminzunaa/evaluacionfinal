const nt = document.getElementById("xd1");
const añadirnota = nt.querySelector(".xddd");

getNotes().forEach((nota) => {
  const noteElement = createNoteElement(nota.id, nota.content);
  nt.insertBefore(noteElement, añadirnota);
});

añadirnota.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("postit-notas") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("postit-notas", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  
  element.classList.add("nota");
  element.value = content;
  element.placeholder = " Nota vacia";

  element.addEventListener("change", () => {
    actualizarnota(id, element.value);
  });

  element.addEventListener("click", () => {
    const doDelete = confirm("si desea eliminar esta nota presione aceptar en caso contrario cancelar"
    );

    if (doDelete) {
      eliminarnota(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  nt.insertBefore(noteElement, añadirnota);

  notes.push(noteObject);
  saveNotes(notes);
}

function actualizarnota(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function eliminarnota(id, element) {
  const notes = getNotes().filter((nota) => nota.id != id);

  saveNotes(notes);
  nt.removeChild(element);
}
