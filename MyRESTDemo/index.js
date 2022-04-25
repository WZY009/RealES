const express = require('express');
const app = express();
const path = require('path')
const { v4 : uuid } = require('uuid');
const methodOverride = require('method-override')

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
// What is the function of method override in express
// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

let comments = [
    {
        id:uuid(),
        username:"Trry",
        comment:"Funny"
    },
    {
        id:uuid(),
        username:"Tommy",
        comment:"That's a fucking crazy plan!"
    },
    {
        id:uuid(),
        username:"Jerry",
        comment:"Come on!"
    },
    {
        id:uuid(),
        username:"Mary",
        comment:"Why you are still unable to find an intern?"
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
    comments.push({username, comment, id:uuid()})
    res.redirect('/comments')
})
app.get('/comments/:id/edit', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', {comment})
})
app.get('/comments/:id', (req, res)=>{
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', {comment})
}) 
app.delete('/comments/:id', (req, res)=>{
    const {id} = req.params
    comments = comments.filter(c =>c.id !== id) // 将除了非目标的comment全部保留
    res.redirect('/comments')
})
app.patch('/comments/:id', (req, res)=>{
    const {id} = req.params
    const newCommentText = req.body.comment
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText
    res.redirect('/comments')

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