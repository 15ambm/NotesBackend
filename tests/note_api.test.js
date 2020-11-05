/* eslint-disable no-undef */

const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Note = require('../models/note')

beforeEach(async () => {
    await Note.deleteMany({})

    const noteObjects = helper.initialNotes
        .map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)


    // for (let note of helper.initialNotes) {
    //     let noteObject = new Note(note)
    //     await noteObject.save()
    // }
})

test('a valid note can be added', async () => {
    const newNote = {
        content: 'some great new content',
        important: true
    }

    await api  
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await helper.notesInDB()

    expect(response).toHaveLength(helper.initialNotes.length + 1)
    const content = response.map(r => r.content)
    expect(content).toContain('some great new content')

})

test('a note with no content is not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

    const response = await helper.notesInDB()

    expect(response).toHaveLength(helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
    const notesToStart = await helper.notesInDB()

    const note = notesToStart[0]

    const resultNote = await api 
        .get(`/api/notes/${note.id}`)
        .expect(200)
        .expect('Content-Type',/application\/json/ )

    const processedNote = JSON.parse(JSON.stringify(note))

    expect(resultNote.body).toEqual(processedNote)
})

test('a note can be deleted', async () => {
    const notesToStart = await helper.notesInDB()
    const noteToDelete = notesToStart[0]

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

    const result = await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type',/application\/json/ )

    expect(result.body).toHaveLength(helper.initialNotes.length - 1)
    
    const contents = result.body.map(r => r.content)

    expect(contents).not.toContain(noteToDelete.content)

})

test('Notes are returned as JSON', async () => {
    await api  
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type',/application\/json/)
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('first note aboute HTTP methods', async () => {
    const response = await api.get('/api/notes')

    const content = response.body.map(r => r.content)
    expect(content).toContain('Browser can execute only Javascript')
})

afterAll(() => {
    mongoose.connection.close()
})
  