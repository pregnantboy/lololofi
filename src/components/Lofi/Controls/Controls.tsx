import { useCallback, useContext } from 'react'

import {
  ExternalLinkIcon,
  Marquee,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  SpinnerIcon,
} from 'components/common'
import { LofiAction, LofiContext } from 'contexts/Lofi.context'

import styles from './Control.module.scss'

const Transport = () => {
  const { dispatch, isPlaying } = useContext(LofiContext)

  const changeState = useCallback(
    (type: Exclude<LofiAction['type'], 'VOLUME'>) => () => dispatch({ type }),
    [dispatch]
  )

  return (
    <div className={styles.buttonRow}>
      <button
        type="button"
        className={styles.controlBtn}
        aria-label="Previous station"
        onClick={changeState('PREV')}
      >
        <PrevIcon />
      </button>
      <button
        type="button"
        className={styles.playBtn}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        onClick={changeState(isPlaying ? 'PAUSE' : 'PLAY')}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        type="button"
        className={styles.controlBtn}
        aria-label="Next station"
        onClick={changeState('NEXT')}
      >
        <NextIcon />
      </button>
    </div>
  )
}

const NowPlaying = () => {
  const { isPlaying, trackName, trackUrl, isBuffering } =
    useContext(LofiContext)

  return (
    <div className={styles.trackName}>
      {isBuffering && (
        <SpinnerIcon className={styles.bufferingIcon} aria-label="Buffering" />
      )}
      <div className={styles.marquee} aria-live="polite">
        <Marquee paused={!isPlaying || isBuffering}>{trackName}</Marquee>
      </div>
      <a
        className={styles.sourceLink}
        href={trackUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open this stream on YouTube"
        title="Open on YouTube"
      >
        <ExternalLinkIcon />
      </a>
    </div>
  )
}

export const Controls = { Transport, NowPlaying }
