import { useMemo, useCallback } from 'react'
import ReactGA from 'react-ga4'

import { AUDIO_FILES, VOLUME_DEFAULTS } from 'constants/index'
import { createAudioElement, playAudio } from 'utils'
import type { NotificationOptions } from 'types'

export const useNotification = () => {
  const sound = useMemo(() => 
    createAudioElement(AUDIO_FILES.NOTIFICATION, VOLUME_DEFAULTS.NOTIFICATION), 
    []
  )

  const requestPermission = useCallback(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  const displayNotification = useCallback(async ({ title, body }: NotificationOptions) => {
    await playAudio(sound)
    
    const options: NotificationOptions & { 
      icon?: string
      vibrate?: number[]
    } = {
      title,
      body,
      icon: '/logo96.png',
      vibrate: [100, 50, 100],
    }

    if (!('Notification' in window)) {
      ReactGA.event({
        category: 'Notification',
        action: 'notSupported',
      })
      return
    }

    if (Notification.permission === 'granted') {
      try {
        new Notification(title, options)
        ReactGA.event({
          category: 'Notification',
          action: 'displayNotification',
        })
      } catch (error) {
        console.warn('Failed to display notification:', error)
      }
    } else {
      ReactGA.event({
        category: 'Notification',
        action: 'notGranted',
      })
    }
  }, [sound])

  return { requestPermission, displayNotification }
}