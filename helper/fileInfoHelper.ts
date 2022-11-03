/**
 *
 * @param sizeInBytes file size in bytes
 * @return size in it highest order
 */
export function calFileSizeBytesToKbsToGbs(sizeInBytes: number): string {
  const carrier = 1000 // bytes
  let size = sizeInBytes / carrier
  let labelledSize = `${size.toFixed(2)} Kb`
  if (size > carrier) {
    size /= carrier
    labelledSize = `${size.toFixed(2)} Mb`
  } else if (size > carrier) {
    size /= carrier
    labelledSize = `${size.toFixed(2)} Gb`
  }
  return labelledSize
}
