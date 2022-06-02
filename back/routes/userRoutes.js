const express = require('express')
const router = express.Router();
const {getUser,postCreateUser,editUser,loginUser} = require('../controllers/userControllers')
const {protected} = require('../middleWare/protectRoute')

router.post('/register',postCreateUser)

router.get('/myaccount',protected, getUser)

router.post('/login',loginUser)

router.post('/editAccount',protected,editUser)


module.exports = router