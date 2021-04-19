const { authenticateAdmin, authenticateToken } = require('../helpers/jwt')
const router = require('express').Router()
const Book = require('../models/Book')
const { addBookValidation } = require('../helpers/validations')
const { Error } = require('mongoose')

router.post('/', authenticateAdmin, async(req, res)=>{
    const data = req.body;

    //Validation
    const validation = await addBookValidation(data)
    if(!validation.valid) return res.status(400).json(validation.errors)
  
    try{
        const book = new Book(data)
        await book.save()
        res.status(201).send(book)
    }catch(err){
        res.status(500).send(err)
    }
    
})

router.delete('/:id', authenticateAdmin, async (req, res)=>{
    try{
        const book = await Book.findById(req.params.id)
        if(!book) return res.status(400).send(new Error('Invalid request').message)
        await book.remove()
        res.status(202).send('Book deleted')
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }

})

router.get('/', authenticateToken, async(req, res)=>{
    try{
        const books = await Book.find()
        res.status(200).send(books)
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/cover', authenticateAdmin, async(req, res)=>{
    try{
        const books = await Book.find()
        res.status(200).send(books)
    }catch(err){
        res.status(500).send(err)
    }
})

module.exports = router