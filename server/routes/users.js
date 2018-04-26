const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')


router.get('/:usersId', controller.getOne)
router.get('/:usersId/requestUser/:reqUser', controller.getUserbyUsername)
router.post('/', controller.create)
router.delete('/:usersId', controller.remove)


//////////

const Campcontroller = require('../controllers/campaigns')

router.get('/:usersId/campaigns', Campcontroller.getAll)
router.get('/:usersId/campaigns/:campaignsId', Campcontroller.getOne)
router.post('/:usersId/campaigns', Campcontroller.create)
router.post('/:userId/campaigns/:campaignsId', Campcontroller.AddUser)
router.delete('/:requestUser/campaigns/:campaignsId', Campcontroller.remove)

module.exports = router
