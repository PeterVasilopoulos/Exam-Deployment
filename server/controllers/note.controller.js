const Note = require("../models/note.model");

// Create Note
module.exports.createNote = (req, res) => {
    const newNote = req.body;
    Note.create(newNote)
    .then(note => res.json({results: note}))
    .catch(err => res.status(400).json(err))
}

// Get All Notes
module.exports.allNotes = (req, res) => {
    Note.find()
    .then(allNotes => res.json({results: allNotes}))
    .catch(err => res.json(err))
}

// Get One Note
module.exports.oneNote = (req, res) => {
    const idParam = req.params.id;
    Note.findOne({_id: idParam})
    .then(oneNote => res.json({results: oneNote}))
    .catch(err => res.json(err))
}

// Update Note
module.exports.updateNote = (req, res) => {
    const idParam = req.params.id;
    const updatedNote = req.body
    Note.findByIdAndUpdate({_id: idParam}, updatedNote, {new: true})
    .then(note => res.json({results: note}))
    .catch(err => res.status(400).json(err))
}

// Delete Note
module.exports.deleteNote = (req, res) => {
    const idParam = req.params.id;
    Note.deleteOne({_id: idParam})
    .then(deletedNote => res.json({results: deletedNote}))
    .catch(err => res.json(err))
}