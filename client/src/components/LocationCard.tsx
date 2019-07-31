import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./LocationCard.scss";
import CardMedia from "@material-ui/core/CardMedia";
import { itDoesntLookLikeAnythingToMe } from "../types/arnold";
import { Current, Location, Clock } from "../types/types";
import TimezoneClock from "./TimezoneClock";

const LocationCard = (props: {
  current: Current;
  location: Location;
  clock: Clock;
}) => {
  const { current, location, clock } = props;

  const currentWeather =
    current && current.temp && current.icon ? (
      <CardContent>
        <div>{current.temp}</div>
        <div>
          {current.desc.charAt(0).toUpperCase()}
          {current.desc.slice(1)}
        </div>
        <img src={current.icon} alt={current.weather} />
      </CardContent>
    ) : (
      ""
    );

  const mapUrl: string = `https://www.mapquestapi.com/staticmap/v5/map?key=${itDoesntLookLikeAnythingToMe}&center=${
    current.latitude
  },${current.longitude}`;
  console.log(itDoesntLookLikeAnythingToMe);

  const locationFromSearch: string = Object.values(location)
    .filter(item => item !== "")
    .map((item, index, array) => {
      if (index !== array.length - 1) {
        return `${item},`;
      } else {
        return `${item}.`;
      }
    })
    .join(" ");

  const myLocation =
    location && location.country ? (
      <Card raised className="header-card">
        <CardContent>
          <h3>Right now in</h3>
          {locationFromSearch}
          <TimezoneClock
            timezoneDifference={current.timezoneDifference}
            clock={clock}
          />
        </CardContent>
        {currentWeather}
      </Card>
    ) : (
      ""
    );

  const mapCard =
    current && current.temp ? (
      <Card className="mapCard">
        <CardMedia
          className="map-image"
          image={mapUrl}
          title={locationFromSearch}
        />
      </Card>
    ) : (
      ""
    );

  return (
    <div className="LocationCard">
      {myLocation}
      {mapCard}
    </div>
  );
};

export default LocationCard;
