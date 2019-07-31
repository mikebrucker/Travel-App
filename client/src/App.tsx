import React, { Component } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import LocationCard from "./components/LocationCard";
import WeekForecast from "./components/WeekForecast";
import { Location, State } from "./types/types";

class App extends Component<{}, State> {
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
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    location: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    },
    current: {
      latitude: 0,
      longitude: 0,
      temp: "",
      weather: "",
      desc: "",
      icon: "",
      sunrise: 0,
      sunset: 0,
      timezoneDifference: 0
    },
    forecast: [
      {
        day: "",
        forecast: [
          {
            dt: 0,
            time: "",
            timezone: 0,
            temp: "",
            weather: "",
            desc: "",
            icon: ""
          }
        ]
      }
    ]
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
