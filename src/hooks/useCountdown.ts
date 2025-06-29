import { useCallback, useEffect, useRef, useState } from 'react'

interface UseCountdownReturn {
  seconds: number
  paused: boolean
  togglePause: () => void
  stop: () => void
}

export const useCountdown = (initialSeconds: number): UseCountdownReturn => {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()

  const decreaseSeconds = useCallback(() => {
    setSeconds(prev => Math.max(0, prev - 1))
  }, [])

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(decreaseSeconds, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [paused, decreaseSeconds])

  const togglePause = useCallback(() => {
    setPaused(prev => !prev)
  }, [])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setPaused(true)
  }, [])

  return { seconds, paused, togglePause, stop }
}