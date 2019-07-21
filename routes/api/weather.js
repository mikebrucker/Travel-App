const express = require("express");
const router = express.Router();
const axios = require("axios");

// AccuWeather apiKey
const accuWeatherApiKey = require("../../config/keys").AccuWeatherApiKey;

// Open Weather Map apiKey
const openWeatherMapApiKey = require("../../config/keys").OpenWeatherMapApiKey;

// Dark Sky apiKey
const darkSkyApiKey = require("../../config/keys").DarkSkyApiKey;

// Dark Sky apiKey
const mapQuestApiKey = require("../../config/keys").MapQuestApiKey;

// Open Weather Map API
// @route 	POST api/weather
// @access 	Public
// @desc 		Gets geolocation of entered address
//          Gets current and future weather of geolocation
//          Open Weather Map does not find State of location,
//          So geolocation is necessary
router.post("/", async (req, res) => {
  const street = req.body.street ? `&street=${req.body.street}` : "";
  const city = req.body.city ? `&city=${req.body.city}` : "";
  const state = req.body.state ? `&state=${req.body.state}` : "";
  const country = req.body.country ? `&country=${req.body.country}` : "";
  const postalCode = req.body.postalCode
    ? `&postalCode=${req.body.postalCode}`
    : "";

  const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestApiKey}${street}${city}${state}${country}${postalCode}`;

  const tempFormat = req.body.celsius ? `&units=metric` : `&units=imperial`;

  try {
    await axios.get(geocodeUrl).then(async doc => {
      let current, forecast;
      const result = doc.data.results[0].locations[0];
      const latitude = `&lat=${result.latLng.lat}`;
      const longitude = `&lon=${result.latLng.lng}`;

      const resultStreet = result.street ? result.street : "";
      const resultCity = result.adminArea5 ? result.adminArea5 : "";
      const resultState = result.adminArea3 ? result.adminArea3 : "";
      const resultCountry = result.adminArea1 ? result.adminArea1 : "";
      const resultPostalCode = result.postalCode ? result.postalCode : "";
      const location = {
        street: resultStreet,
        city: resultCity,
        state: resultState,
        country: resultCountry,
        postalCode: resultPostalCode
      };

      const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${openWeatherMapApiKey}${latitude}${longitude}${tempFormat}`;

      const forecastWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${openWeatherMapApiKey}${latitude}${longitude}${tempFormat}`;

      try {
        await axios
          .get(currentWeatherUrl)
          .then(async doc => {
            current = {
              latitude: doc.data.coord.lat,
              longitude: doc.data.coord.lon,
              temp: doc.data.main.temp,
              weather: doc.data.weather[0].main,
              desc: doc.data.weather[0].description,
              icon: doc.data.weather[0].icon,
              sunrise: doc.data.sys.sunrise * 1000,
              sunset: doc.data.sys.sunset * 1000
            };
          })
          .then(async () => {
            await axios
              .get(forecastWeatherUrl)
              .then(async doc => {
                const dayList = doc.data.list
                  .map(item => `${new Date(item.dt * 1000).toDateString()}`)
                  .filter((item, i, arr) => {
                    if (i !== 0 && item !== arr[i - 1]) {
                      return item;
                    } else if (i === 0) {
                      return item;
                    }
                  });

                forecast = dayList.map(day => {
                  return {
                    day,
                    forecast: doc.data.list
                      .filter(
                        item =>
                          `${new Date(item.dt * 1000).toDateString()}` === day
                      )
                      .map(item => {
                        const hours =
                          item.dt && typeof item.dt === "number"
                            ? new Date(item.dt * 1000).getHours()
                            : 0;
                        const adjustedHours =
                          hours > 12 ? `${hours - 12}:00pm` : `${hours}:00am`;

                        return {
                          timezone: doc.data.city.timezone,
                          dt: item.dt * 1000,
                          time: adjustedHours,
                          temp: item.main.temp,
                          weather: item.weather[0].main,
                          desc: item.weather[0].description,
                          icon: item.weather[0].icon
                        };
                      })
                  };
                });
              })
              .then(async () => {
                res.json({ current, forecast, location });
              });
          });
      } catch (err) {
        res.status(500).send(err.message);
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
