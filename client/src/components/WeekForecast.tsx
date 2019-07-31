import React from "react";
import Card from "@material-ui/core/Card";
import "./WeekForecast.scss";
import { Forecast } from "../types/types";

const WeekForecast: any = (props: { forecast: Forecast[] }) => {
  const { forecast } = props;

  const week =
    forecast && forecast.length > 1
      ? forecast.map(item => {
          return (
            <Card key={item.day} className="forecast-card">
              <h4>{item.day}</h4>
              <table>
                <tbody>
                  {item.forecast.map(forecast => (
                    <tr key={forecast.dt}>
                      <td>{forecast.time}</td>
                      <td>{forecast.temp}</td>
                      <td>{forecast.weather}</td>
                      <td className="table-image">
                        <img src={forecast.icon} alt={forecast.desc} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          );
        })
      : "";

  return <div className="WeekForecast">{week}</div>;
};

export default WeekForecast;
