const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

// The app.set() function is used to assigns the setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server.
app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, '/views')) // path binding
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/rand', (req, res)=>{
    const num = Math.floor(Math.random() * 1000) + 1;
    res.render('random', { num });
})

app.get('/r/:subreddit', (req, res)=>{
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    if(data) {
        res.render('subreddit', {...data}); 
        /*三个点（...）真名叫扩展运算符，是在ES6中新增加的内容，它可以在函数调用/数组构造时，将数组表达式或者string在语法层面展开；还可以在构造字面量对象时将对象表达式按照key-value的方式展开
        */
    }
    else {
        res.render('notfound', {subreddit});
    }

})

app.listen(3000, ()=>{
    console.log("Listening on 3000");
})