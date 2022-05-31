const express = require('express')
const router = express.Router();
const {getUsers,postUsers,putUsers,deleteUsers} = require('../controllers/userControllers')



router.get('/',getUsers)

router.post('/',postUsers)

router.put('/:id',putUsers)

router.delete('/:id',deleteUsers)

module.exports = router