const Pianos = require('../mongo/models/pianosModel')
const asyncHandler = require('express-async-handler')


const getPianos = asyncHandler(async (req,res)=>
{

    const pianos = await Pianos.find()
    
    
    res.status(200).json(pianos);

})

//Create new piano
const postPianos = asyncHandler(async (req,res)=>
{
    const {name,category,description,askingprice,user,imageurl} = req.body
    if(!name || !category || !description || !askingprice || !user)
    {
        res.status(400).json({message:'Incomplete'})
    }

    const piano = await Pianos.create({
        name:name,
        category:category,
        description:description,
        imageurl:imageurl,
        askingprice:askingprice,
        user:user
    })
    res.status(200).json(piano)
})

const putPianos = asyncHandler(async (req,res) =>
{
    res.json({message:"put"});
    res.status(200);
})

const deletePianos = asyncHandler(async (req,res) =>
{
    res.json({message:"del"});
    res.status(200);
})


module.exports = {
    getPianos, putPianos, postPianos, deletePianos
}