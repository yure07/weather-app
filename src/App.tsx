import './App.css';
import styled from 'styled-components';
import { useEffect } from 'react';
import { getAllGeographic } from './api/geographicService';
import { getAllForecast } from './api/forecastService';

const InputSearchCity = styled.input``

const App:React.FC = () => {
  let latCity:number
  let lonCity:number
  const forecastFiveDays:Array<Object> = []

  useEffect(() => {
    const allFetch = async () => {
      await getAllGeographic()
        .then(data => {
          //latCity = data[0].lat
          //lonCity = data[0].lon
        })
      await getAllForecast(latCity, lonCity)
        .then(list => {
         list.map((objectForecast:object) => {
            if(forecastFiveDays?.length >= 0){
              
              console.log(objectForecast)
            }
          })
        })
  }
  //allFetch()
  },[])

  return (
    <>
      <h1>Digite cidade/estado/país para buscar e olhe o resultado no console</h1>
      <InputSearchCity placeholder='Ex: Sao-Paulo,SP,BR'/>
    </>
  );
}

export default App;
