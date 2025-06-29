/**
 * Creates and configures an audio element
 */
export const createAudioElement = (
  src: string,
  volume = 1,
  loop = false,
): HTMLAudioElement => {
  const audio = new Audio(src)
  audio.volume = volume
  audio.loop = loop
  return audio
}

/**
 * Safely plays an audio element
 */
export const playAudio = async (audio: HTMLAudioElement): Promise<void> => {
  try {
    await audio.play()
  } catch (error) {
    console.warn('Failed to play audio:', error)
  }
}

/**
 * Safely pauses an audio element
 */
export const pauseAudio = (audio: HTMLAudioElement): void => {
  try {
    audio.pause()
  } catch (error) {
    console.warn('Failed to pause audio:', error)
  }
}
