import { useContext } from 'react'

import { Button } from 'components/common'
import { PomoContext } from 'contexts/Pomo.context'

import styles from './Complete.module.scss'

export const Complete = () => {
  const { task } = useContext(PomoContext)

  return (
    <div>
      <h2>{task}</h2>
      <p className={styles.subtitle}>Session Complete</p>
      <div className={styles.buttonRow}>
        <Button onClick={togglePause}>{paused ? 'Resume' : 'Pause'}</Button>
        <Button invert onClick={onStop}>
          Stop
        </Button>
      </div>
    </div>
  )
}
