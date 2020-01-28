require('dotenv').config(); //?require environment variables

let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require("cors");
let passport = require("passport")
let RateLimit = require("express-rate-limit");
let xss = require("xss-clean");
const helmet = require('helmet');
let app = express();

//? routes declaration
let userRoutes = require("./routes/Users");
let citiesRoutes = require("./routes/Cities");


//? DDOS Attack limiter
const limiter = new RateLimit({
    windowMs: 15*60*1000, //15 minutes
    max: 100, //100 request per ip,
});
//app.use("/api",limiter);

//? Protect api from xss attacks
app.use(xss());
app.use(helmet.xssFilter());
app.use(helmet());

//? middlewares

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
        
}));

//? passport middleware
app.use(passport.initialize());

//* passport Config
require("./config/passport")(passport);
//* 

//? routes registration
app.use("/api/users",userRoutes);
app.use("/api/cities",citiesRoutes);


//! Error Middleware
app.use((err, req, res, next) => {
    res
    .status(err.status || 500)
    .json({
        error: true,
        statusCode: err.status || 500,
        message: err.message || "SERVER INTERNAL ERROR"
    });
});

module.exports = app;
