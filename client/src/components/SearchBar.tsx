import React from "react";
import { TextField, Button } from "@material-ui/core";

type searchResult = {
  key: string;
  city: string;
  state: string;
  country: string;
};

const SearchBar: any = ({ handleChange, handleSubmit, state }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField name="street" onChange={handleChange} />
        <TextField name="city" onChange={handleChange} />
        <TextField name="state" onChange={handleChange} />
        <TextField name="postalCode" onChange={handleChange} />
        <TextField name="country" onChange={handleChange} />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
      <br />
      <div>{JSON.stringify(state.current)}</div>
      <div>{JSON.stringify(state.forecast)}</div>
    </div>
  );
};

export default SearchBar;
