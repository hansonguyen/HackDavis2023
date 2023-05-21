require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const petsRoutes = require('./routes/pets')

const app = express()

// Middleware
app.use(
    cors({
        origin: ['http://localhost:3000']
    })
)
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/pets', petsRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Start listening
        app.listen(process.env.API_PORT, () => {
            console.log(`Connected to DB and listening on port ${process.env.API_PORT}`)
        })
    })
    .catch(() => {
        console.log(error)
    })