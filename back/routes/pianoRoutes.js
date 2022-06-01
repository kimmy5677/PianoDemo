//Routes for the piano api
const express = require('express');
const router = express.Router();
const {getListingsAll,createListing,getListingforUser,updateListing,deleteListing} = require('../controllers/pianoControllers')
const {protected} = require('../middleWare/protectMiddleware')

router.get('/',getListingsAll)

router.get('/user', protected, getListingforUser)

router.post('/newListing', protected, createListing)

router.put('/:id', protected, updateListing)

router.delete('/:id', protected, deleteListing)

module.exports = router