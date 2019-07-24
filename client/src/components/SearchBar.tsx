import React from "react";
import TempFormat from "./TempFormat";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import "./SearchBar.scss";

const SearchBar: any = ({
  tempFormatChange,
  handleChange,
  handleSubmit,
  clearForm,
  searchInput,
  celsius
}) => {
  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <h1>Where do you want to go?</h1>
      <TextField
        name="street"
        placeholder="Street"
        onChange={handleChange}
        value={searchInput.street}
      />
      <TextField
        name="city"
        placeholder="City"
        onChange={handleChange}
        value={searchInput.city}
      />
      <TextField
        name="state"
        placeholder="State"
        onChange={handleChange}
        value={searchInput.state}
      />
      <TextField
        name="postalCode"
        placeholder="Zip Code"
        onChange={handleChange}
        value={searchInput.postalCode}
      />
      <TextField
        name="country"
        placeholder="Country"
        onChange={handleChange}
        value={searchInput.country}
      />
      <div className="buttons">
        <Button color="primary" type="submit" variant="contained">
          Search
        </Button>
        <Tooltip title="Clear Search Inputs" enterDelay={333}>
          <Button color="secondary" variant="contained" onClick={clearForm}>
            &times;
          </Button>
        </Tooltip>
        <TempFormat tempFormat={celsius} handleChange={tempFormatChange} />
      </div>
      <div>
        <sup>Only one search parameter is required.</sup>
      </div>
    </form>
  );
};

export default SearchBar;
