import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import axios from "axios";

type searchInput = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type state = {
  searchInput: searchInput;
  tempFormat: string;
  current: any;
  forecast: any;
  location: searchInput;
};

class App extends Component {
  state: state = {
    searchInput: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    },
    tempFormat: "F",
    current: {},
    forecast: {},
    location: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    }
  };

  searchBarChange = (e: any): void => {
    this.setState({
      searchInput: {
        ...this.state.searchInput,
        [e.target.name]: e.target.value
      }
    });
  };

  searchBarSubmit = (e: any): void => {
    e.preventDefault();

    const searchParameters: searchInput = this.state.searchInput;
    axios
      .post("/api/weather/weather", {
        ...searchParameters,
        tempFormat: this.state.tempFormat
      })
      .then(doc => {
        this.setState({
          current: doc.data.current,
          forecast: doc.data.forecast,
          location: doc.data.location
        });
      });
  };

  render() {
    const currentTemp =
      this.state.current &&
      this.state.current.main &&
      this.state.current.main.temp
        ? `Current Temperature: ${this.state.current.main.temp} ${
            this.state.tempFormat
          }`
        : "";

    const location =
      this.state.location && this.state.location.country
        ? Object.values(this.state.location)
            .filter(item => item !== "")
            .map((item, index, array) => {
              if (index !== array.length - 1) {
                return <span key={item}>{item}, </span>;
              } else {
                return <span key={item}>{item}.</span>;
              }
            })
        : "";

    return (
      <div className="App">
        <SearchBar
          state={this.state}
          handleSubmit={this.searchBarSubmit}
          handleChange={this.searchBarChange}
        />
        <div>{currentTemp}</div>
        <div>{location}</div>
      </div>
    );
  }
}

export default App;
