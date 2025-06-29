/**
 * Formats seconds into MM:SS format
 */
export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const paddedSeconds = seconds.toString().padStart(2, '0')
  return `${minutes}:${paddedSeconds}`
}

/**
 * Converts minutes to seconds
 */
export const minutesToSeconds = (minutes: number): number => minutes * 60
