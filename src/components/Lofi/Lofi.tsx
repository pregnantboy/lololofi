import { Controls } from './Controls'
import { Player } from './Player'

import styles from './Lofi.module.scss'

export const Lofi = () => {
  return (
    <div className={styles.wrapper}>
      <Controls />
      <Player />
    </div>
  )
}
