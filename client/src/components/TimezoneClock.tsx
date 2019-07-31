import React from "react";
import { Clock } from "../types/types";
import "./TimezoneClock.scss";

const TimezoneClock = (props: { timezoneDifference: number; clock: Clock }) => {
  const { timezoneDifference, clock } = props;

  const timezoneAdjustmentHours: number = timezoneDifference
    ? timezoneDifference / 3600
    : 0;

  const timezoneAdjustmentMinutes: number = (timezoneAdjustmentHours % 1) * 60;

  const addOneHourFromAdjustedMinutes: number =
    clock.minutes + timezoneAdjustmentMinutes > 59
      ? clock.hours + 1
      : clock.hours;

  const adjustedMinutes: number =
    clock.minutes + timezoneAdjustmentMinutes > 59
      ? clock.minutes + timezoneAdjustmentMinutes - 60
      : clock.minutes + timezoneAdjustmentMinutes;

  const adjustedHours: number =
    addOneHourFromAdjustedMinutes + timezoneAdjustmentHours > 23
      ? addOneHourFromAdjustedMinutes + timezoneAdjustmentHours - 24
      : addOneHourFromAdjustedMinutes + timezoneAdjustmentHours < 0
      ? addOneHourFromAdjustedMinutes + timezoneAdjustmentHours + 24
      : addOneHourFromAdjustedMinutes + timezoneAdjustmentHours;

  const hours: number = Math.floor(
    adjustedHours > 12
      ? adjustedHours - 12
      : adjustedHours === 0
      ? 12
      : adjustedHours
  );

  const minutes: string =
    adjustedMinutes > 9 ? `${adjustedMinutes}` : `0${adjustedMinutes}`;
  const seconds: string =
    clock.seconds > 9 ? `${clock.seconds}` : `0${clock.seconds}`;
  const ampm: string = adjustedHours > 11 ? "PM" : "AM";

  const time: string = clock.hours > -1 ? `${hours}:${minutes}:${seconds}` : "";

  return (
    <div className="TimezoneClock">
      <span className="numbers">{time}</span>
      <span className="ampm"> {ampm}</span>
    </div>
  );
};

export default TimezoneClock;
