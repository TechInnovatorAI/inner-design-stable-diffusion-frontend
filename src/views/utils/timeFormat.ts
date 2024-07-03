export const timeFormat = (inputTimestamp: string) => {
  const date = new Date(inputTimestamp)

  // Define an array for the Japanese day names
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']

  // Extract year, month, day, day of the week, hours, and minutes
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Months are zero-based
  const day = date.getDate()
  const dayOfWeek = dayNames[date.getDay()]
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // Format the date and time in the desired style
  const japaneseDateTime = `${year}年${month}月${day}日 (${dayOfWeek}) ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`

  console.log(japaneseDateTime) // Output: "2023年9月27日 (水) 05:37"

  return japaneseDateTime
}
