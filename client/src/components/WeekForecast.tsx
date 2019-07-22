import React from "react";
import Card from "@material-ui/core/Card";
import "./WeekForecast.scss";

const WeekForecast: any = ({ forecast, celsius }) => {
  const week =
    forecast && forecast.length > 0
      ? forecast.map(item => {
          return (
            <Card key={item.day} className="forecast-card">
              <h4>{item.day}</h4>
              <table>
                <tbody>
                  {item.forecast.map(forecast => (
                    <tr key={forecast.dt}>
                      <td>{forecast.time}</td>
                      <td>
                        {forecast.temp}&deg; {celsius ? "C" : "F"}
                      </td>
                      <td>{forecast.weather}</td>
                      <td className="table-image">
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

  return <div className="WeekForecast">{week}</div>;
};

export default WeekForecast;
