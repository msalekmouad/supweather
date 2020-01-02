const {apiOptions} = require("./apiOptions");

exports.apiUrlFactory = (base_URI, api_KEY ,api_OPTION ,api_PARAMS) => {
    switch(api_OPTION){
        case apiOptions.WEATHER:
            return `${base_URI}${api_OPTION}?id=${api_PARAMS}&units=metric&appid=${api_KEY}`;
        case apiOptions.GROUP:
            return `${base_URI}${api_OPTION}?id=${api_PARAMS.join(',')}&units=metric&appid=${api_KEY}`;
        case apiOptions.FORECAST:
            return `${base_URI}${api_OPTION}?id=${api_PARAMS}&units=metric&appid=${api_KEY}`;
        }
}