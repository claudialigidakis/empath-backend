const express = require('express')
const router = express.Router()
const controller = require('../controllers/campaigns')

router.get('/', controller.getAll)
router.get('/:userId', controller.getOne)
router.post('/', controller.create)
router.delete('/:userId', controller.remove)

module.exports = router
