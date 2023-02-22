export const timeoutSignal = (time: number) => {
  let controller = new AbortController()
  setTimeout(() => controller.abort(), time * 1000)
  return controller
}
