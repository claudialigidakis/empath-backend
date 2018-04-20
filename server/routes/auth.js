const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')

router.get('/token', controller.isAuthenticated, controller.getAuthStatus)
router.post('/token', controller.login)


module.exports = router
