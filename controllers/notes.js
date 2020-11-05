
const notesRouter = require('express').Router()
const Note = require('../models/note')


notesRouter.post('/', async (req, res, next) => {
    const body = req.body
    const note = new Note({
        content:body.content,
        date: new Date(),
        important: body.important || false
    })
    const savedNote = await note.save()
    res.json(savedNote)
})

notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({})
    res.json(notes)
})

notesRouter.get('/:id', async (req, res, next) => {
    const note = await Note.findById(req.params.id)
    if(note){
        res.json(note)
    } else {
        res.status(404).end()
    }
})

notesRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    const result = await Note.findByIdAndRemove(id)
    if(result) {
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

notesRouter.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const object = req.body
    const note = {
        important: object.important
    }
    const updatedNote = await Note.findByIdAndUpdate(id, note, {new:true})
    res.json(updatedNote)
})


module.exports = notesRouter