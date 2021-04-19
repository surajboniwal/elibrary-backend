require('dotenv').config()
const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { registrationValidation, loginValidation } = require('../helpers/validations')
const { createToken, authenticateToken } = require('../helpers/jwt')

router.post('/register', async (req, res)=>{

    const data = req.body

    //Validation
    const validation = await registrationValidation(data)
    if(!validation.valid)
    return res.status(400).json(validation.errors)

    //Check user exist
    const existingEmail = await User.findOne({'email': data.email})
    if(existingEmail) return res.status(400).json({ "email" : {"message": "An account with this mail already exists"}})

    //Encrypt password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(data.password, salt)

    try{
        const user = new User({
            name: data.name,
            email: data.email,
            passwordHash: passwordHash,
            phoneNumber: data.phoneNumber,
            isAdmin: data.isAdmin
        })
        await user.save()
        const token = createToken(user._id)
        res.status(200).header('auth-token', token).json({id: user._id})        
    }   catch(err){
        res.status(400).json(err)
    }
})

router.post('/login', async (req, res)=>{

    const data = req.body

    //Validation
    const validation = await loginValidation(data)
    if(!validation.valid)
    return res.status(400).json(validation.errors)
    
    try{
        const user = await User.findOne({email : data.email}); 
        if(!user)
        return res.status(401).json({message : new Error( 'Invalid credentials' ).message})
        if(!await bcrypt.compare(data.password, user.passwordHash))
        return res.status(401).json({message : new Error( 'Invalid credentials' ).message})

        const token = createToken(user._id)
        res.status(200).header('auth-token', token).json({id: user._id})
        
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/user', authenticateToken, async (req, res)=>{
    const user = await User.findById(req.user.id).select('-passwordHash')
    res.status(200).json(user);
})

module.exports = router