export function formatDate(date: Date) {
  try {
    const dateArr = date.toString().split(' ')
    let formattedDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[3]} ${dateArr[4]}`
    return formattedDate
  } catch (error) {
    console.error('Could not format Error -', error)
  }
}

export function formatDateFromString(date: string) {
  // 2022-12-20T14:10:10.875246
  try {
    let dateArr = date.split('T')
    const theDate = dateArr[0]
    const time = dateArr[1]
    dateArr = theDate.split('-')
    let timeArr = time.split(':')
    const hours = timeArr[0]
    const min = timeArr[1]
    const sec = parseInt(timeArr[2]).toFixed(0)

    let formattedDate = `${dateArr[0]}/${dateArr[1]}/${dateArr[2]} ${hours}:${min}:${sec}`
    return formattedDate
  } catch (error) {
    console.error('Could not format Error -', error)
  }
}
