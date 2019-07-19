import React from "react";
import { TextField, Button } from "@material-ui/core";

const SearchBar: any = ({ handleChange, handleSubmit, state }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          name="street"
          onChange={handleChange}
          value={state.searchInput.street}
        />
        <TextField
          name="city"
          onChange={handleChange}
          value={state.searchInput.city}
        />
        <TextField
          name="state"
          onChange={handleChange}
          value={state.searchInput.state}
        />
        <TextField
          name="postalCode"
          onChange={handleChange}
          value={state.searchInput.postalCode}
        />
        <TextField
          name="country"
          onChange={handleChange}
          value={state.searchInput.country}
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
