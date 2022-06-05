import axios from "axios";

const Weather = {
  readWeather: async function (latitude, longitude) {
    let weather = null;
    const apiKey = "345079702e60d969af3a9ccc79087f3d";
    const weatherRequest = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    try {
      const response = await axios.get(weatherRequest);
      if (response.status === 200) {
        weather = response.data;
      }
    } catch (error) {
      console.log(error);
      // renderError();
    }
    return weather;
  },
};

export default Weather;