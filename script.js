const closeBtn = document.getElementById("close_button");
const menuBtn = document.getElementById("menu_button");
const menuPanel = document.getElementById("menu_panel");
const textAreaToBeRemoved = document.querySelector("textarea.hidden");
const addBtn = document.getElementById("add_button");
const noteSection = document.getElementsByClassName("notes");

addBtn.addEventListener("click", () => {
  addNewNote();
  document.body.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.classList.add(
    "hidden"
  );
});

let listItemId = "";
let listItemIdNumber = "";
let listItemsIdArray = [0];

function addNewNote() {
  const note = document.createElement("div");
  note.classList.add("new_notes", "mx-2", "mb-2");
  note.innerHTML = ` 
  <div
    class="tools bg-gray-300 px-3 flex justify-between space-x-2 rounded-t-lg"
  >
      <div class="group_save-delete">
                <button
                id="save_button"
                class="px-2 py-3 text-blue-500 cursor-pointer text-[14px]"
                >
                         <i class="fa-solid fa-floppy-disk"></i>
                </button>
                <button
                id="delete_button"
                class="px-1 py-1 text-red-500 text-[14px] cursor-pointer"
                >
                        <i class="fa-solid fa-trash"></i>
                </button>
      </div>
      <div class="group_edit-close">
                <button
                id="edit_button"
                class="px-2 py-3 text-orange-500  cursor-pointer"
                >
                        <i class="fa-solid fa-pen-to-square text-sm"></i>
                </button> 
                <button
                id="close_button_note"
                class="px-2 py-3 text-red-500 text-[14px]  cursor-pointer"
                >
                         <i class="fa-solid fa-xmark"></i>
                </button>
      </div>
  </div>
  <textarea class="note bg-[#c0ffc3] w-full h-[86vh] resize-none px-2 py-1 font-mono text-base"></textarea>`;
  document.body.firstElementChild.nextElementSibling.firstElementChild.append(
    note
  );

  const textArea = note.querySelector(".note");

  const noteValue = textArea.value;

  const getLiNumber = document.getElementsByTagName("li").length;

  const noteKeyName = getLiNumber + 1;

  listItemId = noteKeyName;

  listItemId == listItemsIdArray[listItemsIdArray.length - 1]
    ? listItemsIdArray.push(listItemsIdArray.length + 1)
    : listItemsIdArray.push(listItemsIdArray.length);

  note.classList.add(`Note_${listItemsIdArray[listItemsIdArray.length - 1]}`);

  console.log(listItemsIdArray);

  localStorage.setItem(noteKeyName, noteValue);

  const noteListItem = document.createElement("li");
  listItemIdNumber = noteListItem.setAttribute(
    "id",
    "Note_" + listItemsIdArray[listItemsIdArray.length - 1]
  );
  noteListItem.classList.add("bg-blue-300", "rounded-xl", "p-2");
  noteListItem.innerHTML = `Note_${
    listItemsIdArray[listItemsIdArray.length - 1]
  }`;
  document.body.firstElementChild.lastElementChild.firstElementChild.append(
    noteListItem
  );

  const closeNoteBtn = note.querySelector("#close_button_note");

  closeNoteBtn.addEventListener("click", () => {
    note.classList.add("hidden");
  });

  const editBtn = note.querySelector("#edit_button");

  editBtn.addEventListener("click", () => {
    textArea.readOnly = !textArea.readOnly;
  });

  const deleteBtn = note.querySelector("#delete_button");

  deleteBtn.addEventListener("click", () => {
    note.remove();
    noteListItem.remove();
    localStorage.removeItem(noteKeyName);
  });

  const saveBtn = note.querySelector("#save_button");

  saveBtn.addEventListener("click", () => {
    textArea.innerHTML = textArea.value;
    noteListItem.innerHTML = textArea.value;
    localStorage.setItem(noteKeyName, textArea.value);
    textArea.readOnly = true;
  });

  const selectedListItem = document.getElementById(
    `Note_${listItemsIdArray[listItemsIdArray.length - 1]}`
  );
  const selectedNote = document.querySelector(`.${selectedListItem.id}`);

  selectedListItem.addEventListener("click", () => {
    selectedNote.classList.add("z-90");
    selectedNote.classList.remove("hidden");
    closeAside();
  });
}

menuBtn.addEventListener("click", () => {
  menuPanel.classList.add("aside_active");
  menuPanel.classList.remove("hidden");
});

function closeAside() {
  menuPanel.classList.remove("aside_active");
  menuPanel.classList.add("hidden");
}

closeBtn.addEventListener("click", () => {
  closeAside();
});
