import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchCityWeatherCurrent, fetchCityWeatherHistorical, fetchStations } from "../services/weatherApi";
import { City, PositionMovePayload, WeatherState } from "./weatherSlice.types";

const initialState: WeatherState = localStorage.getItem("state")
  ? JSON.parse(localStorage.getItem("state") ?? '{"weather": {"cities":[], "stations": []}}').weather
  : {
      cities: [],
      stations: [],
    };

export const initializeWeatherDashboard = createAsyncThunk("weather/initialize", async () => {
  const stations = await fetchStations();
  // The value we return becomes the `fulfilled` action payload
  return stations;
});

export const addCityToDashboard = createAsyncThunk("weather/addCity", async (cityId: string) => {
  const currentWeather = await fetchCityWeatherCurrent(cityId);
  const historicalWeather = await fetchCityWeatherHistorical(cityId);

  // The value we return becomes the `fulfilled` action payload
  return {
    cityId,
    current: currentWeather,
    historical: historicalWeather.data.slice(0, 3),
  };
});

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    handlePositionMove: (state, action: PayloadAction<PositionMovePayload>) => {
      const newlySorted: City[] = [...state.cities];

      const cityIndex = newlySorted.findIndex((city) => city.id === action.payload.city.id);
      const city = newlySorted[cityIndex];
      newlySorted.splice(cityIndex, 1);
      newlySorted.splice(action.payload.direction === "up" ? cityIndex - 1 : cityIndex + 1, 0, city);

      state.cities = [...newlySorted];
    },
    handleRemove: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(initializeWeatherDashboard.fulfilled, (state, action) => {
        state.stations = action.payload;
      })
      .addCase(addCityToDashboard.fulfilled, (state, action) => {
        state.cities = [
          ...state.cities,
          {
            id: action.payload.cityId,
            order: state.cities.length + 1,
            name: state.stations.find((station) => station.id === action.payload.cityId)?.name || "Unknown",
            current: action.payload.current,
            historical: action.payload.historical,
          },
        ];
      });
  },
});

export const { handlePositionMove, handleRemove } = weatherSlice.actions;
export const selectStations = (state: RootState) => state.weather.stations;
export const selectCities = (state: RootState) => state.weather.cities;

export default weatherSlice.reducer;
