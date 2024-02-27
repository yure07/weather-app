import axios from "axios";

const apiKey:string | undefined = process.env.REACT_APP_API_KEY

export const getAllForecast = async (latCity:number, lonCity: number) => {
  let responseApi:Array<Object> = []
  await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${latCity}&lon=${lonCity}&appid=${apiKey}&units=metric&lang=pt_br`
    )
    .then((response) => {
      responseApi = response.data.list
    })
    .catch((error) => {
      responseApi = error
    })
    return responseApi
}