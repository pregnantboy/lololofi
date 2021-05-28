import { useCallback, useEffect, useRef, useState } from 'react'

export function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [paused, setPaused] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout>()

  const decreaseNum = () => setSeconds((prev) => prev - 1)

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000)

    return () => {
      if (intervalRef?.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const togglePause = useCallback(() => {
    if (!paused && intervalRef?.current) {
      clearInterval(intervalRef.current)
    } else {
      intervalRef.current = setInterval(decreaseNum, 1000)
    }
    setPaused((p) => !p)
  }, [paused])

  return { seconds, paused, togglePause }
}
