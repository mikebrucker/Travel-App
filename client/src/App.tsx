import React, { Component } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
  searchInput: Location;
  celsius: boolean;
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

var exampleJSONState =
  '{"current":{"latitude":39.9,"longitude":-75.31,"temp":80.65,"weather":"Clouds","desc":"few clouds","icon":"02n","sunrise":1563702586000,"sunset":1563755108000},"forecast":[{"day":"Sun Jul 21 2019","forecast":[{"dt":1563699600000,"time":"5:00am","temp":78.98,"weather":"Clouds","desc":"scattered clouds","icon":"03n"},{"dt":1563710400000,"time":"8:00am","temp":82.35,"weather":"Clouds","desc":"scattered clouds","icon":"03d"},{"dt":1563721200000,"time":"11:00am","temp":90.25,"weather":"Clear","desc":"clear sky","icon":"01d"},{"dt":1563732000000,"time":"2:00pm","temp":94.6,"weather":"Clear","desc":"clear sky","icon":"01d"},{"dt":1563742800000,"time":"5:00pm","temp":95.13,"weather":"Clear","desc":"clear sky","icon":"01d"},{"dt":1563753600000,"time":"8:00pm","temp":91.07,"weather":"Clear","desc":"clear sky","icon":"01n"},{"dt":1563764400000,"time":"11:00pm","temp":85.21,"weather":"Clear","desc":"clear sky","icon":"01n"}]},{"day":"Mon Jul 22 2019","forecast":[{"dt":1563775200000,"time":"2:00am","temp":81.41,"weather":"Rain","desc":"light rain","icon":"10n"},{"dt":1563786000000,"time":"5:00am","temp":76.91,"weather":"Rain","desc":"moderate rain","icon":"10n"},{"dt":1563796800000,"time":"8:00am","temp":78.71,"weather":"Rain","desc":"light rain","icon":"10d"},{"dt":1563807600000,"time":"11:00am","temp":90.41,"weather":"Rain","desc":"light rain","icon":"10d"},{"dt":1563818400000,"time":"2:00pm","temp":94,"weather":"Rain","desc":"light rain","icon":"10d"},{"dt":1563829200000,"time":"5:00pm","temp":83.38,"weather":"Rain","desc":"moderate rain","icon":"10d"},{"dt":1563840000000,"time":"8:00pm","temp":80.78,"weather":"Rain","desc":"light rain","icon":"10n"},{"dt":1563850800000,"time":"11:00pm","temp":74.93,"weather":"Rain","desc":"moderate rain","icon":"10n"}]},{"day":"Tue Jul 23 2019","forecast":[{"dt":1563861600000,"time":"2:00am","temp":70.74,"weather":"Rain","desc":"moderate rain","icon":"10n"},{"dt":1563872400000,"time":"5:00am","temp":66.99,"weather":"Rain","desc":"light rain","icon":"10n"},{"dt":1563883200000,"time":"8:00am","temp":65.92,"weather":"Rain","desc":"moderate rain","icon":"10d"},{"dt":1563894000000,"time":"11:00am","temp":70.2,"weather":"Rain","desc":"light rain","icon":"10d"},{"dt":1563904800000,"time":"2:00pm","temp":76.84,"weather":"Rain","desc":"light rain","icon":"10d"},{"dt":1563915600000,"time":"5:00pm","temp":81.27,"weather":"Rain","desc":"light rain","icon":"10d"},{"dt":1563926400000,"time":"8:00pm","temp":76.12,"weather":"Rain","desc":"light rain","icon":"10n"},{"dt":1563937200000,"time":"11:00pm","temp":71.98,"weather":"Clouds","desc":"overcast clouds","icon":"04n"}]},{"day":"Wed Jul 24 2019","forecast":[{"dt":1563948000000,"time":"2:00am","temp":70.22,"weather":"Rain","desc":"light rain","icon":"10n"},{"dt":1563958800000,"time":"5:00am","temp":67.2,"weather":"Rain","desc":"light rain","icon":"10n"},{"dt":1563969600000,"time":"8:00am","temp":69.07,"weather":"Rain","desc":"light rain","icon":"10d"},{"dt":1563980400000,"time":"11:00am","temp":77.53,"weather":"Clouds","desc":"scattered clouds","icon":"03d"},{"dt":1563991200000,"time":"2:00pm","temp":81.44,"weather":"Clouds","desc":"few clouds","icon":"02d"},{"dt":1564002000000,"time":"5:00pm","temp":79.27,"weather":"Rain","desc":"light rain","icon":"10d"},{"dt":1564012800000,"time":"8:00pm","temp":77.54,"weather":"Rain","desc":"light rain","icon":"10n"},{"dt":1564023600000,"time":"11:00pm","temp":73.08,"weather":"Rain","desc":"light rain","icon":"10n"}]},{"day":"Thu Jul 25 2019","forecast":[{"dt":1564034400000,"time":"2:00am","temp":69.89,"weather":"Clouds","desc":"scattered clouds","icon":"03n"},{"dt":1564045200000,"time":"5:00am","temp":67.37,"weather":"Clouds","desc":"scattered clouds","icon":"03n"},{"dt":1564056000000,"time":"8:00am","temp":68.81,"weather":"Clouds","desc":"few clouds","icon":"02d"},{"dt":1564066800000,"time":"11:00am","temp":78.26,"weather":"Clear","desc":"clear sky","icon":"01d"},{"dt":1564077600000,"time":"2:00pm","temp":83.79,"weather":"Clear","desc":"clear sky","icon":"01d"},{"dt":1564088400000,"time":"5:00pm","temp":84.19,"weather":"Clear","desc":"clear sky","icon":"01d"},{"dt":1564099200000,"time":"8:00pm","temp":78.89,"weather":"Clear","desc":"clear sky","icon":"01n"},{"dt":1564110000000,"time":"11:00pm","temp":74.21,"weather":"Clear","desc":"clear sky","icon":"01n"}]},{"day":"Fri Jul 26 2019","forecast":[{"dt":1564120800000,"time":"2:00am","temp":72.05,"weather":"Clear","desc":"clear sky","icon":"01n"}]}],"location":{"street":"","city":"Holmes","state":"PA","country":"US","postalCode":"19043"}}';
var exampleState = JSON.parse(exampleJSONState);

class App extends Component {
  state: State = {
    celsius: false,
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
        celsius: this.state.celsius
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
    const currentWeather =
      this.state.current &&
      this.state.current.temp &&
      this.state.current.icon ? (
        <CardContent>
          <div>
            {this.state.current.desc.charAt(0).toUpperCase()}
            {this.state.current.desc.slice(1)}
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  {this.state.current.temp}&deg;{" "}
                  {this.state.celsius ? "C" : "F"}
                </td>
                <td>
                  <img
                    src={`http://openweathermap.org/img/wn/${
                      this.state.current.icon
                    }@2x.png`}
                    alt={this.state.current.weather}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      ) : (
        ""
      );

    const location =
      this.state.location && this.state.location.country ? (
        <div>
          <Card className="header-card">
            <CardContent>
              <h3>Right now in</h3>
              {Object.values(this.state.location)
                .filter(item => item !== "")
                .map((item, index, array) => {
                  if (index !== array.length - 1) {
                    return <span key={item}>{item}, </span>;
                  } else {
                    return <span key={item}>{item}.</span>;
                  }
                })}
            </CardContent>
            {currentWeather}
          </Card>
        </div>
      ) : (
        ""
      );

    const week =
      this.state.forecast && this.state.forecast.length > 0
        ? this.state.forecast.map(item => {
            return (
              <Card key={item.day} className="forecast-card">
                <h4>{item.day}</h4>
                <table>
                  <tbody>
                    {item.forecast.map(forecast => (
                      <tr key={forecast.dt}>
                        <td>{forecast.time}</td>
                        <td>
                          {forecast.temp}&deg; {this.state.celsius ? "C" : "F"}
                        </td>
                        <td className="table-img">
                          <img
                            src={`http://openweathermap.org/img/wn/${
                              forecast.icon
                            }@2x.png`}
                            alt={forecast.main}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            );
          })
        : "";

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
        {location}
        {week}
      </div>
    );
  }
}

export default App;
