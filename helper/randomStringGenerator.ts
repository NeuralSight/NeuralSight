/**
 * the length must be 10 or greater
 * @param {number} length this length of the string
 * @returns {string} random string
 */
export function generateRandomString(length: number): string {
  if (length >= 10) {
    const randomChars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      )
    }

    return result
  }
  return ''
}
