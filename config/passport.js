const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const passport = require('passport');

//passport local strategy
module.exports = (passport) =>{
    passport.use(new LocalStrategy (
        {usernameField:'username' , passwordField:'password'},
        async(username ,password,done) =>{
            try{
                const user = await User.findOne({username});
                if(!user) return done(null, false),{message :"user not found"};

                //compare password
                const isMatch = await bcrypt.compare(password ,user.password);
                if(!isMatch) return done(null,false),{message: "invalide password"};

                return done(null,user);
            }catch(error){
                return done(error);
            }
        }
    ));



// Serialize user to store in session
passport.serializeUser((user,done) =>{
    done(null,user.id);
});


// Deserialize user from session
passport.deserializeUser(async(id,done)=>{
    try{
        const user =await User.findById(id);
        done(null,user);
    }catch(error){
        done(error);
    }
});

};