const ContactMessage = require('../mongo/models/contactMessageModel')
const asyncHandler = require('express-async-handler')

//Get all contact messages for user
const getContactMsg = asyncHandler(async (req,res) =>
{
    const contact = await ContactMessage.find({foruser:req.user.id})

    if(contact.length===0)
    {
        res.status(400).json('No messages')
    }
    else
    {
        res.status(200).json(contact)
    }
})

//Create contact message
const postContactMsg = asyncHandler(async (req,res) =>
{

})

const deleteContactMsg = asyncHandler(async(req,res) =>
{

})

module.exports = {getContactMsg,postContactMsg,deleteContactMsg}