const express = require('express')
const router = express.Router()
const {getContactMsg,postContactMsg,putContactMsg,deleteContactMsg} = require('../controllers/contactMessageControllers')

router.get('/',getContactMsg)

router.post('/',postContactMsg)

router.put('/:id',putContactMsg)

router.delete('/:id',deleteContactMsg)

module.exports = router