let {check, validationResult,body,query} = require("express-validator"); //? user input validation
let {User} = require("../models/User");
let bcrypt = require("bcryptjs");
let _ = require("lodash");

exports.signupValidation =  [
    /*
        Validation user inputs
        !All fields are required
    */
    check("full_name")
        .notEmpty().withMessage("Full Name required")
        .isLength({min: 5}).withMessage("Full Name require 5 Characters"),
    check("email")
        .notEmpty().withMessage("Email Required").
        isEmail().withMessage("Enter valid Email Address")
        .custom(async email => {
            let _user = await User.findOne({ email });
            if(_user !== null) {  throw new Error('this email is already in use'); }
            else { return true; } 
        })
        .withMessage("this email is already in use"),
    check("password")
        .notEmpty().withMessage("Password Required").
        isAlphanumeric().withMessage("Password must contain only letters and numbers")
        .isLength({ min: 8, max: 16 }).withMessage("Password must have 8 characters min and 16 max"),
    check("confirm_password")
        .custom((value,{req}) => {
            if(value !== req.body.password )
            {
                throw new Error('Password confirmation is incorrect');
            }else return true;
        })
];

exports.signingValidation = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .custom( async email => {
            let _user = await User.findOne({ email });
            if(!_user) {  throw new Error('This email does not exist'); }
            else { return true; } 
        }),
    body("password")
        .notEmpty().withMessage("Password Required")
        .custom(async (password, {req}) => {
            const {email} = req.body;
            let _user = await User.findOne({ email })
            if(_user){
                let _isMatched = await bcrypt.compare(password,_user.password);
                if(!_isMatched){ throw new Error('Password incorrect');} else { return true;}
            }

        })
]

exports.addCityValidation = [
    body("cityId")
        .notEmpty().withMessage("City ID is required for this operation")
        .custom(async (cityId, {req}) => {
            const {user} = req;
            const isAlreadyExists = user.cities.includes(cityId); 
            if(isAlreadyExists){
                throw new Error("this city its already available");
            }else{
                return true;
            }
        })
]

exports.getCityValidation = [
    query("id")
        .notEmpty().withMessage("Please specify the city id")
]

exports.getCitiesValidation = [
    query("ids")
        .notEmpty().withMessage("Please specify the id list of cities")
]

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
       return next();
       
    }
    else{
        const extractedErrors = []
        errors.array({
            onlyFirstError: true
        }).map(err => extractedErrors.push({ [err.param]: err.msg }))
  
        return res.status(400).json({
            errors: errors.array({
                onlyFirstError: true
            }),
        });
    }
  }

  
