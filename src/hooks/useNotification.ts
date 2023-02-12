import { useCallback, useEffect } from 'react'

const PUBLIC_URL = import.meta.env.PUBLIC_URL
const AUDIO_FILE = PUBLIC_URL + '/complete5.mp3'
const sound = new Audio(AUDIO_FILE)

export const useNotification = () => {
  const unlockAudio = useCallback(() => {
    sound.play()
    sound.pause()
    sound.currentTime = 0
    document.body.removeEventListener('click', unlockAudio)
    document.body.removeEventListener('touchstart', unlockAudio)
  }, [])

  useEffect(() => {
    document.body.addEventListener('click', unlockAudio)
    document.body.addEventListener('touchstart', unlockAudio)
    registerSw()
  }, [unlockAudio])

  function registerSw() {
    if (navigator.serviceWorker) {
      // Display the UI to let the user toggle notifications
      navigator.serviceWorker
        .register(PUBLIC_URL + '/service-worker.js')
        .then((reg) => {
          console.log(`Service Worker Registered! ${reg}`)
        })
        .catch((err) => {
          console.log(`Service Worker registration failed: ${err}`)
        })
    }
  }

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
      icon: PUBLIC_URL + '/logo96.png',
      vibrate: [100, 50, 100],
      // silent: false,
    }
    if (Notification.permission === 'granted') {
      try {
        new Notification(title, options)
      } catch (_) {
        try {
          navigator.serviceWorker
            .getRegistration()
            .then((reg: ServiceWorkerRegistration | undefined) => {
              if (reg?.showNotification) {
                reg?.showNotification(title, options)
              }
            })
        } catch (_) {
          // do nothing
        }
      }
    }
  }

  return {
    requestPermission,
    displayNotification,
  }
}
