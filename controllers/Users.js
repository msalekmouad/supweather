let bcrypt = require("bcryptjs");
let {User} = require("../models/User.js");
let jwt = require("jsonwebtoken");
let gravatar = require("gravatar");
/**
    ** Summary. User registration
    ** Description POST /api/users/register
*/

exports.userRegister = (req,res,next) => {
    let  user = {full_name, email, password} = req.body; //destructuring params
    var url = gravatar.url(email, {s: '64', r: 'pg', d: 'mm'});
    user.avatar = url;
    let _user = new User(user);
    //? crypt password then insert user to database
    bcrypt
    .genSalt(10)
        .then(salt => {
            return bcrypt 
            .hash(_user.password, salt)
        })
        .then(hashedPassword => {
            _user.password = hashedPassword;
           return _user
            .save();
        })
        .then(user => {
            return res.status(201)
            .json({
                message: "User created successfully",
                date: new Date().toLocaleString(),
                user : user
                
            });
            
        })
        .catch(err => {next(err); return err;}); 

}

/**
    ** Summary. User Authentication
    ** Description POST /api/users/login
*/

exports.userLogin = async (req,res,next) => {
    let  { email, password} = req.body; //destructuring params

    //? user login process
    try {
        let _user = await User.findOne({email});
        if(!_user){
            //TODO throw user email not found error
            return res.status(422)
                .json({
                    error: true,
                    statsCode: 422,
                    message: "Email Not Found"
                });
        }
        else{
            let _isMatched = await bcrypt.compare(password,_user.password);
            if(!_isMatched){
             //TODO throw user password incorrect error
                return res.status(422)
                .json({
                    error: true,
                    statsCode: 422,
                    message: "Password Incorrect"
                });
             }else{

                //* USER PAYLOAD TO BE ENCRYPTED
                 let payload = {
                    id: _user.id,
                    email: _user.email,
                    avatar: _user.avatar,
                    created_at: _user.created_at,
                    login_date:new Date().toLocaleString()
                 }

                 //* CREATE THE JSON WEB TOKEN
                let _userToken = jwt.sign(
                    payload
                    , process.env.APP_JWT_KEY, {
                    expiresIn: "4h"
                });

                
                //* RETURN USER DETAILS TO STORE IN REDIS
                 return res
                    .status(200)
                    .json({
                        user_id: _user.id,
                        user_fullName: _user.full_name,
                        user_email: _user.email,
                        user_avatar: _user.avatar,
                        user_token: `Bearer ${_userToken}`
                    });
            }
        }
    } catch (error) {
        next(err); return err;
    }
}

