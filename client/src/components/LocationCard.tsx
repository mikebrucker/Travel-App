import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./LocationCard.scss";
import CardMedia from "@material-ui/core/CardMedia";
import { itDoesntLookLikeAnythingToMe } from "../types/arnold";

const LocationCard: any = ({ current, location, clock }) => {
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

  const timezoneAdjustmentHours =
    current && current.timezoneDifference
      ? current.timezoneDifference / 3600
      : 0;

  const timezoneAdjustmentMinutes = (timezoneAdjustmentHours % 1) * 60;

  const addOneHourFromAdjustedMinutes =
    clock.minutes + timezoneAdjustmentMinutes > 59
      ? clock.hours + 1
      : clock.hours;

  const adjustedMinutes =
    clock.minutes + timezoneAdjustmentMinutes > 59
      ? clock.minutes + timezoneAdjustmentMinutes - 60
      : clock.minutes + timezoneAdjustmentMinutes;

  const adjustedHours =
    addOneHourFromAdjustedMinutes + timezoneAdjustmentHours > 23
      ? addOneHourFromAdjustedMinutes + timezoneAdjustmentHours - 24
      : addOneHourFromAdjustedMinutes + timezoneAdjustmentHours < 0
      ? addOneHourFromAdjustedMinutes + timezoneAdjustmentHours + 24
      : addOneHourFromAdjustedMinutes + timezoneAdjustmentHours;

  const hours = Math.floor(
    adjustedHours > 12
      ? adjustedHours - 12
      : adjustedHours === 0
      ? 12
      : adjustedHours
  );

  const minutes = adjustedMinutes > 9 ? adjustedMinutes : `0${adjustedMinutes}`;
  const seconds = clock.seconds > 9 ? clock.seconds : `0${clock.seconds}`;
  const ampm = adjustedHours > 11 ? "PM" : "AM";

  const time = clock.hours > -1 ? `${hours}:${minutes}:${seconds}` : "";

  const mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${itDoesntLookLikeAnythingToMe}&center=${
    current.latitude
  },${current.longitude}`;

  const locationFromSearch = Object.values(location)
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
          <div className="time">
            <span className="numbers">{time}</span>
            <span className="ampm"> {ampm}</span>
          </div>
        </CardContent>
        {currentWeather}
      </Card>
    ) : (
      ""
    );

  const mapCard = (
    <Card className="mapCard">
      <CardMedia
        className="map-image"
        image={mapUrl}
        title={locationFromSearch}
      />
    </Card>
  );

  return (
    <div className="LocationCard">
      {myLocation}
      {mapCard}
    </div>
  );
};

export default LocationCard;
