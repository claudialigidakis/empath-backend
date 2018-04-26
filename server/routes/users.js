const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')


router.get('/:usersId', controller.getOne)
router.post('/', controller.create)
router.delete('/:usersId', controller.remove)


//////////

const Campcontroller = require('../controllers/campaigns')

router.get('/:usersId/campaigns', Campcontroller.getAll)
router.get('/:usersId/campaigns/:campaignsId', Campcontroller.getOne)

// router.get('/:usersId/campaigns/:campaignsId/hashtags', Campcontroller.)
// router.get('/:usersId/campaigns/:campaignsId/usernames', Campcontroller.)

router.post('/:usersId/campaigns', Campcontroller.create)
router.delete('/:usersId/campaigns/:campaignsId', Campcontroller.remove)

module.exports = router
