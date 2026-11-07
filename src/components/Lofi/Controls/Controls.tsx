import { useCallback, useContext, useMemo } from 'react'
import cx from 'classnames'

import { Marquee } from 'components/common'
import { LofiAction, LofiContext } from 'contexts/Lofi.context'

import Buffering from 'assets/img/loading.svg?react'
import Music from 'assets/img/music.svg?react'
import Next from 'assets/img/next.svg?react'
import Pause from 'assets/img/pause_button.svg?react'
import Play from 'assets/img/play_button.svg?react'
import Prev from 'assets/img/previous.svg?react'

import styles from './Control.module.scss'

export const Controls = () => {
  const { dispatch, isPlaying, trackName, trackUrl, isBuffering } =
    useContext(LofiContext)

  const changeState = useCallback(
    (type: Exclude<LofiAction['type'], 'VOLUME'>) => () => dispatch({ type }),
    [dispatch]
  )

  const trackMarquee = useMemo(
    () => (
      <div className={styles.marquee}>
        <Marquee paused={!isPlaying || isBuffering}>{trackName}</Marquee>
      </div>
    ),
    [isPlaying, trackName, isBuffering]
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
        {isBuffering ? (
          <Buffering className={styles.bufferingIcon} />
        ) : (
          <Music
            className={styles.musicIcon}
            onClick={() => window.open(trackUrl)}
          />
        )}
        {trackMarquee}
      </div>
    </div>
  )
}
