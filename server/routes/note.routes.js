const NoteController = require("../controllers/note.controller");

module.exports = (app) => {
    // Create Note
    app.post("/api/notes/new", NoteController.createNote);

    // Get All Notes
    app.get("/api/notes", NoteController.allNotes);

    // Get One Note
    app.get("/api/notes/:id", NoteController.oneNote);

    // Update Note
    app.put("/api/notes/update/:id", NoteController.updateNote);

    // Delete Note 
    app.delete("/api/notes/delete/:id", NoteController.deleteNote);
}