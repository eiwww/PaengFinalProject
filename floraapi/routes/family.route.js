const express = require('express')
const router = express.Router()

const familyController = require('../controllers/family.controller')

//retrieve all family
router.get('/', familyController.findAll)

//create new family
router.post('/',familyController.create)

//Retrive a single family with id 
router.get('/:Family_id',familyController.findById)

//update family with id
router.put('/:Family_id',familyController.update)

//delete family with id
router.delete('/:Family_id',familyController.delete)

module.exports = router