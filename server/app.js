require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRoutes = require('./routes/userRoutes')
const questionRoutes = require('./routes/questionRoutes')
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/' + process.env.DB_URL, { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/users', userRoutes)
app.use('/questions', questionRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app

