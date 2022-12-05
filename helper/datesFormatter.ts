export function formatDate(date: Date) {
  const dateArr = date.toString().split(' ')
  let formattedDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[3]} ${dateArr[4]}`
  return formattedDate
}
