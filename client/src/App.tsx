import React, { Component } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import LocationCard from "./components/LocationCard";
import WeekForecast from "./components/WeekForecast";
import { Location, State } from "./types/types";

// example so I don't use up all of my api calls
const exampleJSONState =
  '{"current":{"latitude":39.95,"longitude":-75.17,"temp":73.45,"weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10d@2x.png","sunrise":1563788995000,"sunset":1563841438000},"forecast":[{"day":"Mon, 22 Jul 2019","forecast":[{"timezone":-14400,"dt":1563840000000,"time":"8 PM","temp":70.99,"weather":"Rain","desc":"moderate rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"},{"timezone":-14400,"dt":1563850800000,"time":"11 PM","temp":70.66,"weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"}]},{"day":"Tue, 23 Jul 2019","forecast":[{"timezone":-14400,"dt":1563861600000,"time":"2 AM","temp":69.46,"weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"},{"timezone":-14400,"dt":1563872400000,"time":"5 AM","temp":67.64,"weather":"Rain","desc":"moderate rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"},{"timezone":-14400,"dt":1563883200000,"time":"8 AM","temp":69.07,"weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10d@2x.png"},{"timezone":-14400,"dt":1563894000000,"time":"11 AM","temp":68.49,"weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10d@2x.png"},{"timezone":-14400,"dt":1563904800000,"time":"2 PM","temp":73.22,"weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10d@2x.png"},{"timezone":-14400,"dt":1563915600000,"time":"5 PM","temp":75.83,"weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10d@2x.png"},{"timezone":-14400,"dt":1563926400000,"time":"8 PM","temp":72.77,"weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"},{"timezone":-14400,"dt":1563937200000,"time":"11 PM","temp":70.87,"weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"}]},{"day":"Wed, 24 Jul 2019","forecast":[{"timezone":-14400,"dt":1563948000000,"time":"2 AM","temp":68.21,"weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"},{"timezone":-14400,"dt":1563958800000,"time":"5 AM","temp":66.9,"weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"},{"timezone":-14400,"dt":1563969600000,"time":"8 AM","temp":68.46,"weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10d@2x.png"},{"timezone":-14400,"dt":1563980400000,"time":"11 AM","temp":75.99,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1563991200000,"time":"2 PM","temp":81.11,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564002000000,"time":"5 PM","temp":82.05,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564012800000,"time":"8 PM","temp":78.27,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564023600000,"time":"11 PM","temp":73.93,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"}]},{"day":"Thu, 25 Jul 2019","forecast":[{"timezone":-14400,"dt":1564034400000,"time":"2 AM","temp":69.35,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564045200000,"time":"5 AM","temp":67.56,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564056000000,"time":"8 AM","temp":69.35,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564066800000,"time":"11 AM","temp":78.42,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564077600000,"time":"2 PM","temp":83.35,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564088400000,"time":"5 PM","temp":83.4,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564099200000,"time":"8 PM","temp":78.71,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564110000000,"time":"11 PM","temp":74.66,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"}]},{"day":"Fri, 26 Jul 2019","forecast":[{"timezone":-14400,"dt":1564120800000,"time":"2 AM","temp":72.01,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564131600000,"time":"5 AM","temp":70.07,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564142400000,"time":"8 AM","temp":73.81,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564153200000,"time":"11 AM","temp":84.83,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564164000000,"time":"2 PM","temp":89.51,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564174800000,"time":"5 PM","temp":86.48,"weather":"Clouds","desc":"few clouds","icon":"http://openweathermap.org/img/wn/02d@2x.png"},{"timezone":-14400,"dt":1564185600000,"time":"8 PM","temp":81.43,"weather":"Clouds","desc":"few clouds","icon":"http://openweathermap.org/img/wn/02n@2x.png"},{"timezone":-14400,"dt":1564196400000,"time":"11 PM","temp":77.29,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"}]},{"day":"Sat, 27 Jul 2019","forecast":[{"timezone":-14400,"dt":1564207200000,"time":"2 AM","temp":74.03,"weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564218000000,"time":"5 AM","temp":71.85,"weather":"Clouds","desc":"overcast clouds","icon":"http://openweathermap.org/img/wn/04n@2x.png"},{"timezone":-14400,"dt":1564228800000,"time":"8 AM","temp":74.39,"weather":"Clouds","desc":"overcast clouds","icon":"http://openweathermap.org/img/wn/04d@2x.png"},{"timezone":-14400,"dt":1564239600000,"time":"11 AM","temp":84.11,"weather":"Clouds","desc":"broken clouds","icon":"http://openweathermap.org/img/wn/04d@2x.png"},{"timezone":-14400,"dt":1564250400000,"time":"2 PM","temp":88.97,"weather":"Clouds","desc":"overcast clouds","icon":"http://openweathermap.org/img/wn/04d@2x.png"},{"timezone":-14400,"dt":1564261200000,"time":"5 PM","temp":87.56,"weather":"Clouds","desc":"broken clouds","icon":"http://openweathermap.org/img/wn/04d@2x.png"}]}],"location":{"street":"","city":"Philadelphia","state":"PA","country":"US","postalCode":""}}';
const exampleState = JSON.parse(exampleJSONState);

class App extends Component {
  state: State = {
    celsius: false,
    userTimezone: 0,
    searchInput: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    },
    // location: {
    //   street: "",
    //   city: "",
    //   state: "",
    //   postalCode: "",
    //   country: ""
    // },
    // current: {
    //   latitude: null,
    //   longitude: null,
    //   temp: null,
    //   weather: "",
    //   desc: "",
    //   icon: "",
    //   sunrise: null,
    //   sunset: null
    // },
    // forecast: [
    //   {
    //     day: "",
    //     forecast: [
    //       {
    //         dt: null,
    //         time: "",
    //         timezone: null,
    //         temp: null,
    //         weather: "",
    //         desc: "",
    //         icon: ""
    //       }
    //     ]
    //   }
    // ],
    location: exampleState.location,
    current: exampleState.current,
    forecast: exampleState.forecast
  };

  componentDidMount() {
    // Set user timezone in seconds to match Open Weather Map API timezone format
    // For use on node server to have your search result's weather synced with their local time
    let myTimezone = new Date().getTimezoneOffset() * 60;

    if (myTimezone < 0) {
      myTimezone = Math.abs(myTimezone);
    } else if (myTimezone > 0) {
      myTimezone = 0 - myTimezone;
    }

    this.setState({
      userTimezone: myTimezone
    });
  }

  searchBarChange = (e: any): void => {
    this.setState({
      searchInput: {
        ...this.state.searchInput,
        [e.target.name]: e.target.value
      }
    });
  };

  tempFormatChange = (e: any): void => {
    this.setState({
      celsius: !this.state.celsius
    });
  };

  searchBarSubmit = (e: any): void => {
    e.preventDefault();

    const searchParameters: Location = this.state.searchInput;

    axios
      .post("/api/weather", {
        ...searchParameters,
        celsius: this.state.celsius,
        userTimezone: this.state.userTimezone
      })
      .then(doc => {
        this.setState({
          current: doc.data.current,
          forecast: doc.data.forecast,
          location: doc.data.location
        });
      });
  };

  clearSearchBarForm = (): void => {
    this.setState({
      searchInput: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""
      }
    });
  };

  render() {
    return (
      <div className="App">
        <SearchBar
          searchInput={this.state.searchInput}
          handleSubmit={this.searchBarSubmit}
          handleChange={this.searchBarChange}
          clearForm={this.clearSearchBarForm}
          celsius={this.state.celsius}
          tempFormatChange={this.tempFormatChange}
        />
        <LocationCard
          current={this.state.current}
          location={this.state.location}
          celsius={this.state.celsius}
        />
        <WeekForecast
          forecast={this.state.forecast}
          celsius={this.state.celsius}
        />
      </div>
    );
  }
}

export default App;
