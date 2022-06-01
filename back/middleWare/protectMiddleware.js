//Protect user only routes.
//Only users will be able to access their contact messages, as well as access their own listings and add listings  
const Users = require('../mongo/models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const protected = asyncHandler(async(req,res,next) =>
{
    let token 
    //Get the token from the header and decode it
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try
        {
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token,process.env.JWT_SECRET)

            req.user = await Users.findById(decode.id).select('-password')

            next()
        }
        catch (error)
        {
            console.log(error)
            res.status(400).json('Not authorized')
        }
    }

    if (!token)
    {
        res.status(401).json('Token not found')
    }
})

module.exports = {protected}