// Step1 make a successful connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp') // Pay attention to the pos of movieApp
    .then(()=>{
        console.log("Oh, you succeed!")
    })
    .catch(err=>{
        console.log(err)
    });

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    onSale:{
        type:Boolean,
        default: false
    }
})

// Add model instance methods!
productSchema.methods.greet = function() {
    console.log("Hello!!")
    console.log(` - from ${this.name}`) // 'this' ponits to the instant calling for greet()
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, {onSale:true, price:0})
}

const Product = mongoose.model('Product', productSchema)

Product.fireSale().then(res=>console.log(res))

// call for greet()
const findProduct = async ()=>{
    const foundProduct = await Product.findOne({name:'喜德盛'})
    foundProduct.greet()
}

// mongoose virtual

// defining mongoose middleware

/*

 * The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database. Furthermore, it's pluralization not just adding an 's'!
*/

// const bike = new Product({name: "喜德盛", price: 5631})
// bike.save()
//     .then(data=>{
//         console.log("Ok")
//         console.log(data)
//     })
//     .catch(err=>{
//         console.log("Error!")
//         console.log(err)
//     })

// you definitely want to use a traditional function expression, not an arrow function. Because the value of 'this' changes. The value of 'this' in an instance method will be the particular instance of a product. If we use arrow function, we won't have that value for 'this'.
