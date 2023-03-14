export const timeToMilliseconds = (time: string) => {
  const [hours, minutes, seconds] = time.split(':').map(Number)
  const milliseconds = ((hours * 60 + minutes) * 60 + seconds) * 1000
  
  return milliseconds
}