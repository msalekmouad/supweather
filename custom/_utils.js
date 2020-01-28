let axios = require("axios");
let Users = require("../models/User").User;


const getCsrfToken = () => {
    return new Promise((resolve, reject) => {
        axios.default
        .get("/api/users/csrfToken")
        .then(response => {
            resolve(response.data.csrfToken);
        })
        .catch(err => {
            reject(null);
            }
        );
    })
}

exports.getJWT = (user) => {
    return new Promise((resolve, reject) => {
       getCsrfToken().then(token => {
           if(token){
                return axios.default.post("/api/users/login",{
                    ...user,
                    _csrf: token
                });
           }
           else{
               resolve(null);
           }
        }).then(res => {
            if(res.status === 200){
                resolve(res.data.user_token);
            }else{
                resolve(null);
            }
        }).catch(err => {
            resolve(null);
        })
    })
}