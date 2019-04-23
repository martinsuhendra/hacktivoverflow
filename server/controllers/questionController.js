const Question = require('../models/questionModel')

class QuestionController {
    
    static create(req, res) {
        console.log('masuk sini');
        
        if (!req.headers.token) {
            res.status(401).json({message : 'Sorry, you are not authenticated... Please login to continue'})
        } else {
            
            Question
                .create(req.body)
                .then((data) => {
                    res.status(201).json({message : 'Question successfully created!'})
                })
                .catch((err) => {
                    res.status(500).json(err.message)
                })
        }
    }
}

module.exports = QuestionController