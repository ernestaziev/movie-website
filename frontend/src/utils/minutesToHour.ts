export function minutesToHours(minutes: number): string {
  const restOfMinutes = minutes % 60
  const result: number | string = (minutes - restOfMinutes) / 60

  if (restOfMinutes > 0) {
    return result + ` hr ${restOfMinutes} min`
  }

  return result + " hr"
}
