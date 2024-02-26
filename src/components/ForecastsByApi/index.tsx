import styled from "styled-components"

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

interface DatesType{
  temp: number,
  temp_min: number,
  temp_max: number,
  map?: any
}

interface ForecastByApiProps {
  value: string | DatesType;
  index: number;
  daysWeek: string[];
}

interface ForecastDescriptionType{
  description: string
}

export const ForecastByApi: React.FC<ForecastByApiProps> = ({ value, index, daysWeek }) => {
  console.log('chamou da api')
  return (
    typeof value === 'string' ?
      <DayWeek key={`key-api-day-week${index}`}>
        {daysWeek[new Date(value.split(" ")[0]).getDay()]} - {value.split(" ")[1].slice(0, 2)}h
      </DayWeek>
    :
      <ContainerData key={`key-api-container-data${index}`}>
        {value.temp ? 
          <NumberTemp>
            {value.temp_min.toFixed()}°/ 
            {value.temp_max.toFixed()}°
          </NumberTemp>
        : value.map((objectDescription: ForecastDescriptionType) => (
            <DescriptionWeather key={`key-api-description-weather${index}`}> 
              {objectDescription.description} 
            </DescriptionWeather>
          ))}
      </ContainerData>
  );
};