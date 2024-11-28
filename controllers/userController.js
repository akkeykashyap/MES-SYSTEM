const User = require('../models/user');
const bycrpt =require('bcryptjs');

// User registration
exports.registrationForm = (req,res) =>{
    res.render('auth/register');
};

exports.register = async(req,res) =>{
    const {username,password} = req.body;
    try{
        const hashedPassword = await bycrpt.hash(password,10);
        const newUser =new User({username ,password:hashedPassword});
        await newUser.save();
        res.redirect('/auth/login');
    }catch(err){
        res.status(500).send('error registration user');
    };
};

//User login
exports.loginForm = (req,res)=>{
    res.render('auth/login');
};

exports.login = (req,res)=>{
    res.render('/');
};

// User logout
exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err) return next(err);
        res.redirect('/login')
    });
};