import './App.css';
import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { ArrayForecast } from './components/ArrayForecast';
import { useDispatch, useSelector } from 'react-redux';
import { addForecast, useValue } from './redux/sliceForecasts';
import { getOnApis } from './redux/api'; 
import { organizeData } from './components/organizeData';

const Container = styled.main`
  display: flex;
  flex-direction: column;
`

const PrimaryText = styled.h1`
  font-size: 24px;
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
  justify-content: center;
  width: 100%;
  margin: 0px auto;
  gap: 8px;
`

const InputSearchCity = styled.input`
  width: 200px;
  height: 50px;
  padding: 0 10px;
  border-radius: 8px;
`

const BtnSearch = styled.button`
  width: 120px;
  height: 50px;
  border: 0;
  border-radius: 8px;
  background-color: #3da8a8;
  font-size: 16px;
  cursor: pointer;
`
  
const App:React.FC = () => {
  const [city, setCity] = useState<string>('')
  const [allForecasts, setAllForecasts] = useState<any>()
  const [showForecasts, setShowForecasts] = useState(false)
  const forecastInRedux = useSelector(useValue)
  const dispatch = useDispatch()

  const handleClick = async () => {
    if (!forecastInRedux.cities.includes(city)) {
      try {
        const listFunction = getOnApis(city);
        const list:Object[] = await listFunction(dispatch)
        // @ts-ignore
        const result:Object[] = organizeData(list)
        dispatch(addForecast(result))
        setAllForecasts(result)
        setShowForecasts(true)
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    } else {
      const indexForecast:number = forecastInRedux.cities.indexOf(city)
      setAllForecasts(forecastInRedux.forecasts[indexForecast])
      setShowForecasts(true)
    }
  }

  return (
    <Container>
      <PrimaryText>Digite cidade/estado/país para buscar</PrimaryText>
      <ContainerInput>
        <ContainerToSearch>
          <InputSearchCity 
            placeholder='Ex: Sao-Paulo,SP,BR' 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
            required
          />
          <BtnSearch onClick={handleClick}>Buscar</BtnSearch>
        </ContainerToSearch>
        {showForecasts && <ArrayForecast value={allForecasts} city={city}/>}
      </ContainerInput>
    </Container>
  );
}

export default App;
