import { Controls } from './Controls'
import { Player } from './Player'
import { VolumeControl } from './VolumeControl'

import styles from './Lofi.module.scss'

export const Lofi = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}></div>
        <div className={styles.center}>
          <Controls />
        </div>
        <div className={styles.right}>
          <VolumeControl />
        </div>
      </div>
      <Player />
    </div>
  )
}
