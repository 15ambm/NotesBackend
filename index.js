require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const Note = require('./models/note')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const PORT = process.env.PORT

let notes = [
    {
      id: 1,
      content: "The first note",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

  
const generateID = () => {
    const maxID = notes.length > 0
    ? Math.max(...notes.map(note => note.id))
    : 0
    return maxID + 1
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }


app.post('/api/notes', (req, res) => {
    const body = req.body
    
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content:body.content,
        date: new Date(),
        important: body.important || false
    })

    note.save().then(savedNote => {
        res.json(savedNote)
    })
    .catch(err => {
        console.log(err)
    })
})

app.get('/', (req, res) => {
    res.send(
        '<h1>Hello World</h1>'
    )
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res, next) => {
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

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    Note.findByIdAndRemove(id)
    .then(result => {
        if(result) res.status(204).end()
        else res.status(404).end()
    })
    .catch(err => next(err))
})

app.put('/api/notes/:id', (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
