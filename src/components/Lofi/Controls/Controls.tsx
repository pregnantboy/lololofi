import { useCallback, useContext, useMemo } from 'react'
import Marquee from 'react-double-marquee'
import cx from 'classnames'

import { LofiAction, LofiContext } from 'contexts/Lofi.context'

import { ReactComponent as Buffering } from 'assets/img/loading.svg'
import { ReactComponent as Music } from 'assets/img/music.svg'
import { ReactComponent as Next } from 'assets/img/next.svg'
import { ReactComponent as Pause } from 'assets/img/pause_button.svg'
import { ReactComponent as Play } from 'assets/img/play_button.svg'
import { ReactComponent as Prev } from 'assets/img/previous.svg'

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
        <Marquee
          direction="left"
          scrollWhen="always"
          speed={isPlaying && !isBuffering ? 0.03 : 0}
        >
          <span>{trackName}</span>
        </Marquee>
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
