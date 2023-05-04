export function formatDateRange(startDate: Date, endDate: Date): string {
  const startMonth = startDate.toLocaleString('default', { month: 'short' })
  const startDay = startDate.getDate()
  const endMonth = endDate.toLocaleString('default', { month: 'short' })
  const endDay = endDate.getDate()
  const year = endDate.getFullYear()

  let formattedDate = `${startMonth} ${startDay}`

  if (startMonth !== endMonth) {
    formattedDate += ` - ${endMonth} ${endDay}`
  } else if (startDay !== endDay) {
    formattedDate += ` - ${endDay}`
  }

  formattedDate += `, ${year}`

  return formattedDate
}
