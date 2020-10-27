
const express = require("express")
const app = express()
const cors = require("cors")

const config = require("./utils/config")
const logger = require("./utils/logger")

const notesRouter = require('./controllers/notes')

app.use(cors())
app.use(express.json())
app.use(express.static("build"))

app.use('/api/notes', notesRouter)
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

app.use(errorHandler)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
