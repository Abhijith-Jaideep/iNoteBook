const express = require("express")
const Router = express.Router()
const User = require('../models/Users')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt =  require('jsonwebtoken')
const fetchUser = require("../middleware/fetchUser")

const JWT_secret= "Abhijith"

Router.post('/createUser',
        body('name').isLength({min : 3}),
        body('email').isEmail(),
        body('password').isLength({ min: 8 }),
        async (req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        let duplicate = await User.findOne({email:req.body.email})
        if(duplicate){
            return res.status(400).send("already exists") 
        }

        const salt  = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(req.body.password,salt) 
        let user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashed
        }
        )
        const data={
            user:{
                id:user._id,
            }
        }
        const  token = await jwt.sign(data,JWT_secret);
        res.send({token})
})


Router.post('/login',
body('email').isEmail(),
async (req,res)=>{

const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

const {email,password}= req.body

const user  = await User.findOne({email})
if(!user){
    return res.status(400).json({ errors: "incorrect email try again" })
}

if(! await bcrypt.compare(password,user.password)){
    return res.status(400).json({ errors: "incorrect password try again" })
}

const data = {
    user:{
        id:user._id,
    }
}

const token = jwt.sign(data,JWT_secret)
res.json({userdetaills:token})

})


Router.get('/getUser',fetchUser, async (req,res) =>{
    const userID = req.user.id
    const user = await User.findById(userID).select("-password")
    res.json(user)
    
})
module.exports = Router