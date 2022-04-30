const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        lowercase:true,
        enum:['fruit', 'vegetable', 'dairy']
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product; // This row is to let other files to use Product