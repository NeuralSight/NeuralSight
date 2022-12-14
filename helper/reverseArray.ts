export function reverse(array: any[]): any[] {
  const newArray: any[] = []
  for (let i = array.length - 1; i >= 0; i--) {
    newArray.push(array[i])
  }
  return newArray
}
