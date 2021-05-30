import { useCallback, useContext } from 'react'
import cx from 'classnames'

import { LofiAction, LofiContext } from 'contexts/Lofi.context'

import { ReactComponent as Next } from 'assets/img/next.svg'
import { ReactComponent as Pause } from 'assets/img/pause_button.svg'
import { ReactComponent as Play } from 'assets/img/play_button.svg'
import { ReactComponent as Prev } from 'assets/img/previous.svg'

import styles from './Control.module.scss'

export const Controls = () => {
  const { dispatch, isPlaying, trackName, trackUrl } = useContext(LofiContext)

  const changeState = useCallback(
    (type: LofiAction['type']) => () => dispatch({ type }),
    [dispatch]
  )

  return (
    <div className={styles.container}>
      <div className={styles.buttonRow}>
        <Prev
          className={cx(styles.controlBtn, styles.prev)}
          onClick={changeState('PREV')}
        />
        {isPlaying ? (
          <Pause
            className={cx(styles.controlBtn, styles.pause)}
            onClick={changeState('PAUSE')}
          />
        ) : (
          <Play
            className={cx(styles.controlBtn, styles.play)}
            onClick={changeState('PLAY')}
          />
        )}
        <Next
          className={cx(styles.controlBtn, styles.next)}
          onClick={changeState('NEXT')}
        />
      </div>
      <div className={styles.trackName}>
        <p></p>
      </div>
    </div>
  )
}
