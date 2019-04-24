const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Title is required']
    },
    description : {
        type : String,
        required : [true, 'Description is required'],
        minlength: [10, 'Description is too short'],
    },
    upvotes : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    downvotes : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions',
        required: [true, 'Question is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer