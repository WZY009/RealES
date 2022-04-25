const express = require('express');
const app = express();
// app.use((req, res)  => {
//     console.log("we get a new request!")
//     //res.send("Hello!")
//     res.send('<h1>Hello! </h1>');
// })
app.get('/cats',(req, res) => {
    res.send('MEOW!')
})
// app.get('/r/:subreddit/:id', (req, res) => {
//     const {subreddit, id} = req.params;
//     res.send(`This is ${id}'s ${subreddit} subreddit`)
// })
app.get('/search', (req, res) => {
    const {q} = req.query;
    res.send(`<h1> search for: ${q} </h1>`)
})
app.listen(8080, () => {
    console.log("Listening on port 8080!")
})
