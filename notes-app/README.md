# CLI Note Taking App
This is a simple command line note taking app build with node.js
The purpose of the project is to learn the filesystem in node.js environment and working with node modules.

### Fetures
 - Add Note
 - Delete Note
 - List all the available notes
 - Read a new node

## Dependencies
 - Node.js 
 - Chalk Module 
 - Yargs Module

### Run The App
 - first run `npm install` in command line to install dependencies
 - To Add a new note: `node app.js --title="Your Title" --body="Note Body"`
 - To delete a note: `node app.js delete --title="Note Title"` 
 - See all the notes: `node app.js list`
 - Read a note: `node app.js --title="Note Title you want read"`