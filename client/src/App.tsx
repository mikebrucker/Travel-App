import React, { Component } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import Location from "./components/Location";
import WeekForecast from "./components/WeekForecast";

type Location = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type Current = {
  latitude: number | null;
  longitude: number | null;
  temp: number | null;
  weather: string;
  desc: string;
  icon: string;
  sunrise: number | null;
  sunset: number | null;
};

type State = {
  celsius: boolean;
  userTimezone: number;
  searchInput: Location;
  current: Current;
  forecast: any;
  location: Location;
};

// type ForecastDay = {
//     dt: number,
//     temp: number,
//     weather: string,
//     desc: string,
//     icon: string
// }

// type Forecast = ForecastDay[]

// example so I don't use up all of my api calls
const exampleJSONState =
  '{"current":{"latitude":39.95,"longitude":-75.17,"temp":85.15,"weather":"Rain","desc":"shower rain","icon":"09d","sunrise":1563788995000,"sunset":1563841438000},"forecast":[{"day":"Mon, 22 Jul 2019","forecast":[{"timezone":-14400,"dt":1563840000000,"time":"8 PM","temp":77.54,"weather":"Rain","desc":"light rain","icon":"10n"},{"timezone":-14400,"dt":1563850800000,"time":"11 PM","temp":76.06,"weather":"Rain","desc":"light rain","icon":"10n"}]},{"day":"Tue, 23 Jul 2019","forecast":[{"timezone":-14400,"dt":1563861600000,"time":"2 AM","temp":74.12,"weather":"Rain","desc":"light rain","icon":"10n"},{"timezone":-14400,"dt":1563872400000,"time":"5 AM","temp":74.14,"weather":"Rain","desc":"light rain","icon":"10n"},{"timezone":-14400,"dt":1563883200000,"time":"8 AM","temp":67.65,"weather":"Rain","desc":"moderate rain","icon":"10d"},{"timezone":-14400,"dt":1563894000000,"time":"11 AM","temp":69.46,"weather":"Rain","desc":"light rain","icon":"10d"},{"timezone":-14400,"dt":1563904800000,"time":"2 PM","temp":80.08,"weather":"Rain","desc":"light rain","icon":"10d"},{"timezone":-14400,"dt":1563915600000,"time":"5 PM","temp":77.2,"weather":"Rain","desc":"light rain","icon":"10d"},{"timezone":-14400,"dt":1563926400000,"time":"8 PM","temp":74.47,"weather":"Rain","desc":"light rain","icon":"10n"},{"timezone":-14400,"dt":1563937200000,"time":"11 PM","temp":72.59,"weather":"Rain","desc":"light rain","icon":"10n"}]},{"day":"Wed, 24 Jul 2019","forecast":[{"timezone":-14400,"dt":1563948000000,"time":"2 AM","temp":70.95,"weather":"Rain","desc":"light rain","icon":"10n"},{"timezone":-14400,"dt":1563958800000,"time":"5 AM","temp":68.33,"weather":"Rain","desc":"light rain","icon":"10n"},{"timezone":-14400,"dt":1563969600000,"time":"8 AM","temp":68.29,"weather":"Clouds","desc":"broken clouds","icon":"04d"},{"timezone":-14400,"dt":1563980400000,"time":"11 AM","temp":77.04,"weather":"Clouds","desc":"broken clouds","icon":"04d"},{"timezone":-14400,"dt":1563991200000,"time":"2 PM","temp":81.24,"weather":"Rain","desc":"light rain","icon":"10d"},{"timezone":-14400,"dt":1564002000000,"time":"5 PM","temp":81.94,"weather":"Clear","desc":"clear sky","icon":"01d"},{"timezone":-14400,"dt":1564012800000,"time":"8 PM","temp":77.99,"weather":"Clear","desc":"clear sky","icon":"01n"},{"timezone":-14400,"dt":1564023600000,"time":"11 PM","temp":72.45,"weather":"Clear","desc":"clear sky","icon":"01n"}]},{"day":"Thu, 25 Jul 2019","forecast":[{"timezone":-14400,"dt":1564034400000,"time":"2 AM","temp":69.53,"weather":"Clear","desc":"clear sky","icon":"01n"},{"timezone":-14400,"dt":1564045200000,"time":"5 AM","temp":67.37,"weather":"Clear","desc":"clear sky","icon":"01n"},{"timezone":-14400,"dt":1564056000000,"time":"8 AM","temp":69.37,"weather":"Clear","desc":"clear sky","icon":"01d"},{"timezone":-14400,"dt":1564066800000,"time":"11 AM","temp":78.98,"weather":"Clear","desc":"clear sky","icon":"01d"},{"timezone":-14400,"dt":1564077600000,"time":"2 PM","temp":84.21,"weather":"Clear","desc":"clear sky","icon":"01d"},{"timezone":-14400,"dt":1564088400000,"time":"5 PM","temp":83.93,"weather":"Clear","desc":"clear sky","icon":"01d"},{"timezone":-14400,"dt":1564099200000,"time":"8 PM","temp":78.47,"weather":"Clear","desc":"clear sky","icon":"01n"},{"timezone":-14400,"dt":1564110000000,"time":"11 PM","temp":74.47,"weather":"Clear","desc":"clear sky","icon":"01n"}]},{"day":"Fri, 26 Jul 2019","forecast":[{"timezone":-14400,"dt":1564120800000,"time":"2 AM","temp":72.17,"weather":"Clear","desc":"clear sky","icon":"01n"},{"timezone":-14400,"dt":1564131600000,"time":"5 AM","temp":70.13,"weather":"Clear","desc":"clear sky","icon":"01n"},{"timezone":-14400,"dt":1564142400000,"time":"8 AM","temp":73.1,"weather":"Clear","desc":"clear sky","icon":"01d"},{"timezone":-14400,"dt":1564153200000,"time":"11 AM","temp":84.64,"weather":"Clear","desc":"clear sky","icon":"01d"},{"timezone":-14400,"dt":1564164000000,"time":"2 PM","temp":91.16,"weather":"Clear","desc":"clear sky","icon":"01d"},{"timezone":-14400,"dt":1564174800000,"time":"5 PM","temp":89.33,"weather":"Clear","desc":"clear sky","icon":"01d"},{"timezone":-14400,"dt":1564185600000,"time":"8 PM","temp":82.48,"weather":"Clouds","desc":"scattered clouds","icon":"03n"},{"timezone":-14400,"dt":1564196400000,"time":"11 PM","temp":76.57,"weather":"Clouds","desc":"few clouds","icon":"02n"}]},{"day":"Sat, 27 Jul 2019","forecast":[{"timezone":-14400,"dt":1564207200000,"time":"2 AM","temp":73.83,"weather":"Clear","desc":"clear sky","icon":"01n"},{"timezone":-14400,"dt":1564218000000,"time":"5 AM","temp":72.05,"weather":"Clear","desc":"clear sky","icon":"01n"},{"timezone":-14400,"dt":1564228800000,"time":"8 AM","temp":74.77,"weather":"Clouds","desc":"scattered clouds","icon":"03d"},{"timezone":-14400,"dt":1564239600000,"time":"11 AM","temp":85.73,"weather":"Clouds","desc":"overcast clouds","icon":"04d"},{"timezone":-14400,"dt":1564250400000,"time":"2 PM","temp":92.53,"weather":"Clouds","desc":"overcast clouds","icon":"04d"},{"timezone":-14400,"dt":1564261200000,"time":"5 PM","temp":89.62,"weather":"Clouds","desc":"overcast clouds","icon":"04d"}]}],"location":{"street":"","city":"Philadelphia","state":"PA","country":"US","postalCode":""}}';
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
    // forecast: {}
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
        <Location
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
