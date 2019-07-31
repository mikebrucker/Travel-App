export type Location = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type Current = {
  latitude: number;
  longitude: number;
  temp: string;
  weather: string;
  desc: string;
  icon: string;
  sunrise: number;
  sunset: number;
  timezoneDifference: number;
};

export type Forecast3Hour = {
  dt: number;
  time: string;
  timezone: number;
  temp: string;
  weather: string;
  desc: string;
  icon: string;
};

export type Forecast = {
  day: string;
  forecast: Forecast3Hour[];
};

export type Clock = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type SearchResults = {
  key: string;
  name: string;
  lat: number;
  long: number;
};

export type State = {
  celsius: boolean;
  userTimezone: number;
  clock: Clock;
  searchInput: Location;
  // searchResults: SearchResults[];
  current: Current;
  forecast: Forecast[];
  location: Location;
};
