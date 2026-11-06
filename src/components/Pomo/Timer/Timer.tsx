import { useCallback, useContext, useEffect, useRef } from 'react'
import ReactGA from 'react-ga4'
import { useBeforeUnload } from 'react-use'

import { Button } from 'components/common'
import { PomoContext } from 'contexts/Pomo.context'
import { useCountdown, useNotification, useSessionHistory } from 'hooks'
import { formatTime } from 'utils/time'

import styles from './Timer.module.scss'

export const Timer = () => {
  const { remainingSecs, task, minutes, dispatch } = useContext(PomoContext)
  const { seconds, paused, togglePause, stop } = useCountdown(remainingSecs)
  const { displayNotification } = useNotification()
  const { addSession } = useSessionHistory()
  useBeforeUnload(true, 'Do you want to quit?')

  // Guards against the completion effect firing twice before Timer unmounts.
  const hasCompleted = useRef(false)

  const onStop = useCallback(
    (completed?: boolean) => {
      stop()
      dispatch({ type: completed ? 'COMPLETED' : 'READY' })
    },
    [dispatch, stop]
  )

  useEffect(() => {
    if (seconds === 0 && !hasCompleted.current) {
      hasCompleted.current = true
      addSession({ task, minutes, completedAt: Date.now() })
      onStop(true)
      ReactGA.event({
        category: 'Session',
        action: 'completeSession',
      })
      displayNotification({
        title: 'lololo.fi',
        body: 'Time for a break!',
      })
    }
  }, [addSession, displayNotification, minutes, onStop, seconds, task])

  return (
    <div className={styles.container}>
      <h2>{task}</h2>
      <p className={styles.timer}>{formatTime(seconds)}</p>
      <div className={styles.buttonRow}>
        <Button
          ga={{
            category: 'Session',
            action: 'pauseSession',
          }}
          onClick={togglePause}
        >
          {paused ? 'Resume' : 'Pause'}
        </Button>
        <Button
          invert
          ga={{
            category: 'Session',
            action: 'stopSession',
          }}
          onClick={() => onStop(false)}
        >
          Stop
        </Button>
      </div>
    </div>
  )
}
