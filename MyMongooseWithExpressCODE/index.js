const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override')
const categories = ['fruit', 'vegetable', 'dairy', 'meat']   

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(()=>{
        console.log("Oh, Mongo connection open!")
    })
    .catch(err=>{
        console.log("Mongo error!")
        console.log(err)
    });

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


app.get('/products', async (req, res)=>{
    const products = await Product.find({})
    res.render('products/index',{ products })
})
app.get('/', (req, res)=>{
    res.send('You are opening the home page!')
})
app.get('/products/new', (req, res)=>{
    res.render('products/new')
})
app.post('/products', async (req, res)=>{
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/r/${newProduct._id}`)
})
app.get('/products/r/:id', async (req,res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/show', {product})
})
app.get('/products/r/:id/edit', async (req, res)=>{
    const { id } = req.params
    const product = await Product.findById(id) 
    res.render('products/edit', {product, categories})
})
app.put('/products/r/:id', async (req, res)=>{
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new: true})  
    res.redirect(`/products/r/${product._id}`)
})
app.delete('/products/r/:id', async(req, res)=>{
    const { id } = req.params
    const dletedProduct = await Product.findByIdAndDelete(id) 
    res.redirect('/products')

})
app.listen(3000, ()=>{
    console.log('Oh, App is listening on port 3000!!!!')
})