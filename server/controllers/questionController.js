const Question = require('../models/questionModel')

class QuestionController {
    
    static create(req, res) {
        console.log(req.body,'=== ini body');
        
        Question
            .create({
              title : req.body.title,
              description : req.body.description,
              user : req.body.user
            })
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
                    console.log(questions,'=======');
                    
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
              console.log(questions,'=====');
              
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
        let totalVotes = 0;
        let question = null;
        Question.findById(req.params.questionId)
          .populate("user")
          .then(data => {
            totalVotes = Math.abs(data.upvotes.length - data.downvotes.length)
            question = data;
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
            totalVotes = Math.abs(question.upvotes.length - question.downvotes.length)
            // console.log(totalVotes,'===');
            res.status(200).json(totalVotes);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    
      static downvote(req, res) {
        let totalVotes = 0
        Question.findById({ _id: req.params.questionId })
          .then(data => {
            let alreadyVoted = data.user._id == req.authenticatedUser.id;
            let downVote = data.downvotes.indexOf(req.authenticatedUser.id) < 0;
            let upVote = data.upvotes.indexOf(req.authenticatedUser.id) < 0;
            totalVotes = Math.abs(data.upvotes.length - data.downvotes.length)
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
            totalVotes = Math.abs(data.upvotes.length - data.downvotes.length)
            res.status(200).json(totalVotes);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    
}

module.exports = QuestionController