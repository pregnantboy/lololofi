import { useContext, useEffect, useRef, useState } from 'react'
import ReactGA from 'react-ga4'

import { Button } from 'components/common'
import { PomoContext } from 'contexts/Pomo.context'

import styles from './Breathe.module.scss'

export const Breathe = () => {
  const BREATHE_IN_DURATION = 5000
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const { dispatch } = useContext(PomoContext)
  const [isBreatheOut, setIsBreatheOut] = useState(false)

  useEffect(() => {
    timerRef.current = setTimeout(onBreatheOut, BREATHE_IN_DURATION)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  function onBreatheOut() {
    setIsBreatheOut(true)
    timerRef.current = setTimeout(onNext, BREATHE_IN_DURATION)
  }

  function onNext(skip?: boolean) {
    ReactGA.event({
      category: 'Breathe',
      action: skip ? 'skipBreathe' : 'completeBreathe',
    })
    dispatch({
      type: 'STARTED',
    })
  }

  return (
    <div className={styles.container}>
      <h2 aria-live="polite">Breathe {isBreatheOut ? 'out' : 'in'}</h2>
      <div className={styles.circle} aria-hidden="true" />
      <Button invert className={styles.skipButton} onClick={() => onNext(true)}>
        Skip
      </Button>
    </div>
  )
}
