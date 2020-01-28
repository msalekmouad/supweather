const express = require('express');
const router = express.Router();
const csrf = require("csurf");
const csrfProtection = csrf({cookie :true});
const passport = require("passport");

const {signupValidation,validate,signingValidation} = require("../middleware/Validations");
//* Users Controller
let userController = require("../controllers/Users");



//?CSRF TOKEN MIDDLEWARE
router.use(csrfProtection);

// @route GET /api/users/csrfToken
// @desc CSRF Token
// @access Public

router.get("/csrfToken", (req,res,next) => {
    res.status(200)
        .json({
            csrfToken: req.csrfToken()
        });
});

// @route POST /api/users/register
// @desc User registration
// @access Public

router.post('/register',signupValidation,validate, userController.userRegister) ;

// @route POST /api/users/login
// @desc User Login
// @access Public

router.post('/login',signingValidation,validate, userController.userLogin);

// @route POST /api/users/checkAuth
// @desc check if user token valid 
// @access (only for authenticated users)

router.get('/checkAuth',passport.authenticate("jwt", {session: false}),(req,res,next) => {
    res.status(202)
        .json({
            accepted: true,
            token_validation: true
        });
});

module.exports = router;