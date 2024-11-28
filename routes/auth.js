const express =require('express');
const router =express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

// Registration Routes
router.get('/register' , userController.registrationForm);
router.post('/register' , userController.register);


// Login Routes
router.get('/login', userController.loginForm);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  }));
  
// Logout Route
router.get('/logout', userController.logout);
  
module.exports = router;

