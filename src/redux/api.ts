import { Dispatch } from "@reduxjs/toolkit";
import { getAllGeographic } from "../api/geographicService";
import { getAllForecast } from "../api/forecastService";
import { setCity } from "./sliceForecasts";

export const getOnApis = (payload: string) => async (dispatch: Dispatch): Promise<Object[]> => {
  try {
    const data = await getAllGeographic(payload)
    const { lat, lon } = data[0];
    dispatch(setCity(payload));
    const list:Object[] = await getAllForecast(lat, lon)
    return list
  } catch (error) {
    console.error(error)
    throw error
  }
}