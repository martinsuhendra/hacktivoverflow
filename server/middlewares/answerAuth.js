const { verify } = require('../helpers/jwt')
const Answer = require('../models/answerModel')

module.exports = (req, res, next) => {
    const decoded = verify(req.headers.token)
    Answer
        .findOne({ _id: req.params.answerId })
        .populate('user')
        .then((findOneQuestion) => {
            if (findOneQuestion.user.email === decoded.email) next()
            else res.status(401).json({ type: 'AUTHORIZATION ERROR', message: 'You do not have access to this page!' })
        })
}