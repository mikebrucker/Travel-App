import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./Location.scss";

const Location: any = ({ current, location, celsius }) => {
  const currentWeather =
    current && current.temp && current.icon ? (
      <CardContent>
        <div>
          {current.temp}&deg; {celsius ? "C" : "F"}
        </div>
        <div>
          {current.desc.charAt(0).toUpperCase()}
          {current.desc.slice(1)}
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${current.icon}@2x.png`}
          alt={current.weather}
        />
      </CardContent>
    ) : (
      ""
    );

  const myLocation =
    location && location.country ? (
      <Card raised className="header-card">
        <CardContent>
          <h3>Right now in</h3>
          {Object.values(location)
            .filter(item => item !== "")
            .map((item, index, array) => {
              if (index !== array.length - 1) {
                return <span key={index}>{item}, </span>;
              } else {
                return <span key={index}>{item}.</span>;
              }
            })}
        </CardContent>
        {currentWeather}
      </Card>
    ) : (
      ""
    );

  return <div className="Location">{myLocation}</div>;
};

export default Location;
