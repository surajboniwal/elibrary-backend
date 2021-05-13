require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

//router import
const authRouter = require('./routers/auth')
const bookRouter = require('./routers/book')
const lendingRouter = require('./routers/lending')

//middlewares
app.use(express.json())
app.use(express.static('public'));

//Route middlewares
app.use('/qrscan', (req, res)=>{
    res.sendFile('/home/surajboniwal/Desktop/ELibrary/backend/public/qrscan.html')
})
app.use('/auth', authRouter)
app.use('/book', bookRouter)
app.use('/lend', lendingRouter)

mongoose.connect(process.env.DATABASE_STRING,{ useUnifiedTopology: true, useNewUrlParser:true }, async ()=>{
    console.log('Connected to database!')
    app.listen(process.env.PORT || 3000, ()=>console.log('Server started!'))
})
