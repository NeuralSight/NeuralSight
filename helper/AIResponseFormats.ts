/**
 *
 * @param {string } confidence model pathogen confidence in the inference
 * @returns {number} percentage as a number
 */
export function formatStringDecimalToPercentage(confidence: string) {
  let float = parseFloat(confidence)

  let percentage = float * 100
  return percentage.toFixed(2)
}
