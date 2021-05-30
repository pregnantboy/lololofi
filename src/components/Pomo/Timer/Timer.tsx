import { useContext } from 'react'

import { Button } from 'components/common'
import { PomoContext } from 'contexts/Pomo.context'
import { useCountdown } from 'hooks'

import styles from './Timer.module.scss'

export const Timer = () => {
  const { remainingSecs, task, dispatch } = useContext(PomoContext)
  const { seconds, paused, togglePause } = useCountdown(remainingSecs)

  const formattedTime = () => {
    const min = Math.floor(seconds / 60)
    let sec = `${seconds % 60}`
    if (sec.toString().length < 2) {
      sec = '0' + sec
    }
    return `${min}:${sec}`
  }

  const onStop = () => {
    dispatch({ type: 'READY' })
  }

  return (
    <div className={styles.container}>
      <h2>{task}</h2>
      <p className={styles.timer}>{formattedTime()}</p>
      <div className={styles.buttonRow}>
        <Button onClick={togglePause}>{paused ? 'Resume' : 'Pause'}</Button>
        <Button invert onClick={onStop}>
          Stop
        </Button>
      </div>
    </div>
  )
}
