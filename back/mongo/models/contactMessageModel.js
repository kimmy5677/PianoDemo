const {mongoose} = require('mongoose')

const contactMessageSchema = mongoose.Schema(
{
    foruser:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    from:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    piano:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Pianos',
        required:true
    },
    details:
    {
        type:String,
        required:true
    },
    proposedCost:
    {
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model('ContactMessage',contactMessageSchema)