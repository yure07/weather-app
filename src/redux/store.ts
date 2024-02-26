import { configureStore } from "@reduxjs/toolkit";
import sliceForecasts from "./sliceForecasts";

export const store = configureStore({
  reducer:{
    forecasts: sliceForecasts
  }
})