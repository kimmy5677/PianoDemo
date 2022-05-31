const {mongoose} = require('mongoose')

const purchaseSchema = mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Users'
        },
        price:
        {
            type:Number,
            default:25,
            required:true
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Purchases',purchaseSchema)
