const Note = require('../models/note')

const initialNotes = [
    {
        content: 'HTML is easy',
        date: new Date(),
        important: false,
    },
    {
        content: 'Browser can execute only Javascript',
        date: new Date(),
        important: true,
    },
]

const notesInDB = async () => {
    const response = await Note.find({})
    return response.map(r => r.toJSON())
}


module.exports = {
    initialNotes, notesInDB
}