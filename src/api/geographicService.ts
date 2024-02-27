import axios from "axios";

const apiKey:string | undefined = process.env.REACT_APP_API_KEY

export const getAllGeographic = async (city: string) => {
   return await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}BR&limit=5&appid=${apiKey}`)
      .then((response) => response.data)
}