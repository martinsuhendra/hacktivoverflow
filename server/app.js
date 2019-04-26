require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRoutes = require('./routes/userRoutes')
const questionRoutes = require('./routes/questionRoutes')
const answerRoutes = require('./routes/answerRoutes')
const cors = require('cors')

const cron = require('./helpers/cron')
cron.start()

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://martinsuhendra:${process.env.ATLAS}@hacktiv8-martin-jldez.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answers',answerRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app

