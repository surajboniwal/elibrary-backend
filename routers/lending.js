const { authenticateAdmin, authenticateToken, createQRToken, verifyQRToken } = require('../helpers/jwt')
const LendingContract = require('../models/LendingContract')
const QRCode = require('qrcode')

const router = require('express').Router()

router.post('/', authenticateToken, async(req, res)=>{
    const data = req.body
    const user = req.user
    try {
        const lendingContract = new LendingContract({
            student_id: user.id,
            book_id: data.book_id,
        })
        await  lendingContract.save()
    } catch (err) {
        res.status(500).send(err)
    }

    res.send('Lending contract saved!')
})

router.get('/:id/accept', authenticateAdmin, async(req, res)=>{
    try{
        const lendingContract = await LendingContract.findOne({ _id: req.params.id})
        const token = createQRToken(lendingContract._id);
        QRCode.toString(token, {type: 'terminal'}, function(err, url){
            if(err) return console.log("QR Code error")
            console.log(url)
        })
        res.send({token: token})
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/verify', verifyQRToken, authenticateToken ,async(req, res)=>{
    const qr = req.qr;
    const lendingContract = await LendingContract.findOne({_id: qr.id})
    if(lendingContract.student_id == req.user.id){
        await lendingContract.updateOne({status: true})
        res.status(200).send("Request accepted");
    }else{
        res.send("Request rejected")
    }
})

router.get('/', authenticateAdmin,async(req, res)=>{
    const lendingContracts = await LendingContract.find().populate()
    res.send(lendingContracts)
})

module.exports = router