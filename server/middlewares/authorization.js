const { verify } = require('../helpers/j')
const Question = require('../models/questionModel')

module.exports = (req, res, next) => {
    const decoded = verify(req.headers.token)
    Question
        .findOne({ _id: req.params.userId })
        .populate('user')
        .then((findOneQuestion) => {
            if (findOneQuestion.user.email === decoded.email) next()
            else res.status(401).json({ type: 'AUTHORIZATION ERROR', message: 'You do not have access to this page!' })
        })
}