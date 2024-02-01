import './App.css';
import styled from 'styled-components';
import { ChangeEvent, useEffect, useState } from 'react';
import { getAllGeographic } from './api/geographicService';
import { getAllForecast } from './api/forecastService';
import { ArrayForecast } from './components/ArrayForecast';

const Container = styled.main`
  display: flex;
  flex-direction: column;
`

const PrimaryText = styled.h1`
  margin: 24px 0;
  text-align: center;
`

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
`

const ContainerToSearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 430px;
  margin: 0px auto;
`

const InputSearchCity = styled.input`
  width: 250px;
  height: 50px;
  padding: 0 10px;
  border-radius: 8px;
`

const BtnSearch = styled.button`
  width: 150px;
  height: 50px;
  border: 0;
  border-radius: 8px;
  background-color: #3da8a8;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`
  
const App:React.FC = () => {
  const [city, setCity] = useState<string>('')
  const [allForecasts, setAllForecasts] = useState<Object[]>()
  const [showForecasts, setShowForecasts] = useState(false)

  let latCity:number
  let lonCity:number

  const handleClick = async () => {
    setShowForecasts(true)
    await getAllGeographic(city)
      .then(data => {
        latCity = data[0].lat
        lonCity = data[0].lon
      })
    await getAllForecast(latCity, lonCity)
      .then(list => {
        setAllForecasts(list)
      })
  }

  return (
    <Container>
      <PrimaryText>Digite cidade/estado/país para buscar e olhe o resultado no console</PrimaryText>
      <ContainerInput>
        <ContainerToSearch>
          <InputSearchCity 
            placeholder='Ex: Sao-Paulo,SP,BR' 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
            required
          />
          <BtnSearch onClick={handleClick}>Buscar</BtnSearch>
        </ContainerToSearch>
        {showForecasts && <ArrayForecast value={allForecasts}/>}
      </ContainerInput>
    </Container>
  );
}

export default App;
