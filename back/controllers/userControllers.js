const Users = require('../mongo/models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const getUsers = asyncHandler(async (req,res) =>
{
    res.json({message:"put"});
    res.status(200);
})

const postUsers = asyncHandler(async (req,res) =>
{
    const {name, email, password} = req.body

    //Check if all fields are complete
    if(!name || !email || !password)
    {
        res.status(400).json('Incomplete'); 
    }

    //Checking if user exists currently 
    const existingUser = await Users.findOne({email})
     if(existingUser)
     {
        res.status(400).json('User already exists'); 
     }
     else
     {
        //Bcrypt password. Plain text passwords shoulnt be stored in database

        const salt = await bcrypt.genSalt(15)
        const EncryptedPass = await bcrypt.hash(password,salt)


        //Time to create user
        const user = await Users.create({
            name:name,
            email:email,
            password:EncryptedPass,
            paid:false
        })

        if (user)
        {
            res.status(200).json(email+' successfully registered');
        }
        else
        {
            res.status(400).json('Registration failed'); 
        }
     }
})

const putUsers = asyncHandler(async (req,res) =>
{
    res.json({message:"put"});
    res.status(200);
})

const deleteUsers = asyncHandler(async (req,res) =>
{
    res.json({message:"put"});
    res.status(200);
})

module.exports = {getUsers,postUsers,putUsers,deleteUsers}

