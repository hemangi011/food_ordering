const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
router.use(express.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = "MynameisRamgoRamSamSitaLakman$#" 
router.post("/createuser",[
body('email').isEmail(),
body('name').isLength({ min: 3}),
body('password','Incorrect Password').isLength({ min: 5})]
,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password,salt)

    try{
        await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email
        })
        res.json({success:true});
    }catch(error){
        console.log(error);
        res.json({success:false});
    }
})


module.exports = router; 