import { useEffect } from "react"
import styled from "styled-components"

const Container = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
`

const ContainerData = styled.section`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-top: 12px;
`

const NumberTemp = styled.p`
  margin-top: -12px;
  margin-bottom: 12px;
`

const DescriptionWeather = styled(NumberTemp)`
  margin-bottom: 0;
`

interface objectForecastType{
  value: Object[] | undefined
}

interface DatesType{
  temp: number,
  temp_min: number,
  temp_max: number,
  map?: any
}

interface ForecastDescriptionType{
  description: string
}

export const ArrayForecast = ({value}: objectForecastType) => {
  const daysWeek = ['Segunda-feira', 'Terça-feira', 
    'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
  const fiveDaysAll:Array<string | DatesType> = []

  value?.map((obj: Object) => {
    const arrayObjs = Object.entries(obj)
    arrayObjs.map(([key, value]) => {
      if(key === 'main') fiveDaysAll.push(value)
      if(key === 'dt_txt') fiveDaysAll.push(value) 
      if(key === 'weather') fiveDaysAll.push(value)
    })
  }) 

  const reorderFiveDays = (a:string | DatesType, b:string | DatesType):number => {
    return -1
  }
  fiveDaysAll.sort(reorderFiveDays)
  
  
  return(
    <Container>
      {fiveDaysAll.map((value:string | DatesType, index: number, array:(string | DatesType)[]) => {
        if(typeof value === 'object') {
          return (
            <ContainerData key={index}> 
            {value.temp ? 
              <NumberTemp>
                min: {value.temp_min && value.temp_min.toFixed()}° / 
                max: {value.temp_max && value.temp_max.toFixed()}°
              </NumberTemp>
            : value.map((item: ForecastDescriptionType) => (
              <DescriptionWeather key={index}> {item.description} </DescriptionWeather>
              ))}
            </ContainerData>
          )
        }
        else {
          const justHour:string = value.split(" ")[1]
          const justDate:string = value.split(" ")[0]
          const newDate = new Date(justDate)
          const indexDayWeek = newDate.getDay()
          const dayToday:string = daysWeek[indexDayWeek]
          return <p key={index}> {dayToday} - {justHour.slice(0, 5)}h </p>
          }
      })}
    </Container>
  )
}