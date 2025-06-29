import { useContext, useEffect, useRef, useState } from 'react'
import ReactGA from 'react-ga4'

import { Button } from 'components/common'
import { PomoContext } from 'contexts/Pomo.context'

import circleUrl from 'assets/img/circle.svg?url'

import styles from './Breathe.module.scss'

export const Breathe = () => {
  const BREATHE_IN_DURATION = 5000
  const timerRef = useRef<NodeJS.Timeout>()
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
      <h2>Breathe {isBreatheOut ? 'out' : 'in'}</h2>
      <img
        className={styles.circleExpand}
        src={circleUrl}
        height={350}
        width={350}
        alt="Breathing circle"
      />
      <Button className={styles.skipButton} onClick={() => onNext(true)}>
        Skip
      </Button>
    </div>
  )
}