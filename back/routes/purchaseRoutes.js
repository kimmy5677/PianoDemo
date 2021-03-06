const express = require('express')
const router = express.Router()
const {getPurchaseID,postPurchase} = require('../controllers/purchaseControllers')
const {protected} = require('../middleWare/protectRoute')

router.get('/', protected, getPurchaseID)

router.post('/', protected, postPurchase)


module.exports = router