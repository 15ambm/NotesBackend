/* eslint-disable no-undef */

const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    console.log("AUTHORIZATION", authorization)
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}


notesRouter.post('/', async (req, res, next) => {
    const body = req.body

    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const note = new Note({
        content:body.content,
        date: new Date(),
        important: body.important || false,
        user: user._id
    })
    const savedNote = await note.save()
    try {
        user.notes = user.notes.concat(savedNote._id)
        await user.save()
    } catch (e) {
        next(e)
    } 
    res.json(savedNote)
})

notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({})
    res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
    const note = await Note.findById(req.params.id)
    if(note){
        res.json(note)
    } else {
        res.status(404).end()
    }
})

notesRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    const result = await Note.findByIdAndRemove(id)
    if(result) {
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

notesRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const object = req.body
    const note = {
        important: object.important
    }
    const updatedNote = await Note.findByIdAndUpdate(id, note, {new:true})
    res.json(updatedNote)
})


module.exports = notesRouter