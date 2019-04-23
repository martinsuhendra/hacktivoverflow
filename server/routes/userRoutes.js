const router = require('express').Router()
const userController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
// const authorization = require('../middlewares/authorization')

router.post('/signUp', userController.register)
router.post('/signIn', userController.signIn)

module.exports = router
