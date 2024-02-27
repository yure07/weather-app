export const organizeData = (payload:Object[]) => {
  const forecasts:Object[] = []
  payload.forEach((obj: Object) => {
    const arrayObjs = Object.entries(obj);
    arrayObjs.forEach(([key, value]) => {
      if(key === 'main' || key === 'dt_txt' || key === 'weather') {
        forecasts.push(value);
      }
    })
  })
  
  for (let i = 0; i < forecasts.length - 2; i += 3) {
    const temp = forecasts[i]
    forecasts[i] = forecasts[i + 2]
    forecasts[i + 2] = temp;
  }
  
  return forecasts
}