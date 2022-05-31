const {mongoose} = require('mongoose')

const userSchema = mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required:true
    },
    paid:{
        type:Boolean,
        default:false,
        required:true 
    }
}
,
{
    timestamps:true
}
)

module.exports = mongoose.model('Users',userSchema)
