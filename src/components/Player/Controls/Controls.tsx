import { ReactComponent as Next } from 'assets/img/next.svg'
import { ReactComponent as Play } from 'assets/img/play.svg'
import { ReactComponent as Prev } from 'assets/img/prev.svg'

import styles from './Control.module.scss'

export const Controls = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonRow}>
        <Prev className={styles.controlBtn} />
        <Play className={styles.controlBtn} />
        <Next className={styles.controlBtn} />
      </div>
    </div>
  )
}
