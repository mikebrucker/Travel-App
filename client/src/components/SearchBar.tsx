import React from "react";
import TempFormat from "./TempFormat";
import { TextField, Button } from "@material-ui/core";
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
      <h2>Where do you want to go?</h2>
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
        <Button color="secondary" variant="contained" onClick={clearForm}>
          &times;
        </Button>
        <TempFormat tempFormat={celsius} handleChange={tempFormatChange} />
      </div>
    </form>
  );
};

export default SearchBar;
