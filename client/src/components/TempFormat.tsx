import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
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
        <ToggleButton classes={{ selected: "selected-temp" }} value={true}>
          C
        </ToggleButton>
        <ToggleButton classes={{ selected: "selected-temp" }} value={false}>
          F
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default TempFormat;
