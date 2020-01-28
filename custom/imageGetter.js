exports.getWeatherImage = (state) =>{
    switch(state){
        case "Sunny":
            return `${process.env.APP_URL}images/weather/sunny.png`;
        case "Clear":
            return `${process.env.APP_URL}images/weather/sunny.png`;
        case "Rain":
            return `${process.env.APP_URL}images/weather/raining.png`;
        case "Drizzle":
            return `${process.env.APP_URL}images/weather/raining.png`;
        case "Mist":
            return `${process.env.APP_URL}images/weather/raining.png`;
        case "Haze":
            return `${process.env.APP_URL}images/weather/cloudy.png`;
        case  "Fog":
            return `${process.env.APP_URL}images/weather/cloudy.png`;
        case "Storm":
            return `${process.env.APP_URL}images/weather/storm.png`;
        case  "Thunderstorm":
            return `${process.env.APP_URL}images/weather/storm.png`;
        case  "Dust":
            return `${process.env.APP_URL}images/weather/cloudy.png`;
        case "Snow":
            return `${process.env.APP_URL}images/weather/snowing.png`;
        case "Clouds":
            return `${process.env.APP_URL}images/weather/cloudy.png`;
        case "Cloudy":
                return `${process.env.APP_URL}images/weather/cloudy.png`;
        default:
            return `${process.env.APP_URL}images/weather/sunny.png`;

        }
}