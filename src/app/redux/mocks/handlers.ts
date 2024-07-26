import { rest } from "msw";
import { baseApiUrl } from "../services/weatherApi";
import { Station, WeatherReport } from "../slices/weatherSlice.types";

const mockStations: Station[] = [
  {
    id: "1",
    name: "City 1",
  },
  {
    id: "2",
    name: "City 2",
  },
  {
    id: "3",
    name: "City 3",
  },
];

const mockWeatherReport: WeatherReport = {
  time: "2021-08-01T00:00:00Z",
  time_local: "2021-08-01T00:00:00Z",
  temperature: 30,
  dewpoint: 20,
  humidity: 70,
  precipitation: 0,
  precipitation_3: 0,
  precipitation_6: 0,
  snowdepth: 0,
  windspeed: 10,
  peakgust: 15,
  winddirection: 180,
  pressure: 1010,
  condition: "Clear",
};

const dynamicHandlers = [
  // Mock a /current/:id/*.json request for each station
  ...mockStations.map((station) => {
    return rest.get(`${baseApiUrl}/current/${station.id}.json`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ ...mockWeatherReport }));
    });
  }),
  ...mockStations.map((station) => {
    return rest.get(`${baseApiUrl}/historical/${station.id}.json`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([mockWeatherReport, mockWeatherReport, mockWeatherReport]));
    });
  }),
];

export const handlers = [
  rest.get(`${baseApiUrl}/stations.json`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockStations));
  }),
  ...dynamicHandlers,
];
