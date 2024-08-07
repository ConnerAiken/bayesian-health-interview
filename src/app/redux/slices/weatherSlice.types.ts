export interface WeatherReport {
  [key: string]: any;
  time: string;
  time_local: string;
  temperature?: number;
  dewpoint?: number;
  humidity?: number;
  precipitation?: number;
  precipitation_3?: number;
  precipitation_6?: number;
  snowdepth?: number;
  windspeed?: number;
  peakgust?: number;
  winddirection?: number;
  pressure?: number;
  condition?: string;
}

export interface City {
  id: string;
  order: number;
  name: string;
  current: WeatherReport;
  historical: WeatherReport[];
}

export interface Station {
  name: string;
  id: string;
}

export interface WeatherState {
  cities: City[];
  stations: Station[];
}

export interface PositionMovePayload {
  direction: "up" | "down";
  city: City;
}
