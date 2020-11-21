const chalk = require("chalk");
const yargs = require("yargs");

const notesUtils = require("./notes.js");

// create add command

yargs.command({
	command: "add",
	describe: "Add notes",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			string: true,
		},
		body: {
			describe: "Note body",
			demandOption: true,
			string: true,
		},
	},
	handler(argv) {
		notesUtils.addNote(argv.title, argv.body);
	},
});

yargs.command({
	command: "remove",
	describe: "Remove a note",
	builder: {
		title: {
			describe: "Title for note",
			demandOption: true,
			string: true,
		},
	},
	handler(argv) {
		notesUtils.removeNote(argv.title);
	},
});

yargs.command({
	command: "read",
	decribe: "Read a note",
	builder: {
		title: {
			describe: "Title of note to read",
			demandOption: true,
			string: true,
		},
	},
	handler(argv) {
		notesUtils.readNote(argv.title);
	},
});

yargs.command({
	command: "list",
	describe: "List all notes",
	handler() {
		notesUtils.listNotes();
	},
});

yargs.parse();
