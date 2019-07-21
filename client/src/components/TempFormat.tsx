import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "./TempFormat.scss";

const TempFormat: any = ({ handleChange, tempFormat }) => {
  return (
    <div className="TempFormat">
      <FormControlLabel
        control={
          <Switch
            checked={tempFormat}
            onChange={handleChange}
            value={tempFormat}
          />
        }
        label={tempFormat ? "C" : "F"}
      />
    </div>
  );
};

export default TempFormat;
