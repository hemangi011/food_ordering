const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
router.use(express.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = "MynameisRamgoRamSamSitaLakman$#" 

router.post("/loginuser",[
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({ min: 5})]
    ,async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email=req.body.email;
        try{
            let userData = await User.findOne({email});
            if(!userData) {
                return res.status(400).json({ errors: "Try login with correct credentials" });
            } 
            const pwdCOmpare = await bcrypt.compare(req.body.password,userData.password)
            if(!pwdCOmpare){
                return res.status(400).json({ errors: "Invalid password" });
            }
            const data = {
                user :{
                    id: userData.id
                } 
            }
            const authToken = jwt.sign(data,jwtSecret)
            return res.json({success:true,authToken:authToken});
        }catch(error){
            console.log(error);
            res.json({success:false});
        }
    })

    module.exports = router; 