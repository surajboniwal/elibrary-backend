require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authenticateToken (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied')

    try{
        const verified = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.user = verified
        next()
    }catch(err){
        res.status(403).send('Invalid token')
    }
}

async function authenticateAdmin (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied')

    try{
        const verified = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        const user = await User.findById(verified.id)
        if(user.isAdmin) req.user = verified
        else return res.status(401).send('Access denied')
        next()
    }catch(err){
        res.status(403).send('Invalid token')
    }
}

function verifyQRToken (req, res, next) {
    const token = req.header('qr-token');
    if(!token) return res.status(401).send('Access denied')

    try{
        const verified = jwt.verify(token, process.env.JWT_QR_SECRET)
        req.qr = verified
        next()
    }catch(err){
        res.status(403).send('Invalid token')
    }
}

function createQRToken(id){
    const token = jwt.sign({id: id}, process.env.JWT_QR_SECRET)
    return token;
}

function createToken(id){
    const token = jwt.sign({id: id}, process.env.JWT_ACCESS_SECRET)
    return token
}

module.exports = {
    authenticateToken,
    createToken,
    authenticateAdmin,
    createQRToken,
    verifyQRToken
}