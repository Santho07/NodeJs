const yargs = require("yargs");

const notes = require("./utils.js");

//console.log(process.argv)
//console.log(notes)
yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "Adding a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "delete",
  describe: "Deleting a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true, //must include title
      type: "string",
    },
  },
  handler: function (argv) {
    notes.deleteNote(argv.title);
  },
});
//create list command

yargs.command({
  command: "list",
  describe: "List your notes",
  handler: function () {
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  handler: function (argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
//node app.js --help
//console.log(yargs.parse())
