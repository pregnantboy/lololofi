import { useContext, useEffect, useRef, useState } from 'react'

import { PomoContext } from 'contexts/Pomo.context'

import circle from 'assets/img/circle.svg'

import styles from './Breathe.module.scss'

export const Breathe = () => {
  const BREATHE_IN_DURATION = 5000
  const timerRef = useRef(0)
  const { dispatch } = useContext(PomoContext)
  const [isBreatheOut, setIsBreatheOut] = useState(false)

  useEffect(() => {
    timerRef.current = setTimeout(onBreatheOut, BREATHE_IN_DURATION)
    return () => clearTimeout(timerRef.current)
  }, [])

  function onBreatheOut() {
    setIsBreatheOut(true)
    timerRef.current = setTimeout(onNext, BREATHE_IN_DURATION)
  }

  function onNext() {
    dispatch({
      type: 'STARTED',
    })
  }

  return (
    <div className={styles.container}>
      <h2>Breathe {isBreatheOut ? 'out' : 'in'}</h2>
      {/* <img
        className={styles.circleOutline}
        src={circle}
        height={350}
        width={350}
      /> */}
      <img
        className={styles.circleExpand}
        src={circle}
        height={350}
        width={350}
      />
    </div>
  )
}
