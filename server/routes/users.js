const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')


router.get('/:userId', controller.getOne)
router.post('/', controller.create)
router.put('/:userId', controller.update)
router.delete('/:userId', controller.remove)


module.exports = router
