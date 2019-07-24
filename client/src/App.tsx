import React, { Component } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import LocationCard from "./components/LocationCard";
import WeekForecast from "./components/WeekForecast";
import { Location, State } from "./types/types";

// example so I don't use up all of my api calls
const exampleJSONState: string =
  '{"current":{"latitude":39.95,"longitude":-75.17,"temp":"74.16° F","weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10d@2x.png","sunrise":1563875446000,"sunset":1563927792000,"timezoneDifference":0},"forecast":[{"day":"Tue, 23 Jul 2019","forecast":[{"timezone":-14400,"dt":1563915600000,"time":"5 PM","temp":"76.1° F","weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10d@2x.png"},{"timezone":-14400,"dt":1563926400000,"time":"8 PM","temp":"70.52° F","weather":"Rain","desc":"moderate rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"},{"timezone":-14400,"dt":1563937200000,"time":"11 PM","temp":"67.55° F","weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"}]},{"day":"Wed, 24 Jul 2019","forecast":[{"timezone":-14400,"dt":1563948000000,"time":"2 AM","temp":"67.62° F","weather":"Rain","desc":"moderate rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"},{"timezone":-14400,"dt":1563958800000,"time":"5 AM","temp":"69.46° F","weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"},{"timezone":-14400,"dt":1563969600000,"time":"8 AM","temp":"70.27° F","weather":"Clouds","desc":"overcast clouds","icon":"http://openweathermap.org/img/wn/04d@2x.png"},{"timezone":-14400,"dt":1563980400000,"time":"11 AM","temp":"77.87° F","weather":"Clouds","desc":"few clouds","icon":"http://openweathermap.org/img/wn/02d@2x.png"},{"timezone":-14400,"dt":1563991200000,"time":"2 PM","temp":"82.25° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564002000000,"time":"5 PM","temp":"82.32° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564012800000,"time":"8 PM","temp":"79.04° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564023600000,"time":"11 PM","temp":"73.4° F","weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"}]},{"day":"Thu, 25 Jul 2019","forecast":[{"timezone":-14400,"dt":1564034400000,"time":"2 AM","temp":"70.99° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564045200000,"time":"5 AM","temp":"67.51° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564056000000,"time":"8 AM","temp":"69.35° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564066800000,"time":"11 AM","temp":"79.28° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564077600000,"time":"2 PM","temp":"84.65° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564088400000,"time":"5 PM","temp":"84.89° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564099200000,"time":"8 PM","temp":"79.62° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564110000000,"time":"11 PM","temp":"75.88° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"}]},{"day":"Fri, 26 Jul 2019","forecast":[{"timezone":-14400,"dt":1564120800000,"time":"2 AM","temp":"73.44° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564131600000,"time":"5 AM","temp":"71.15° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564142400000,"time":"8 AM","temp":"73.49° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564153200000,"time":"11 AM","temp":"83.83° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564164000000,"time":"2 PM","temp":"89.69° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564174800000,"time":"5 PM","temp":"87.41° F","weather":"Clouds","desc":"few clouds","icon":"http://openweathermap.org/img/wn/02d@2x.png"},{"timezone":-14400,"dt":1564185600000,"time":"8 PM","temp":"81.85° F","weather":"Clouds","desc":"broken clouds","icon":"http://openweathermap.org/img/wn/04n@2x.png"},{"timezone":-14400,"dt":1564196400000,"time":"11 PM","temp":"76.27° F","weather":"Clouds","desc":"scattered clouds","icon":"http://openweathermap.org/img/wn/03n@2x.png"}]},{"day":"Sat, 27 Jul 2019","forecast":[{"timezone":-14400,"dt":1564207200000,"time":"2 AM","temp":"73.88° F","weather":"Clouds","desc":"few clouds","icon":"http://openweathermap.org/img/wn/02n@2x.png"},{"timezone":-14400,"dt":1564218000000,"time":"5 AM","temp":"71.93° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01n@2x.png"},{"timezone":-14400,"dt":1564228800000,"time":"8 AM","temp":"74.82° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564239600000,"time":"11 AM","temp":"85.91° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564250400000,"time":"2 PM","temp":"89.87° F","weather":"Clear","desc":"clear sky","icon":"http://openweathermap.org/img/wn/01d@2x.png"},{"timezone":-14400,"dt":1564261200000,"time":"5 PM","temp":"85.73° F","weather":"Clouds","desc":"broken clouds","icon":"http://openweathermap.org/img/wn/04d@2x.png"},{"timezone":-14400,"dt":1564272000000,"time":"8 PM","temp":"80.72° F","weather":"Rain","desc":"light rain","icon":"http://openweathermap.org/img/wn/10n@2x.png"},{"timezone":-14400,"dt":1564282800000,"time":"11 PM","temp":"76.19° F","weather":"Clouds","desc":"scattered clouds","icon":"http://openweathermap.org/img/wn/03n@2x.png"}]},{"day":"Sun, 28 Jul 2019","forecast":[{"timezone":-14400,"dt":1564293600000,"time":"2 AM","temp":"73.62° F","weather":"Clouds","desc":"scattered clouds","icon":"http://openweathermap.org/img/wn/03n@2x.png"},{"timezone":-14400,"dt":1564304400000,"time":"5 AM","temp":"72.03° F","weather":"Clouds","desc":"overcast clouds","icon":"http://openweathermap.org/img/wn/04n@2x.png"},{"timezone":-14400,"dt":1564315200000,"time":"8 AM","temp":"74.21° F","weather":"Clouds","desc":"overcast clouds","icon":"http://openweathermap.org/img/wn/04d@2x.png"},{"timezone":-14400,"dt":1564326000000,"time":"11 AM","temp":"83.46° F","weather":"Clouds","desc":"overcast clouds","icon":"http://openweathermap.org/img/wn/04d@2x.png"},{"timezone":-14400,"dt":1564336800000,"time":"2 PM","temp":"88.1° F","weather":"Clouds","desc":"overcast clouds","icon":"http://openweathermap.org/img/wn/04d@2x.png"}]}],"location":{"street":"","city":"Philadelphia","state":"PA","country":"US","postalCode":""}}';
const exampleState: any = JSON.parse(exampleJSONState);

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
    clock: {
      hours: null,
      minutes: null,
      seconds: null
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
    //   sunset: null,
    //   timezoneDifference: null,
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

  private clock: any;

  intervalClock = (): void => {
    if (
      typeof this.state.clock.hours === "number" &&
      typeof this.state.clock.minutes === "number" &&
      typeof this.state.clock.seconds === "number"
    ) {
      let hours: number = this.state.clock.hours,
        minutes: number = this.state.clock.minutes,
        seconds: number = this.state.clock.seconds + 1;

      if (seconds > 59) {
        seconds = 0;
        minutes++;
        if (minutes > 59) {
          minutes = 0;
          hours++;
          if (hours > 23) {
            hours = 0;
          }
        }
      }

      this.setState({
        clock: {
          hours,
          minutes,
          seconds
        }
      });
    }
  };

  componentDidMount() {
    const date: Date = new Date();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    // Set user timezone in seconds to match Open Weather Map API timezone format
    // For use on node server to have your search result's weather synced with their local time
    let myTimezone: number = date.getTimezoneOffset() * 60;

    if (myTimezone < 0) {
      myTimezone = Math.abs(myTimezone);
    } else if (myTimezone > 0) {
      myTimezone = 0 - myTimezone;
    }

    this.setState({
      userTimezone: myTimezone,
      clock: {
        hours,
        minutes,
        seconds
      }
    });

    this.clock = setInterval(() => {
      this.intervalClock();
    }, 1000);
  }

  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.clock);
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

    if (
      this.state.searchInput.street ||
      this.state.searchInput.city ||
      this.state.searchInput.state ||
      this.state.searchInput.postalCode ||
      this.state.searchInput.country
    ) {
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
    }
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
          clock={this.state.clock}
        />
        <WeekForecast forecast={this.state.forecast} />
      </div>
    );
  }
}

export default App;
