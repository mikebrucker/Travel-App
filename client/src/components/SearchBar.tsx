import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";

type searchResult = {
  key: string;
  city: string;
  state: string;
  country: string;
};

class SearchBar extends Component {
  state = {
    searchInput: "",
    searchResults: [],
    weather: {}
  };

  handleChange = (e: any): void => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        axios
          .post("/api/weather/search", {
            locationSearch: this.state.searchInput
          })
          .then(doc => {
            this.setState({ searchResults: doc.data });
          });
      }
    );
  };

  handleSubmit = (e: any): void => {
    e.preventDefault();

    const locationKey: string =
      this.state.searchResults.length > 0
        ? this.state.searchResults.map((item: searchResult): any => item.key)[0]
        : "0";

    axios.post("/api/weather/daily", { locationKey: locationKey }).then(doc => {
      this.setState({ weather: doc.data });
    });
  };

  render() {
    const mySearchResults =
      this.state.searchResults.length > 0
        ? this.state.searchResults.map(
            (item: searchResult): any => {
              return (
                <div key={item.key}>
                  {item.city}, {item.state}, {item.country}
                </div>
              );
            }
          )
        : "";

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField name="searchInput" onChange={this.handleChange} />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </form>
        {mySearchResults}
        <br />
        <div>{JSON.stringify(this.state.weather)}</div>
      </div>
    );
  }
}

export default SearchBar;
