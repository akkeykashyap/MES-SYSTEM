const express =require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const session = require ("express-session");


//load envionmental variable
dotenv.config();

//initialize app
const app =express();

//passport config
require("./config/passport")(passport);

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

//static files
app.use(express.static(path.join(__dirname, "public")));

//express session
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect to database
connectDB();


//Routes
app.use("/inventory",require('./routes/inventory'));
app.use("/channel",require('./routes/channels'));
app.use("/auth",require('./routes/auth'));

//home Route
app.get("/",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("inventory/index",{user: req.user});    
    }else{
        res.redirect("auth/login");
    };
});

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server start at http://localhost:${PORT}`);
});
