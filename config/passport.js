let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let User = require("../models/User").User;

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(),
opts.secretOrKey = process.env.APP_JWT_KEY
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        User
            .findById(jwt_payload.id)
            .then(user => {
                if(!user){
                    return done(null,false);
                }else{
                    return done(null,user);
                }
            }).catch(err => {
                throw err;
            })
    }));
}