import axios from "axios";

const apiKey = 'a0a817507e53ba1b1dd72892648da088'

export const getAllGeographic = async () => {
   return await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=Sao-Paulo,SP,BR&limit=5&appid=${apiKey}`)
      .then((response) => response.data)
}