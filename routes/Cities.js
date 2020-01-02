

const express = require('express');
const router = express.Router();
const passport = require("passport");
const {addCityValidation,validate,getCityValidation, getCitiesValidation} = require("../middleware/Validations.js");

//* Users Controller
let citiesController = require("../controllers/Cities");

// @route POST /api/cities/all
// @desc Get cities for specific user
// @access Private ( only authenticated users )

router.get('/all',passport.authenticate("jwt",{ session: false }),citiesController.getAll) ;

// @route POST /api/cities/all
// @desc Get cities for specific user
// @access Private ( only authenticated users )

router.post('/add',passport.authenticate("jwt",{ session: false }),addCityValidation,validate,citiesController.addCity) ;

// @route GET /api/cities?id=
// @desc Get specific city weather
// @access Private ( only authenticated users )

router.get('/',passport.authenticate("jwt",{ session: false }),getCityValidation,validate,citiesController.getCityWeather) ;

// @route GET /api/cities/list?ids=15151,51515,51515
// @desc Get weather for specific list ids 
// @access Private ( only authenticated users )

router.get('/list',passport.authenticate("jwt",{ session: false }),getCitiesValidation,validate,citiesController.getCitiesWeather) ;

// @route GET /api/cities/details?id=65465461
// @desc Get details for a specific city
// @access Private ( only authenticated users )

router.get('/details',passport.authenticate("jwt",{ session: false }),getCityValidation,validate,citiesController.getCityDetails) ;

// @route GET /api/cities/delete/:cityId
// @desc delete specific city
// @access Private ( only authenticated users )

router.delete('/delete/:cityId',passport.authenticate("jwt",{ session: false }),citiesController.deleteCity) ;


module.exports = router;