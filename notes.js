const fs = require("fs");
const chalk = require("chalk");

// Add Notes to the note list...

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find((note) => note.title === title);

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body,
		});
		saveNotes(notes);
		const successMsg = chalk.bgGreen("New note added!");
		console.log(successMsg);
	} else {
		const errMsg = chalk.bgRed("Title already taken!");
		console.log(errMsg);
	}
};

// Remove Notes from the note list...

const removeNote = (title) => {
	// console.log(title);
	const notes = loadNotes();
	const remainingNotes = notes.filter((note) => !(note.title == title));
	if (remainingNotes.length === notes.length) {
		const errMsg = chalk.bgRed("Title do not exist");
		console.log(errMsg);
	} else {
		saveNotes(remainingNotes);
		const successMsg = chalk.bgGreen("Note Removed!");
		console.log(successMsg);
	}
};

// Listing all the notes...

const listNotes = () => {
	const notes = loadNotes();
	if (notes.length === 0) {
		console.log(chalk.red.inverse("List empty!"));
	} else {
		console.log(chalk.bold.white.inverse("Your notes: "));
		notes.forEach((note, index) => console.log(`${index + 1}. ${note.title}`));
	}
};

// Reading a specific note...

const readNote = (title) => {
	const notes = loadNotes();
	const noteToRead = notes.find((note) => note.title === title);
	if (noteToRead) {
		console.log(chalk.inverse(noteToRead.title));
		console.log(noteToRead.body);
	} else {
		console.log(chalk.red("Note not found!"));
	}
};

const saveNotes = (notes) => {
	const notesJSON = JSON.stringify(notes);
	fs.writeFileSync("noteStorage.json", notesJSON);
};

const loadNotes = () => {
	try {
		return JSON.parse(fs.readFileSync("noteStorage.json").toString());
	} catch (e) {
		return [];
	}
};

module.exports = {
	addNote,
	removeNote,
	listNotes,
	readNote,
};
