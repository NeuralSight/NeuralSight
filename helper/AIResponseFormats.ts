/**
 *
 * @param {string } confidence model pathogen confidence in the inference
 * @returns {number} percentage as a string
 */
export function formatStringDecimalToPercentage(confidence: string): string {
  let float = parseFloat(confidence)

  let percentage = float * 100
  return percentage.toFixed(2)
}
