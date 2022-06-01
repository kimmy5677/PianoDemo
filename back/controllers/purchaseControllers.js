const Purchase = require('../mongo/models/purchaseModel')
const User = require('../mongo/models/userModel')
const asyncHandler = require('express-async-handler')

//Get the purchase ID 
const getPurchaseID = asyncHandler (async (req,res) => 
{
    const purchased = await Purchase.find({user:req.user.id})
    
    if(purchased.length===0)
    {
        res.status(400).json("This user hasn't paid")
    }
    else
    {
        res.status(200).json(purchased)
    }

})

//When user has paid, purchase will be added
const postPurchase = asyncHandler (async (req,res) =>
{
    const {price} = req.body

    if(!price)
    {
        res.status(400).json('Price required')
    }

    const purchased = await Purchase.create({
        price:price,
        user:req.user.id
    }) 

    if (!purchased)
    {
        res.status(400).json('Purchase not created')
    }
    else
    {
        //Update user to say user has paid
        /*
        const updatedUser = await Users.findByIdAndUpdate(req.user.id, 
            req.body,{
                paid:true
            })
        if (!updatedUser)
        {
            res.status(400).json('User not updated')
        }
        else
        {
            res.status(200).json(purchased)
        }*/

        res.status(200).json(purchased)
    }

})


module.exports = {
    getPurchaseID,postPurchase
}