import { useMemo } from 'react'
import ReactGA from 'react-ga4'

const AUDIO_FILE = '/sounds/complete4.mp3'

export const useNotification = () => {
  const sound = useMemo(() => new Audio(AUDIO_FILE), [])
  sound.volume = 0.5

  function requestPermission() {
    Notification.requestPermission()
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
        ReactGA.event({
          category: 'Notification',
          action: 'displayNotification',
        })
      } catch {
        // do nothing
      }
    } else {
      ReactGA.event({
        category: 'Notification',
        action: 'notGranted',
      })
    }
  }

  return {
    requestPermission,
    displayNotification,
  }
}
