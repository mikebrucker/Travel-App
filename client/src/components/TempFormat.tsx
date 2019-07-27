import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import "./TempFormat.scss";

const TempFormat: any = ({ handleChange, tempFormat }) => {
  return (
    <div className="TempFormat">
      <ToggleButtonGroup
        size="small"
        value={tempFormat}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton
          classes={{ root: "font", selected: "selected-celsius" }}
          value={true}
        >
          <Tooltip title="Celsius" enterDelay={333}>
            <div>&deg;C</div>
          </Tooltip>
        </ToggleButton>
        <ToggleButton
          classes={{ root: "font", selected: "selected-fahrenheit" }}
          value={false}
        >
          <Tooltip title="Fahrenheit" enterDelay={333}>
            <div>&deg;F</div>
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default TempFormat;
