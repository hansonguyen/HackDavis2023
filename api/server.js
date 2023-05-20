require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const petsRoutes = require('./routes/pets')

const app = express()

// Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
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
