import styled from "styled-components"
import { useValue } from '../../redux/sliceForecasts'; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DataGeral = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 12px;
  width: 88%;
  position: absolute;
  margin-top: 96px;
`

const CityName = styled.h1`
  font-family: 'Inter';
  color: #fff;
  text-align: center;
  margin: 30px 0;
`

const ContainerData = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`

const NumberTemp = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin-top: -12px;
  margin-bottom: 12px;
  text-align: end;
  align-self: flex-end;
`

const DescriptionWeather = styled(NumberTemp)`
  width: 128px;
  margin-left: 24px;
  margin-bottom: 0;
  text-align: center;
  max-width: inherit;
  align-self: center;
`

const DayWeek = styled.p`
  font-size: 15px;
  font-weight: bold;
`

interface objectForecastType{
  value: Object[] | undefined,
  city: string,
  map?: any
}

interface DatesType{
  temp: number,
  temp_min: number,
  temp_max: number,
  dt_txt: string,
  description: string,
  map?: any,
}

interface ForecastDescriptionType{
  description: string
}

export const ArrayForecast:React.FC<objectForecastType> = ({ value, city }) => {
  const forecastsInRedux:[] = useSelector(useValue)
  const dispatch = useDispatch()
  const daysWeek = ['Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.', 'Dom.']
  const fiveDaysAll:Array<string | DatesType> = []

  const verifyInRedux = () => {
    return forecastsInRedux.some((item:string | DatesType) => 
      JSON.stringify(item) === JSON.stringify(fiveDaysAll))
  }
  
  const verifyAndDispatch = () => {
    const existsInRedux:boolean = verifyInRedux()
    //if (!existsInRedux) dispatch(addCityForecast(fiveDaysAll))
  }

  useEffect(() => {
    verifyAndDispatch();
  },[fiveDaysAll])
  
  return(
    <Container>
      <CityName>{city.replace(/-/g, ' ').replace(/,/g, ' - ')}</CityName>
      <DataGeral>

      {}
        
      </DataGeral>
      <button style={{'marginTop': '-20px'}} onClick={() => console.log(forecastsInRedux)}>Pega dados do redux</button>
    </Container>
  )
}