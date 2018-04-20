const express = require('express')
const router = express.Router()
const controller = require('../controllers/campaigns')

router.get('/', controller.getAll)
router.get('/:campaignsId', controller.getOne)
router.post('/', controller.create)
router.delete('/:campaignsId', controller.remove)

module.exports = router
