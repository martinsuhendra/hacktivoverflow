const router = require('express').Router()
const questionController = require('../controllers/questionController')
const authentication = require('../middlewares/authentication')
// const authorization = require('../middlewares/authorization')

router.get('/',questionController.showAll)
router.get('/:questionId', questionController.showOne)

router.use('', authentication);
router.put('/:questionId/upvote', questionController.upvote)
router.put('/:questionId/downvote', questionController.downvote)
router.get('/myList',questionController.showList)
router.post('/',questionController.create);

module.exports = router
