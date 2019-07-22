export type Location = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type Current = {
  latitude: number | null;
  longitude: number | null;
  temp: number | null;
  weather: string;
  desc: string;
  icon: string;
  sunrise: number | null;
  sunset: number | null;
};

export type Forecast3Hour = {
  dt: number | null;
  time: string;
  timezone: number | null;
  temp: number | null;
  weather: string;
  desc: string;
  icon: string;
};

export type ForecastDay = {
  day: string;
  forecast: Forecast3Hour[];
};

export type Forecast = ForecastDay[];

export type State = {
  celsius: boolean;
  userTimezone: number;
  searchInput: Location;
  current: Current;
  forecast: Forecast;
  location: Location;
};
