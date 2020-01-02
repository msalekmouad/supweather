let axios = require("axios").default;

const {apiUrlFactory} = require("./apiUrlFactory"); //factory of the api url
const {apiOptions} = require("./apiOptions"); //factory of the api url
const {getWeatherImage} = require("./imageGetter.js"); //image condition getter


exports.getOneCityWeather =  cityId => {
    return new Promise((resolve,reject) => {
        const API_URL = apiUrlFactory(process.env.APP_API_URI,process.env.APP_API_KEY,apiOptions.WEATHER,cityId);
        console.log(`The api url generated is: ${API_URL}`);
        let cityWeatherRaw = '';
        
        axios.get(API_URL)
            .then(response => {
                cityWeatherRaw = response.data;
                resolve({
                    success:true,
                    city_id: cityId,
                    city_name: cityWeatherRaw.name,
                    city_temp: {
                        main: cityWeatherRaw.main.temp,
                        min: cityWeatherRaw.main.temp_min,
                        max: cityWeatherRaw.main.temp_max,
                        desc: cityWeatherRaw.weather[0] ? cityWeatherRaw.weather[0].main : 'No Description',
                        image: getWeatherImage(cityWeatherRaw.weather[0].main)
                    },
                    city_wind: cityWeatherRaw.wind.speed,
                    city_humidity: cityWeatherRaw.main.humidity
                    }); 
                }
            ).catch(err => reject(err));
    });
   
};

exports.getListCitiesWeather =  citiesId => {
    return new Promise((resolve,reject) => {
        const API_URL = apiUrlFactory(process.env.APP_API_URI,process.env.APP_API_KEY,apiOptions.GROUP,citiesId);
        console.log(`The api url generated is: ${API_URL}`);
        let citiesWeatherRaw = '';
        
        axios.get(API_URL)
            .then(response => {
                    citiesWeatherRaw = response.data;
                    let finalData = [];
                    citiesWeatherRaw.list.forEach(oneCity => finalData.push({
                        success:true,
                        city_id: oneCity.id,
                        city_name: oneCity.name,
                        city_temp: {
                            main: oneCity.main.temp,
                            min: oneCity.main.temp_min,
                            max: oneCity.main.temp_max,
                            desc: oneCity.weather[0] ? oneCity.weather[0].main : 'No Description',
                            image: getWeatherImage(oneCity.weather[0].main)
                        },
                        city_wind: oneCity.wind.speed,
                        city_humidity: oneCity.main.humidity
                    }));
                    resolve(finalData);
                }
            ).catch(err => reject(err));
    });
   
};


exports.getCityDetailsWeather =  cityId => {
    return new Promise((resolve,reject) => {
        const API_URL = apiUrlFactory(process.env.APP_API_URI,process.env.APP_API_KEY,apiOptions.FORECAST,cityId);
        console.log(`The api url generated is: ${API_URL}`);
        let cityWeatherRaw = '';
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        axios.get(API_URL)
            .then(response => {
                    cityWeatherRaw = response.data;
                    let finalData = [];
                    for (let index = 0; index < cityWeatherRaw.list.length; index+=8) {
                        const element = cityWeatherRaw.list[index];
                        finalData.push({
                            success:true,
                            city_id: cityWeatherRaw.city.id,
                            city_name: cityWeatherRaw.city.name,
                            city_temp: {
                                main: element.main.temp,
                                min: element.main.temp_min,
                                max: element.main.temp_max,
                                desc: element.weather[0] ? element.weather[0].main : 'No Description',
                                image: getWeatherImage(element.weather[0].main)
                            },
                            full_date: element.dt_txt,
                            day_name: days[new Date(element.dt_txt).getDay()]
                        });
                    }
                    resolve(finalData);
                }
            ).catch(err => reject(err));
    });
   
};



