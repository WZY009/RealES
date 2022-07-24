const ejs = require("ejs")
const express = require("express");
const app = express();
const path = require('path')

app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/rand', (req, res) => {
    const randNum = Math.floor(Math.random() * 100) + 1;
    res.render('random', {rand : randNum})
})
 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.listen(3000, ()=>{
    console.log("Listening to host 3000")
})