const express = require('express')
const router = express.Router()
const {getPurchase, putPurchase, postPurchase} = require('../controllers/purchaseControllers')

router.get('/',getPurchase)

router.post('/',postPurchase)

router.put('/:id',putPurchase)

module.exports = router