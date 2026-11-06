export function formatTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60)
  const secs = `${totalSeconds % 60}`.padStart(2, '0')
  return `${mins}:${secs}`
}
