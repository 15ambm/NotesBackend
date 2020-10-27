
const express = require("express")
const app = express()
const cors = require("cors")

const config = require("./utils/config")
const logger = require("./utils/logger")

const Note = require("./models/note")

app.use(cors())
app.use(express.json())
app.use(express.static("build"))

// eslint-disable-next-line no-undef

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({error: error.message})
    }
  
    next(error)
}


app.post("/api/notes", (req, res, next) => {
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

app.get("/", (req, res) => {
    res.send(
        "<h1>Hello World</h1>"
    )
})

app.get("/api/notes", (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

app.get("/api/notes/:id", (req, res, next) => {
    Note.findById(req.params.id).then(note => {
        if(note){
            res.json(note)
        } else {
            res.status(404).end()
        }
    })
        .catch(err => {
            next(err)
        })

})

app.delete("/api/notes/:id", (req, res, next) => {
    const id = req.params.id
    Note.findByIdAndRemove(id)
        .then(result => {
            if(result) res.status(204).end()
            else res.status(404).end()
        })
        .catch(err => next(err))
})

app.put("/api/notes/:id", (req, res, next) => {
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

app.use(errorHandler)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
