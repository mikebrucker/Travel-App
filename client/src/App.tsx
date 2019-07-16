import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import axios from "axios";

type searchResult = {
  key: string;
  city: string;
  state: string;
  country: string;
};

type searchInput = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type state = {
  searchInput: searchInput;
  current: any;
  forecast: any;
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
    current: {},
    forecast: {}
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

    axios.post("/api/weather/current", searchParameters).then(doc => {
      this.setState({ current: doc.data });
    });
    axios.post("/api/weather/forecast", searchParameters).then(doc => {
      this.setState({ forecast: doc.data });
    });
  };

  render() {
    return (
      <div className="App">
        <SearchBar
          state={this.state}
          handleSubmit={this.searchBarSubmit}
          handleChange={this.searchBarChange}
        />
      </div>
    );
  }
}

export default App;
