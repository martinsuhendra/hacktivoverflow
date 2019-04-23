const router = require('express').Router()
const questionController = require('../controllers/questionController')
const authentication = require('../middlewares/authentication')
// const authorization = require('../middlewares/authorization')

router.use('', authentication);
router.post('/',questionController.create);

module.exports = router
