
const fs = require('fs')
const chalk = require('chalk')

/**** Add Note function *****/
const addNote = function addNewNote(title, body){
    const notes = loadNotes()
    const duplicateNotes = notes.some(note => {
        return note.title === title
    })
    //console.log(duplicateNotes)
    
    if(duplicateNotes == false){
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.bgGreen("New note added!"))
        saveNotes(notes)
    }
    else{
        console.log(chalk.bgRed("Note title taken"))
    }
    
}
const saveNotes = function saveNoteToFile(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('./notes.json', dataJSON)
}


/**** Delete Note function *****/
let deleteNote = function deleteNoteByTitleName(title){
    let notes = loadNotes()
    let newNotes = notes.filter(note =>{
        return note.title !== title;
    })
    if(newNotes.length===notes.length){
        console.log(chalk.bgRed("No note found matching the title!"))
    }
    else{
        let dataJSON = JSON.stringify(newNotes)
        fs.writeFileSync('./notes.json', dataJSON)
        console.log(chalk.bgGreen("Note successfully deleted!"))
    }

}

/**** List Note function *****/
let listNotes = function listNotesTitles() {
    let notes = loadNotes();
    let cnt = 0; 
    notes.forEach(element => {
        console.log(chalk.bgGrey('\n----Note: ', ++cnt + '-----'));
        console.log(('Title: ' + element.title))
    });
}


/**** Read Note function *****/
let readNote = function readByTitleName(title){
    let notes = loadNotes()
    let note= notes.find(note => note.title==title);
    if(note){
       console.log(chalk.bgGrey(note.title))
       console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse("No note found!"))
    }
}

const loadNotes = function returnsSavedNotes() {
    try{
        const dataJSON = fs.readFileSync('./notes.json').toString()
        return JSON.parse(dataJSON) 
    }
    catch(e){ 
        return []
    }
}
module.exports = {
    addNote: addNote,
    deleteNote: deleteNote,
    listNotes: listNotes,
    readNote: readNote
}