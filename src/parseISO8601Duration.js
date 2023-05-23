function parseISO8601Duration(duration) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  const matches = regex.exec(duration)
  let hours = 0,
    minutes = 0,
    seconds = 0

  if (matches[1]) {
    hours = parseInt(matches[1])
  }
  if (matches[2]) {
    minutes = parseInt(matches[2])
  }
  if (matches[3]) {
    seconds = parseInt(matches[3])
  }

  return hours * 3600 + minutes * 60 + seconds
}
export default parseISO8601Duration
