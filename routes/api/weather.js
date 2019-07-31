const express = require("express");
const router = express.Router();
const axios = require("axios");

// AccuWeather apiKey
// const accuWeatherApiKey = require("../../config/keys").AccuWeatherApiKey;

// Open Weather Map apiKey
const openWeatherMapApiKey = require("../../config/keys").OpenWeatherMapApiKey;

// Dark Sky apiKey
// const darkSkyApiKey = require("../../config/keys").DarkSkyApiKey;

// Dark Sky apiKey
const mapQuestApiKey = require("../../config/keys").MapQuestApiKey;

// Function for getting timezone difference between result and user's local timezone
const getTimezoneDifference = require("../../helpers/dateHelpers");

// Open Weather Map API
// @route 	POST api/weather
// @access 	Public
// @desc 		Gets geolocation of entered address
//          Gets current and future weather of geolocation
//          Open Weather Map does not find State of location,
//          So geolocation is necessary
router.post("/", async (req, res) => {
  let current, forecast, searchResults, owMap, timezoneDifference;
  const userTimezone = req.body.userTimezone;
  const street = req.body.street ? `&street=${req.body.street}` : "";
  const city = req.body.city ? `&city=${req.body.city}` : "";
  const state = req.body.state ? `&state=${req.body.state}` : "";
  const country = req.body.country ? `&country=${req.body.country}` : "";
  const postalCode = req.body.postalCode
    ? `&postalCode=${req.body.postalCode}`
    : "";

  const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestApiKey}${street}${city}${state}${country}${postalCode}`;

  const tempFormat = req.body.celsius ? "&units=metric" : "&units=imperial";
  const celsiusOrFahrenheit = req.body.celsius ? "C" : "F";

  try {
    await axios.get(geocodeUrl).then(async doc => {
      const result = doc.data.results[0].locations[0];
      const latitude = result.latLng.lat;
      const longitude = result.latLng.lng;
      const owmLatitude = `&lat=${result.latLng.lat}`;
      const owmLongitude = `&lon=${result.latLng.lng}`;

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

      const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${openWeatherMapApiKey}${owmLatitude}${owmLongitude}${tempFormat}`;

      const forecastWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${openWeatherMapApiKey}${owmLatitude}${owmLongitude}${tempFormat}`;

      const mapUrl = `https://tile.openweathermap.org/map/precipitation_new/1/${latitude}/${longitude}.png?appid=${openWeatherMapApiKey}`;

      // const searchUrl = `https://www.mapquestapi.com/search/v2/radius?key=${mapQuestApiKey}&origin=${latitude},${longitude}&radius=2&maxMatches=10&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|599972&outFormat=json`;

      // try {
      //   await axios.get(mapUrl).then(async doc => {
      //     owMap = doc.data;
      //   });
      // } catch (err) {
      //   res.status(500).send(err.message);
      // }

      // try {
      //   await axios.get(searchUrl).then(async doc => {
      //     searchResults = doc.data.searchResults
      //       ? doc.data.searchResults.map(item => {
      //           return {
      //             key: item.key,
      //             name: item.name,
      //             lat: item.shapePoints[0],
      //             long: item.shapePoints[1]
      //           };
      //         })
      //       : [
      //           {
      //             key: "",
      //             name: "",
      //             lat: null,
      //             long: null
      //           }
      //         ];
      //   });
      // } catch (err) {
      //   res.status(500).send(err.message);
      // }

      try {
        await axios.get(currentWeatherUrl).then(async doc => {
          current = {
            latitude: doc.data.coord.lat,
            longitude: doc.data.coord.lon,
            temp: `${doc.data.main.temp}\u00B0 ${celsiusOrFahrenheit}`,
            weather: doc.data.weather[0].main,
            desc: doc.data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${
              doc.data.weather[0].icon
            }@2x.png`,
            sunrise: doc.data.sys.sunrise * 1000,
            sunset: doc.data.sys.sunset * 1000
          };
        });
      } catch (err) {
        res.status(500).send(err.message);
      }

      try {
        await axios
          .get(forecastWeatherUrl)
          .then(async doc => {
            const timezone = doc.data.city.timezone;
            timezoneDifference = getTimezoneDifference(timezone, userTimezone);

            const dayList = doc.data.list
              .map(
                item =>
                  `${new Date((item.dt + timezone) * 1000)
                    .toUTCString()
                    .split(" ")
                    .splice(0, 4)
                    .join(" ")}`
              )
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
                      `${new Date((item.dt + timezone) * 1000)
                        .toUTCString()
                        .split(" ")
                        .splice(0, 4)
                        .join(" ")}` === day
                  )
                  .map(item => {
                    const hours =
                      item.dt && typeof item.dt === "number"
                        ? new Date((item.dt + timezone) * 1000).getUTCHours()
                        : 0;
                    const adjustedHours =
                      hours > 12 ? `${hours - 12} PM` : `${hours} AM`;

                    return {
                      timezone,
                      dt: (item.dt + timezoneDifference) * 1000,
                      time: adjustedHours,
                      temp: `${item.main.temp}\u00B0 ${celsiusOrFahrenheit}`,
                      weather: item.weather[0].main,
                      desc: item.weather[0].description,
                      icon: `http://openweathermap.org/img/wn/${
                        item.weather[0].icon
                      }@2x.png`
                    };
                  })
              };
            });
          })
          .then(async () => {
            current = {
              ...current,
              timezoneDifference
            };
            // searchResults
            res.json({ current, forecast, location });
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
