const { Double, Decimal128 } = require('bson');
const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const pianosSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        category:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        imageurl:[String],
        askingprice:{
            type:Number,
            required:true
        },
        available:
        {
            type:Boolean,
            default:true,
            required:true
        },
        user:
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Users'
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Pianos',pianosSchema)