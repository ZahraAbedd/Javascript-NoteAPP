

export default class NotesView{
    constructor(root , handlers){
        this.root = root
        const {onNoteAdd , onNoteEdit , onNoteSelected , onNoteDeleted} = handlers
        this.onNoteAdd = onNoteAdd
        this.onNoteEdit = onNoteEdit
        this.onNoteSelected = onNoteSelected
        this.onNoteDeleted = onNoteDeleted
        this.root.innerHTML = `
        <div class="notes__sidebar">
        <div class="notes__logo">Note APP</div>
        <ul class="notes__list">
            <li class="notes__list-item notes__selected">
                <h2 class="notes__small__title">New Note</h2>
                <p class="notes__small__body">This is Your Note</p>
            </li>
        </ul>
        <button class="notes__add">ADD Note</button>
    </div>
        <div class="notes__preview">
        <input type="text" class="notes__title" placeholder="Your Notes ...">
        <textarea name="" id="" class="notes__body"></textarea>
    </div>
        `

    const addNoteBtn = this.root.querySelector('.notes__add')
    const inputTitleNote = this.root.querySelector('.notes__title')
    const inputBodyNote = this.root.querySelector('.notes__body')

    addNoteBtn.addEventListener("click" , () => {
        // run add note method 
        this.onNoteAdd()
    });
    [inputBodyNote , inputTitleNote].forEach((inputField) => {
        inputField.addEventListener('blur' , () => {    
            const newBody = inputBodyNote.value.trim()
            const newTitle = inputTitleNote.value.trim()
            this.onNoteEdit(newTitle , newBody)
        })
    });
    this.updateNotePreviewVisibility(false)
    }

    _createListItemHTML(id , title , body , updated){
        const MAX_BODY_LENGTH = 50;
        return `
        <li class="notes__list-item" data-note-id="${id}">
        <div class="notes__item-header">
            <div class="notes__small__title">${title}</div>
            <i class="fa-solid fa-trash-can" data-note-id="${id}"></i>
        </div>
        
        <div class="notes__small__body">
        ${body.substring(0 , MAX_BODY_LENGTH)}
        ${body.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="notes__small-updated">
            ${new Date(updated).toLocaleString("en" , {
                dateStyle : "full" ,
                timeStyle : "short",
            })}
        </div>
        </li>
        `;
    }
    updateNoteList(notes){
        const notesContainer = this.root.querySelector('.notes__list')
        let noteList = ""
        notesContainer.innerHTML = ""
        for(const note of notes){
            const {id , title , body , updated} = note
            const html = this._createListItemHTML(id , title , body , updated)
            noteList += html
        }
        notesContainer.innerHTML = noteList
        notesContainer.querySelectorAll('.notes__list-item').forEach((noteItem)=>{
            noteItem.addEventListener('click' , ()=>{
                this.onNoteSelected(noteItem.dataset.noteId)
            })
        })

        notesContainer.querySelectorAll('.fa-trash-can').forEach(noteItem => {
            noteItem.addEventListener('click' , (e)=>{
                e.stopPropagation()
                this.onNoteDeleted(noteItem.dataset.noteId)
            })
        });

    }
    updateActiveNote(note){
        this.root.querySelector('.notes__title').value = note.title
        this.root.querySelector('.notes__body').value = note.body

        this.root.querySelectorAll('.notes__list-item').forEach((item) => {
            item.classList.remove('notes__selected')
        })
        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
        .classList.add('notes__selected')
    }
    updateNotePreviewVisibility(visible){
        this.root.querySelector('.notes__preview').style.visibility = visible ? "visible" : "hidden";
    }
}