const Users = require('../mongo/models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//Generate token for user
const generateJWToken = (id) =>
{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '15d',
    })
}


const getUser = asyncHandler(async (req,res) =>
{
    const user = await Users.findById(req.user.id)

    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        paid:user.paid
    });
})

//Create user - user register
const postCreateUser = asyncHandler(async (req,res) =>
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
        //Bcrypt password. Plain text passwords shoudlnt be stored in database

        const salt = await bcrypt.genSalt(15)
        const EncryptedPass = await bcrypt.hash(password,salt)


        //Time to create user
        const user = await Users.create({
            name:name,
            email:email,
            password:EncryptedPass,
            paid:false
        })

        //Return login jwt token
        if (user)
        {
            res.status(200).json({
                _id:user.id,
                name:user.name,
                email:user.email,
                token:generateJWToken(user._id)
            });
        }
        else
        {
            res.status(400).json('Registration failed'); 
        }
     }
})

//Log the user in 
const loginUser = asyncHandler(async (req,res) =>
{
    const {email,password} = req.body

    if (!email || !password)
    {
        res.status(400).json("Incomplete fields")
    }

    //Find the user in tthe database by their email
    const user = await Users.findOne({email})

    if (user && (await bcrypt.compare(password, user.password)))
    {
        res.status(200).json({
            _id:user.id,
            name: user.name,
            email:user.email,
            token:generateJWToken(user._id)
        })
    }
    else
    {
        res.status(400).json("Invalid credentials")
    }
})

const editUser = asyncHandler(async (req,res) =>
{
    const {name,email,password,paid} = req.body
    const user = await Users.findById(req.user.id)

    const updatedUser = await Users.findByIdAndUpdate(user._id, 
        req.body,{
            name:name,
            email:email,
            password:password,
            paid:paid
        })
    if (!updatedUser)
    {
        res.status(400).json('User not updated')
    }

})


module.exports = {getUser,postCreateUser,editUser,loginUser}

