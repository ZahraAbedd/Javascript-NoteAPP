
const notes = [
    {
        id : 1 , 
        title : 'First Note',
        body : 'This is a note',
        updated : new Date().toISOString()
    },
    {
        id : 2 , 
        title : 'Second Note' , 
        body : 'This is a note',
        updated : new Date().toISOString()
    },
    {
        id : 3 ,
        title : 'Third Note' , 
        body : 'this is a note',
        updated : new Date().toISOString()
    }
]



export default class NotesAPI{
    static getNotes(){
        const savedNotes = JSON.parse(localStorage.getItem('notes-app')) || []
        return savedNotes.sort((a,b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        })

    }
    static saveNote(noteToSave){
        // 1. Existed Or Not 
        const notes = NotesAPI.getNotes()
        const existedNote = notes.find((n) => n.id == noteToSave.id)
        if(existedNote){
            existedNote.title = noteToSave.title
            existedNote.body = noteToSave.body
            existedNote.updated = new Date().toISOString()
        }else{
            console.log('YES')
            noteToSave.id = new Date().getTime()
            noteToSave.updated = new Date().toISOString()
            console.log(noteToSave)
            notes.push(noteToSave)
        }
        localStorage.setItem('notes-app' , JSON.stringify(notes))
    }
    static deleteNote(id){
        const notes = NotesAPI.getNotes()
        const filterdNotes = notes.filter(note => note.id != id)
        localStorage.setItem('notes-app' , JSON.stringify(filterdNotes))
    }
}

