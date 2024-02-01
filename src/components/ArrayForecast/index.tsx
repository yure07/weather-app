import { useState } from "react"
import styled from "styled-components"

const Container = styled.main`
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
`

const ContainerData = styled.section`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  border: 1px solid red;
  margin-top: 12px;
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
  const controlDaysWeek:Array<string> = []
  const fiveDaysAll:Array<string | DatesType> = []

  value?.map((obj: Object) => {
    const arrayObjs = Object.entries(obj)
    arrayObjs.map(([key, value]) => {
      if(key === 'main') fiveDaysAll.push(value)
      if(key === 'dt_txt') fiveDaysAll.push(value) 
      if(key === 'weather') fiveDaysAll.push(value)
    })
  })   
  
  return(
    <Container>
      {fiveDaysAll.map((value:string | DatesType, index: number, array:(string | DatesType)[]) => {
        if(typeof value === 'object') {
          return (
            <ContainerData key={index}> 
            {value.temp ? 
              <p>
                min: {value.temp_min && value.temp_min.toFixed()}° / 
                max: {value.temp_max && value.temp_max.toFixed()}°
              </p>
            : value.map((item: ForecastDescriptionType) => (
              <p key={index}> {item.description} </p>
              ))}
            </ContainerData>
          )
        }
        else {
          const justDate:string = value.split(" ")[0]
          const newDate = new Date(justDate)
          const indexDayWeek = newDate.getDay()
          const dayToday:string = daysWeek[indexDayWeek]
          /*if(!controlDaysWeek.includes(dayToday)){ 
            controlDaysWeek.push(dayToday)
            return(
              <p key={index}> {dayToday} </p>
            )
          }*/
          return <p key={index}> {dayToday} </p>
          
        }
      })}
    </Container>
  )
}