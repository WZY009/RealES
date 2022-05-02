const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('common'))

app.use((req, res, next)=>{
    console.log(req.method)
    return next()
})
const verifyPassword = (req, res, next) =>{
    const {password} = req.query
    if(password === 'root') {
        return next()
    }
    res.send('Password?')
}

app.get('/', (req, res)=>{
    res.send('Home page!')
})

app.get('/dogs', verifyPassword, (req, res)=>{
    res.send('Woof')
})

app.listen(3000, ()=>{
    console.log('Listening on host 3000!')
})