import { isIos, isIphone } from 'utils/userAgent'

import { BottomRightButtons } from './BottomRightButtons'
import { Controls } from './Controls'
import { Player } from './Player'
import { Rain } from './Rain'
import { VolumeControl } from './VolumeControl'

import styles from './Lofi.module.scss'

export const Lofi = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Rain />
        </div>
        <div className={styles.center}>
          <Controls />
        </div>
        {!isIphone && (
          <div className={styles.right}>
            {!isIos && <VolumeControl />}
            <BottomRightButtons />
          </div>
        )}
      </div>
      <Player />
    </div>
  )
}
