const Pianos = require('../mongo/models/pianosModel')
const Users = require('../mongo/models/userModel')
const Purchase = require('../mongo/models/purchaseModel')
const asyncHandler = require('express-async-handler')

//Get all pianos
const getListingsAll = asyncHandler(async (req,res)=>
{
    const pianos = await Pianos.find()
    res.status(200).json(pianos);
})

//Get pianos for a registered user
const getListingforUser = asyncHandler(async (req,res)=>
{
    const pianos = await Pianos.find({user:req.user.id})
 
    if(pianos.length===0)
    {
        res.status(400).json("No listings for this user");
    }
    else
    {
        res.status(200).json(pianos);
    }

})

//Create new piano
const createListing = asyncHandler(async (req,res)=>
{
    const {name,category,description,askingprice,imageurl} = req.body
    if(!name || !category || !description || !askingprice)
    {
        res.status(400).json({message:'Incomplete fields'})
    }

    //ONLY create a listing if the user has paid
    const purchase = await Purchase.find({user:req.user.id})

    if(purchase.length===0)
    {
        res.status(400).json({message:'User has not paid'})
    }
    else
    {
        const piano = await Pianos.create({
            name:name,
            category:category,
            description:description,
            imageurl:imageurl,
            askingprice:askingprice,
            user:req.user.id
        })
        res.status(200).json(piano)
    }



})

//Update listing info
const updateListing = asyncHandler(async (req,res) =>
{
    const {name,category,description,imageurl,askingprice} = req.body
    const piano = await Pianos.findById(req.params.id)

    if(!piano)
    {
        res.status(404).json('Listing not found')
    }
    
    //If the piano doesn't belong to the user 
    if(piano.user.toString()!==req.user.id)
    {
        res.status(400).json("You don't have permission to edit this listing")
    }
    else
    {
        const updatedListing = await Pianos.findByIdAndUpdate(piano._id,
            req.body,{
                name:name,
                category:category,
                description:description,
                imageurl:imageurl,
                askingprice:askingprice,
                user:req.user.id
            })

        if(!updatedListing)
        {
            res.status(400).json("Listing not updated")
        }
        else
        {
            res.status(200).json(updatedListing)
        }
    }

})

//Delete listing info
const deleteListing = asyncHandler(async (req,res) =>
{
    res.json({message:"del"});
    res.status(200);
})


module.exports = {
    getListingsAll,getListingforUser,createListing,updateListing,deleteListing
}