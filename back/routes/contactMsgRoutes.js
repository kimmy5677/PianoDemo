const express = require('express')
const router = express.Router()
const {getContactMsg,postContactMsg,deleteContactMsg} = require('../controllers/contactMessageControllers')
const {protected} = require('../middleWare/protectMiddleware')

router.get('/',protected, getContactMsg)

router.post('/',postContactMsg)

router.delete('/:id',protected,deleteContactMsg)

module.exports = router