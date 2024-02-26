import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getAllGeographic } from './../api/geographicService';
import { getAllForecast } from './../api/forecastService';

interface ArrayObjectType{
  id: number, 
  main: string, 
  description: string, 
  icon:string
}

interface ObjectType{
  feels_like: number
  grnd_level: number
  humidity: number
  pressure: number
  sea_level: number
}

interface PayloadOrganizeData{
  clouds: Object,
  dt: number,
  dt_txt: string,
  main: Object,
  pop: number,
  sys: Object,
  visibility: number,
  weather: ArrayObjectType,
  wind: Object,
  forEach?: any
}

interface InitialStateType{
  latCity: number | null,
  lonCity: number | null,
  cities: string[]
  forecasts: any[]
}

const INITIAL_STATE:InitialStateType = {
  latCity: null,
  lonCity: null,
  cities:[],
  forecasts:[]
}

export const sliceForecasts = createSlice({
  name: 'forecasts',
  initialState: INITIAL_STATE,
  reducers:{
    //actions

    setCity:(state, action: PayloadAction<string>) => {
      state.cities.push(action.payload)
    },

    setCityCoordinates: (state, action: PayloadAction<{lat: number, lon: number}>) => {
      state.latCity = action.payload.lat;
      state.lonCity = action.payload.lon;
    },

    organizeData:(state, { payload }) => {
      const forecasts:Object[] = []

      payload.forEach((obj: Object) => {
        const arrayObjs = Object.entries(obj);
        arrayObjs.forEach(([key, value]) => {
          if(key === 'main' || key === 'dt_txt' || key === 'weather') {
            forecasts.push(value);
          }
        });
      });

      for (let i = 0; i < forecasts.length - 2; i += 3) {
        const temp = forecasts[i];
        forecasts[i] = forecasts[i + 2];
        forecasts[i + 2] = temp;
      }

      state.forecasts.push(forecasts)

      //return {...state, forecasts: forecasts}
    },

    getState:(state) => {
      return state
    }
  }
})

export const { setCity, setCityCoordinates, organizeData, getState } = sliceForecasts.actions

export const useValue = (state: any) => {
  return state.forecasts 
}

export const getOnApis = (payload:string) => async (dispatch: Dispatch) => {
  try {
    const data = await getAllGeographic(payload);
    const { lat, lon } = data[0];
    dispatch(setCityCoordinates({ lat, lon }));
    dispatch(setCity(payload));
    const list:Object[] = await getAllForecast(lat, lon);
    return list
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

export default sliceForecasts.reducer