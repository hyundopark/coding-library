const router = require('express').Router()
const dogOwnersController = require('../controllers/dogOwnersController')
// other team member contribution deleted
const DogOwner = require('../models/dogOwner')
// other team member contribution deleted

module.exports = router

router.post('/', // other team member contribution deleted // , dogOwnersController.create)
router.get('/:id([0-9a-fA-F]{24})', dogOwnersController.readById)
router.delete('/:id([0-9a-fA-F]{24})', dogOwnersController.delete)
router.get('/', dogOwnersController.readAll)
router.put('/:id([0-9a-fA-F]{24})' // other team member contribution deleted // , dogOwnersController.update)