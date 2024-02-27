import styled from "styled-components"

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
  value: DatesType | undefined,
  city: string
}

interface DatesType{
  temp: number,
  temp_min: number,
  temp_max: number,
  dt_txt: string,
  description: string,
  map?: any,
  split?: any
}

interface ForecastDescriptionType{
  description: string
}

export const ArrayForecast = ({value, city}:objectForecastType) => {
  const daysWeek = ['Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.', 'Dom.']
  
  return(
    <Container>
      <CityName>{city.replace(/-/g, ' ').replace(/,/g, ' - ')}</CityName>
      <DataGeral>

      {value && value.map((item: DatesType | string, index: number) => {
            return(
              typeof item === 'string' ?
              (
              <DayWeek key={`key-day-week${index}`}>
                {daysWeek[new Date(item.split(" ")[0]).getDay()]} - {item.split(" ")[1].slice(0, 2)}h
              </DayWeek>
              )
            :
              <ContainerData key={`key-container-data${index}`}>
                {item.temp ? 
                  <NumberTemp>
                    {item.temp_min.toFixed()}°/ 
                    {item.temp_max.toFixed()}°
                  </NumberTemp>
                : item.map((objectDescription: ForecastDescriptionType) => (
                    <DescriptionWeather key={`key-description-weather${index}`}> 
                      {objectDescription.description} 
                    </DescriptionWeather>
                  ))}
              </ContainerData>
            )
        })        
      }
        
      </DataGeral>
    </Container>
  )
}