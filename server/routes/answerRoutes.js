const router = require('express').Router()
const answerController = require('../controllers/answerController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const answerAuth = require('../middlewares/answerAuth')

router.get('/:questionId',answerController.showAll)
router.get('/detail/:answerId', answerController.showOne)

router.use('', authentication)
router.put('/:answerId/upvote', answerController.upvote)
router.put('/:answerId/downvote', answerController.downvote)
router.put('/:answerId', answerAuth, answerController.update)
router.delete('/:answerId', answerAuth, answerController.delete)
router.post('/',answerController.create);

module.exports = router
