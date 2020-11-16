/* eslint-disable no-undef */

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

describe('When there is one User in DB initially', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const initialUserData = {
            username:'gooby',
            name:'alex',
            password:'secure12345'
        }
        await new User(initialUserData).save()
    })
    test('Can add another user to DB', async () => {
        const initialUserData = {
            username:'anotherone',
            name:'mase',
            password:'secure12345'
        }
        await api
            .post('/api/users')
            .send(initialUserData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const users = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(users.body).toHaveLength(2)
        expect(users.body.map(u => u.username)).toContain(initialUserData.username)

    })
    test('Cannot add a user with the same name as existing user', async () => {
        const initialUserData = {
            username:'gooby',
            name:'alex',
            password:'secure12345'
        }
        const result = await api
            .post('/api/users')
            .send(initialUserData)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        console.log(result.body)

    })


})

afterAll(() => {
    mongoose.connection.close()
})