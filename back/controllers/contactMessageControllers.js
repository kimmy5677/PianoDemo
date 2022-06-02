//Create, get and delete contact message for user
const ContactMessage = require('../mongo/models/contactMessageModel')
const Pianos = require('../mongo/models/pianosModel')
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

    const {email,from,piano,details,proposedCost} = req.body
    
    if(!email || !from || !details || !piano || !details || !proposedCost)
    {
        res.status(400).json("Incomplete fields")
    }

    //Get the user id associated with the piano
    const thepiano = await Pianos.findById(piano)

    //Add contact message to database
    const contact = await ContactMessage.create({
        foruser:thepiano.user,
        email:email,
        from:from,
        piano:thepiano._id,
        details:details,
        proposedCost:proposedCost
    })

    //
    if(!contact)
    {
        res.status(400).json("Couldn't save message")
    }
    else{
        res.status(200).json({        
            email:email,
            from:from,
            details:details,
            proposedCost:proposedCost})
    }
})

//Delete a contact message
const deleteContactMsg = asyncHandler(async(req,res) =>
{
    const contact = await ContactMessage.findById(req.params.id)
    
    if(!contact)
    {
        res.status(400).json("Message not found")
    }

    //Only delete if the message belongs to the user
    if (contact.foruser.toString() !== req.user.id)
    {
        res.status(400).json("This contact message doesn't belong to this user")
    }
    else
    {
        await contact.remove()
        res.status(200).json("Message deleted")
    }

})

module.exports = {getContactMsg,postContactMsg,deleteContactMsg}