//Routes for the piano api
const express = require('express');
const router = express.Router();
const {getPianos,postPianos,putPianos,deletePianos} = require('../controllers/pianoControllers')

router.get('/',getPianos)

router.post('/', postPianos)

router.put('/:id',putPianos)

router.delete('/:id',deletePianos)

module.exports = router