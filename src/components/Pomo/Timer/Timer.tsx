import { useContext } from 'react'

import { Button } from 'components/common'
import { PomoContext } from 'contexts/Pomo.context'
import { useCountdown } from 'hooks'

import styles from './Timer.module.scss'

export const Timer = () => {
  const { remainingSecs } = useContext(PomoContext)

  const { seconds, paused, togglePause } = useCountdown(remainingSecs)

  const formattedTime = () => {
    const min = Math.floor(seconds / 60)
    let sec = `${seconds % 60}`
    if (sec.toString().length < 2) {
      sec = '0' + sec
    }
    return `${min}:${sec}`
  }

  return (
    <div>
      <p className={styles.timer}>{formattedTime()}</p>
      <div className={styles.buttonRow}>
        <Button onClick={togglePause}>{paused ? 'Resume' : 'Pause'}</Button>
        <Button invert onClick={() => alert('stop')}>
          Stop
        </Button>
      </div>
    </div>
  )
}
