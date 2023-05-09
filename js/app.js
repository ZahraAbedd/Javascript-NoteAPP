import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class APP{
    constructor(root){
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root , this._handlers());
        this._refreshNotes()
    }

    _refreshNotes(){
        const notes = NotesAPI.getNotes();

        // set Notes
        this.notes = notes
        this.view.updateNoteList(notes)
        this.view.updateNotePreviewVisibility(notes.length > 0)

        // Set Active Note
        this.activeNote = notes[0]
        this.view.updateActiveNote(notes[0])
    }
    _handlers(){
        return {
            onNoteAdd : () => {
                const newNote = {
                    title : "New Note",
                    body : "this is a note"
                };
                NotesAPI.saveNote(newNote)
                this._refreshNotes()
            },
            onNoteEdit : (newTitle , newBody) => {
                NotesAPI.saveNote({
                    id : this.activeNote.id ,
                    title : newTitle,
                    body : newBody
                })
                this._refreshNotes();
            },
            onNoteSelected : (noteid) => {
                const selectedNote = this.notes.find(n => n.id == noteid)
                this.activeNote = selectedNote
                this.view.updateActiveNote(selectedNote)
            },
            onNoteDeleted : (noteId) => {
                NotesAPI.deleteNote(noteId)
                this._refreshNotes()
            }
        }
    }
}

