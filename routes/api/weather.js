const express = require("express");
const router = express.Router();
const axios = require("axios");

// AccuWeather apiKey
const accuWeatherApiKey = require("../../config/keys").apiKey;

// @route 	POST api/weather
// @desc 		Search for city to get weather
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
  const key = req.body.locationKey ? req.body.locationKey : "350540";
  const metric = req.body.metric ? "true" : "false";
  const resourceUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${accuWeatherApiKey}&details=false&metric=${metric}`;

  try {
    await axios.get(resourceUrl).then(async doc => {
      const daily = doc.data.DailyForecasts[0];
      const todaysWeather = {
        headline: doc.data.Headline.Text,
        tempMin: daily.Temperature.Minimum,
        tempMax: daily.Temperature.Maximum,
        day: daily.Day,
        night: daily.Night
      };
      res.json(todaysWeather);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
