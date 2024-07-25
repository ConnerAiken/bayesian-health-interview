import weatherSlice, { addCityToDashboard, handlePositionMove } from "./weatherSlice";
import { PositionMovePayload, WeatherReport, WeatherState } from "./weatherSlice.types";

describe("weatherSlice reducer", () => {
  const weatherExample: WeatherReport = {
    time: "2021-06-01T12:00:00Z",
    time_local: "2021-06-01T12:00:00",
    temperature: 25,
    dewpoint: 15,
    humidity: 50,
    precipitation: 0,
    precipitation_3: 0,
    precipitation_6: 0,
    snowdepth: 0,
    windspeed: 10,
    peakgust: 15,
    winddirection: 180,
    pressure: 1010,
    condition: "Sunny",
  };
  const initialState: WeatherState = {
    cities: [],
    stations: [],
    additionsStatus: "awaiting",
    stationsStatus: "awaiting",
  };

  it("should handle initial state", () => {
    expect(weatherSlice(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle position movements", () => {
    const state: WeatherState = {
      cities: [
        {
          id: "1",
          order: 1,
          name: "City 1",
          current: {
            ...weatherExample,
          },
          historical: [],
        },
        {
          id: "2",
          order: 2,
          name: "City 2",
          current: {
            ...weatherExample,
          },
          historical: [],
        },
        {
          id: "3",
          order: 3,
          name: "City 3",
          current: { ...weatherExample },
          historical: [],
        },
      ],
      stations: [],
      additionsStatus: "awaiting",
      stationsStatus: "awaiting",
    };

    const action = { city: { id: "2" }, direction: "up" };
    const expected: WeatherState = {
      cities: [
        {
          id: "2",
          order: 2,
          name: "City 2",
          current: { ...weatherExample },
          historical: [],
        },
        {
          id: "1",
          order: 1,
          name: "City 1",
          current: { ...weatherExample },
          historical: [],
        },
        { id: "3", order: 3, name: "City 3", current: { ...weatherExample }, historical: [] },
      ],
      stations: [],
      additionsStatus: "awaiting",
      stationsStatus: "awaiting",
    };

    const actual = weatherSlice(state, handlePositionMove(action as PositionMovePayload));
    expect(actual).toEqual(expected);
  });
});
