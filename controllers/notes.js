
const notesRouter = require('express').Router()
const Note = require('../models/note')


notesRouter.post("/", (req, res, next) => {
    const body = req.body
    
    // if (!body.content) {
    //     return res.status(400).json({ error: 'content missing'})
    // }

    const note = new Note({
        content:body.content,
        date: new Date(),
        important: body.important || false
    })
    note.save()
        .then(savedNote => savedNote.toJSON())
        .then(formattedNote => res.json(formattedNote))
        .catch(err => next(err))
})

// app.get("/", (req, res) => {
//     res.send(
//         "<h1>Hello World</h1>"
//     )
// })

notesRouter.get("/", (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

notesRouter.get("/:id", (req, res, next) => {
    Note.findById(req.params.id).then(note => {
        if(note){
            res.json(note)
        } else {
            res.status(404).end()
        }
    })
        .catch(err => { next(err) })
})

notesRouter.delete("/:id", (req, res, next) => {
    const id = req.params.id
    Note.findByIdAndRemove(id)
        .then(result => {
            if(result) res.status(204).end()
            else res.status(404).end()
        })
        .catch(err => next(err))
})

notesRouter.put("/:id", (req, res, next) => {
    const id = req.params.id
    const object = req.body
    const note = {
        important: object.important
    }
    Note.findByIdAndUpdate(id, note, {new:true})
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(err => next(err))
})


module.exports = notesRouter