let User = require("../models/User").User;
const {getOneCityWeather, getListCitiesWeather,getCityDetailsWeather} = require("../custom/getCityWeather");


// @route POST /api/cities/all
// @desc Get cities for specific user
// @access Private ( only authenticated users )

exports.getAll = (req,res,next) =>{
    return res
        .status(200)
        .json({
            user_id: req.user.id,
            user_cities: req.user.cities
        });
}


// @route POST /api/cities/all
// @desc Get cities for specific user
// @access Private ( only authenticated users )

exports.addCity = (req,res,next) =>{
   const {user} = req;
   const {cityId} = req.body;
   user.cities.push(cityId);
   user.save()
    .then(user => {
        res.status(201)
            .json({
                success: true
            });
    })
}

// @route GET /api/cities?id=84894984
// @desc Get specific city weather
// @access Private ( only authenticated users )

exports.getCityWeather = async (req,res,next) =>{
    const {id} = req.query;
    try{
        let data = await getOneCityWeather(id);
        res.status(200)
        .json(data);
    }catch(err) {
        res.status(503)
        .json({
            success:false,
            error: err.message
        });
    }
}

// @route GET /api/cities/list?ids=15151,51515,51515
// @desc Get weather for specific list ids 
// @access Private ( only authenticated users )

exports.getCitiesWeather = async (req,res,next) =>{
    const {ids} = req.query;
    try{
        let data = await getListCitiesWeather(ids.split(','));
        res.status(200)
        .json(data);
    }catch(err) {
        res.status(503)
        .json({
            success:false,
            error: err.message
        });
    }
}

// @route GET /api/cities/details?id=65465461
// @desc Get details for a specific city
// @access Private ( only authenticated users )

exports.getCityDetails = async (req,res,next) =>{
    const {id} = req.query;
    try{
        let data = await getCityDetailsWeather(id);
        res.status(200)
        .json(data);
    }catch(err) {
        res.status(503)
        .json({
            success:false,
            error: err.message
        });
    }
}

// @route GET /api/cities/delete/:cityId
// @desc delete specific city
// @access Private ( only authenticated users )

exports.deleteCity = async (req,res,next) =>{
   const {user} = req;
   const {cityId} = req.params;
    try{
        await user.cities.pull(cityId);
        await user.save();
        res.status(200).json({
             success:true,
             user_id: user.id,
             message: `city number ${cityId} is deleted successfully `
        })
    }catch(err) {
        res.status(500)
        .json({
            success:false,
            error: err.message
        });
    }
}