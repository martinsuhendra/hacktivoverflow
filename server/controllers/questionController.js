const Question = require('../models/questionModel')

class QuestionController {
    
    static create(req, res) {
  
        Question
            .create(req.body)
            .then((data) => {
                res.status(201).json({data, message : 'Question successfully posted!'})
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
    }

    static showAll(req, res) {
        Question
            .find()
            .populate('user')
            .then((questions) => {
                if (!questions) {
                    res.status(200).json({questions, message: "There is no questions posted yet"})
                } else {
                    res.status(200).json(questions)
                }
            })
            .catch((err)=> {
                res.status(500).json(err.message)
            })

    }

    static showList(req, res) {
       
        Question
            .find({ user : req.authenticatedUser.id})
            .populate('user')
            .then((questions) => {
                res.status(200).json(questions)
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
    }

    static showOne(req, res) {

        Question
            .findById({_id : req.params.questionId})
            .populate('user')
            .then((question) => {
                res.status(200).json(question)
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
    }

    static upvote(req, res) {
        console.log(req.params.questionId,'====');
        
        Question.findById(req.params.questionId)
          .populate("user")
          .then(data => {
            let downVote = data.downvotes.indexOf(req.authenticatedUser.id) < 0;
            let upVote = data.upvotes.indexOf(req.authenticatedUser.id) < 0;
            let sameVoter = req.authenticatedUser.id == data.user._id;
    
            if (sameVoter) {
              res.status(400).json({
                message: "you cannot vote your question"
              });
            } else if (downVote && upVote) {
              data.upvotes.push(req.authenticatedUser.id);
              return data.save();
            } else if (downVote == false) {
              data.downvotes = data.downvotes.filter(el => {
                return el !== req.authenticatedUser.id;
              });
              data.upvotes.push(req.authenticatedUser.id);
              return data.save();
            } else {
              data.upvotes = data.upvotes.filter(el => {
                return el !== req.authenticatedUser.id;
              });
              return data.save();
            }
          })
          .then(results => {
            res.status(200).json(results);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    
      static downvote(req, res) {
        Question.findById({ _id: req.params.questionId })
          .then(data => {
            let alreadyVoted = data.user._id == req.authenticatedUser.id;
            let downVote = data.downvotes.indexOf(req.authenticatedUser.id) < 0;
            let upVote = data.upvotes.indexOf(req.authenticatedUser.id) < 0;
    
            if (alreadyVoted) {
              res.status(400).json({
                message: "you cannot vote your question"
              });
            } else if (downVote && upVote) {
              data.downvotes.push(req.authenticatedUser.id);
              return data.save();
            } else if (upVote == false) {
              data.upvotes = data.upvotes.filter(el => {
                return el !== req.authenticatedUser.id;
              });
              data.downvotes.push(req.authenticatedUser.id);
              return data.save();
            } else {
              data.downvotes = data.downvotes.filter(
                el => el !== req.authenticatedUser.id
              );
              return data.save();
            }
          })
          .then(data => {
            res.status(200).json(data);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    
}

module.exports = QuestionController