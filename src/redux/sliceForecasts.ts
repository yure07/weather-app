import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface InitialStateType{
  cities: string[]
  forecasts: any[]
}

const INITIAL_STATE:InitialStateType = {
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

    addForecast:(state, action) => {
      state.forecasts.push(action.payload)
    }
    
  }
})

export const { setCity, addForecast } = sliceForecasts.actions

export const useValue = (state: any) => {
  return state.forecasts 
}

export default sliceForecasts.reducer