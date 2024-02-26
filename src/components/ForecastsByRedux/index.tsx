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
  dt_txt: string,
  description: string,
  map?: any,
  split?: any
}

interface ForecastByReduxProps {
  item: string | DatesType;
  index: number;
  daysWeek: string[];
}

interface ForecastDescriptionType{
  description: string
}

export const ForecastByRedux: React.FC<ForecastByReduxProps> = ({ item, index, daysWeek }) => {
  console.log('chamou do redux')
  if (typeof item === 'string') {
    const splitItem = item.split(" ");
    return (
      <DayWeek key={`key-redux-day-week${index}`}>
        {daysWeek[new Date(splitItem[0]).getDay()]} - {splitItem[1].slice(0, 2)}h
      </DayWeek>
    );
  } else if (typeof item === 'object' && !Array.isArray(item)) {
    return (
      <ContainerData key={`key-redux-container-data${index}`}>
        {item.temp && (
          <NumberTemp>
            {item.temp_min.toFixed()}°/ {item.temp_max.toFixed()}°
          </NumberTemp>
        )}
        {item.dt_txt && (
          <DayWeek>
            {daysWeek[new Date(item.dt_txt.split(" ")[0]).getDay()]} -{" "}
            {item.dt_txt.split(" ")[1].slice(0, 2)}h
          </DayWeek>
        )}
        {item.description && (
          <DescriptionWeather key={`redux-description-weather-${index}`}>
            {item.description}
          </DescriptionWeather>
        )}
      </ContainerData>
    );
  } else return null
};