import { useCallback, useContext, useEffect, useRef } from 'react'
import ReactGA from 'react-ga4'

import { Button } from 'components/common'
import { LONG_BREAK_MINUTES, PomoContext } from 'contexts/Pomo.context'
import { useCountdown, useNotification } from 'hooks'
import { formatTime } from 'utils/time'

import styles from './Break.module.scss'

export const Break = () => {
  const { remainingSecs, breakMinutes, dispatch } = useContext(PomoContext)
  const { seconds, paused, togglePause, stop } = useCountdown(remainingSecs)
  const { displayNotification } = useNotification()

  // Guards against the completion effect firing twice before Break unmounts.
  const hasEnded = useRef(false)

  const isLongBreak = breakMinutes === LONG_BREAK_MINUTES

  const onEnd = useCallback(
    (completed?: boolean) => {
      stop()
      ReactGA.event({
        category: 'Break',
        action: completed ? 'completeBreak' : 'skipBreak',
      })
      dispatch({ type: 'READY' })
    },
    [dispatch, stop]
  )

  useEffect(() => {
    if (seconds === 0 && !hasEnded.current) {
      hasEnded.current = true
      onEnd(true)
      displayNotification({
        title: 'lololo.fi',
        body: 'Break is over. Ready for another?',
      })
    }
  }, [displayNotification, onEnd, seconds])

  return (
    <div className={styles.container}>
      <h2>{isLongBreak ? 'Long break' : 'Break'}</h2>
      <p className={styles.timer}>{formatTime(seconds)}</p>
      <div className={styles.buttonRow}>
        <Button
          ga={{
            category: 'Break',
            action: 'pauseBreak',
          }}
          onClick={togglePause}
        >
          {paused ? 'Resume' : 'Pause'}
        </Button>
        <Button invert onClick={() => onEnd(false)}>
          Skip
        </Button>
      </div>
    </div>
  )
}
