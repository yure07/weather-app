import axios from "axios";

const apiKey = 'a0a817507e53ba1b1dd72892648da088'

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