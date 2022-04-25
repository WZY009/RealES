const express = require('express');
const app = express();
const path = require('path')

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const comments = [
    {
        id:1,
        username:"Trry",
        comment:"Funny"
    },
    {
        id:2,
        username:"Tommy",
        comment:"That's a fucking crazy plan!"
    }
]

app.get('/comments', (req, res)=>{
    res.render('comments/index', {comments})
})
app.get('/comments/new', (req, res)=>{
    res.render('comments/new')
})
app.post('/comments', (req, res)=>{
    const {username, comment} = req.body
    comments.push({username, comment})
    res.redirect('/comments')
})
app.get('/comments/:id', (req, res)=>{
    const {id} = req.params
    const comment = comments.find(c => c.id === parseInt(id))
    res.render('comments/show', {comment})
}) 
app.get('/taco', (req, res)=>{
    res.send("Get response")
})
app.post('/taco', (req, res)=>{
    console.log(req.body)
    res.send("Post response")
})
app.listen(3000, ()=>{
    console.log("Listening to 3000")
})