import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { fetchCityWeatherCurrent, fetchCityWeatherHistorical, fetchStations } from "../services/weatherApi";
import { WeatherState } from "./weatherSlice.types";
import { Dispatch } from "redux";

const initialState: WeatherState = {
  cities: [],
  stations: [],
  additionsStatus: "awaiting",
  stationsStatus: "awaiting",
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
    historical: historicalWeather,
  };
});

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // Initilization thunk
      .addCase(initializeWeatherDashboard.pending, (state) => {
        state.stationsStatus = "loading";
      })
      .addCase(initializeWeatherDashboard.fulfilled, (state, action) => {
        state.stationsStatus = "idle";
        state.stations = action.payload;
      })
      .addCase(initializeWeatherDashboard.rejected, (state) => {
        state.stationsStatus = "failed";
      })
      // Add city thunk
      .addCase(addCityToDashboard.pending, (state) => {
        state.additionsStatus = "loading";
      })
      .addCase(addCityToDashboard.fulfilled, (state, action) => {
        state.additionsStatus = "idle";
        state.cities.push({
          id: action.payload.cityId,
          order: state.cities.length + 1,
          name: state.stations.find((station) => station.id === action.payload.cityId)?.name || "Unknown",
          current: action.payload.current,
          historical: action.payload.historical,
        });
      })
      .addCase(addCityToDashboard.rejected, (state) => {
        state.additionsStatus = "failed";
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectStations = (state: RootState) => state.weather.stations;
export const selectCities = (state: RootState) => state.weather.cities;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default weatherSlice.reducer;
