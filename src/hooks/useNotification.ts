import { useCallback, useMemo } from 'react'

const AUDIO_FILE = '/complete5.mp3'

export const useNotification = () => {
  const sound = useMemo(() => new Audio(AUDIO_FILE), [])
  sound.volume = 0.5

  function requestPermission() {
    Notification.requestPermission((status) => {
      console.log('Notification permission status:', status)
    })
  }

  function displayNotification({
    title,
    body,
  }: {
    title: string
    body: string
  }) {
    sound.play()
    const options = {
      body,
      icon: '/logo96.png',
      vibrate: [100, 50, 100],
      // silent: false,
    }
    if (Notification.permission === 'granted') {
      try {
        new Notification(title, options)
      } catch {
        // do nothing
      }
    }
  }

  return {
    requestPermission,
    displayNotification,
  }
}
