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

// AccuWeather API
// @route 	POST api/weather
// @desc 		Search for city to get
// @access 	Public
router.post("/search", async (req, res) => {
  const locationSearch = req.body.locationSearch
    ? req.body.locationSearch
    : "Philadelphia";
  const resourceUrl = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${accuWeatherApiKey}&q=${locationSearch}`;

  try {
    await axios.get(resourceUrl).then(async doc => {
      const cityArray = doc.data.map(item => {
        return {
          key: item.Key,
          city: item.LocalizedName,
          state: item.AdministrativeArea.LocalizedName,
          country: item.Country.LocalizedName
        };
      });
      res.json(cityArray);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/daily", async (req, res) => {
  const key = req.body.locationKey ? req.body.locationKey : "";
  const metric = req.body.metric ? "true" : "false";
  const resourceUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${accuWeatherApiKey}&details=false&metric=${metric}`;

  try {
    await axios.get(resourceUrl).then(async doc => {
      const daily = doc.data.DailyForecasts[0];
      const todaysWeather = {
        headline: doc.data.Headline.Text,
        tempMin: daily.Temperature.Minimum,
        tempMax: daily.Temperature.Maximum,
        day: daily.Day.Value,
        night: daily.Night.Value,
        unit: daily.Day.Unit
      };
      res.json(todaysWeather);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Open Weather Map API
router.post("/find", async (req, res) => {
  const tempFormat =
    req.body.tempFormat && req.body.tempFormat === "imperial"
      ? `&units=imperial`
      : `&units=metric`;
  const cityName = req.body.cityName ? `&q=${req.body.cityName}` : "";
  const countryCode =
    req.body.countryCode && req.body.cityName ? `,${req.body.countryCode}` : "";
  const resourceUrl = `http://api.openweathermap.org/data/2.5/find?appid=${openWeatherMapApiKey}${cityName}${countryCode}${tempFormat}`;

  try {
    await axios.get(resourceUrl).then(async doc => {
      res.json(doc.data);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/weather", async (req, res) => {
  const street = req.body.street ? `&street=${req.body.street}` : "";
  const city = req.body.city ? `&city=${req.body.city}` : "";
  const state = req.body.state ? `&state=${req.body.state}` : "";
  const country = req.body.country ? `&country=${req.body.country}` : "";
  const postalCode = req.body.postalCode
    ? `&postalCode=${req.body.postalCode}`
    : "";

  const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestApiKey}${street}${city}${state}${country}${postalCode}`;

  const tempFormat =
    req.body.tempFormat && req.body.tempFormat === "F"
      ? `&units=imperial`
      : `&units=metric`;

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
            current = doc.data;
          })
          .then(async () => {
            await axios
              .get(forecastWeatherUrl)
              .then(async doc => {
                forecast = doc.data;
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

router.post("/forecast", async (req, res) => {
  const street = req.body.street ? `&street=${req.body.street}` : "";
  const city = req.body.city ? `&city=${req.body.city}` : "";
  const state = req.body.state ? `&state=${req.body.state}` : "";
  const country = req.body.country ? `&country=${req.body.country}` : "";
  const postalCode = req.body.postalCode
    ? `&postalCode=${req.body.postalCode}`
    : "";

  const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestApiKey}${street}${city}${state}${country}${postalCode}`;

  const tempFormat =
    req.body.tempFormat && req.body.tempFormat === "imperial"
      ? `&units=imperial`
      : `&units=metric`;

  const cityName = req.body.cityName ? `&q=${req.body.cityName}` : "";

  const countryCode =
    req.body.countryCode && req.body.cityName ? `,${req.body.countryCode}` : "";

  try {
    await axios.get(geocodeUrl).then(async doc => {
      const result = doc.data.results[0].locations[0];
      const latitude = `&lat=${result.latLng.lat}`;
      const longitude = `&lon=${result.latLng.lng}`;
      const resourceUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${openWeatherMapApiKey}${latitude}${longitude}${cityName}${countryCode}${tempFormat}`;

      try {
        await axios.get(resourceUrl).then(async doc => {
          res.json(doc.data);
        });
      } catch (err) {
        res.status(500).send(err.message);
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Dark Sky API
router.post("/dark", async (req, res) => {
  // const tempFormat =
  //   req.body.tempFormat && req.body.tempFormat === "imperial"
  //     ? `&units=imperial`
  //     : `&units=metric`;
  // const cityName = req.body.cityName ? `&q=${req.body.cityName}` : "";
  // const countryCode = req.body.countryCode && req.body.cityName ? `,${req.body.countryCode}` : "";
  const resourceUrl = `https://api.darksky.net/forecast/${darkSkyApiKey}/37.8267,-122.4233`;

  try {
    await axios.get(resourceUrl).then(async doc => {
      res.json(doc.data);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
