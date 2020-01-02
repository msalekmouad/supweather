const express = require('express');
const router = express.Router();
const csrf = require("csurf");
const csrfProtection = csrf({cookie :true});

const {signupValidation,validate,signingValidation} = require("../middleware/Validations");
//* Users Controller
let userController = require("../controllers/Users");

// @route POST /api/users/register
// @desc User registration
// @access Public



router.use(csrfProtection);

router.get("/csrfToken", (req,res,next) => {
    res.status(200)
        .json({
            csrfToken: req.csrfToken()
        });
})

router.post('/register',signupValidation,validate, userController.userRegister) ;

// @route POST /api/users/login
// @desc User Login
// @access Public

router.post('/login',signingValidation,validate, userController.userLogin);

module.exports = router;