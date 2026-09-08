import { useContext } from 'react'

import { Button } from 'components/common'
import { LONG_BREAK_MINUTES, PomoContext } from 'contexts/Pomo.context'

import styles from './Complete.module.scss'

export const Complete = () => {
  const { task, breakMinutes, completedSessions, dispatch } =
    useContext(PomoContext)

  const isLongBreak = breakMinutes === LONG_BREAK_MINUTES

  return (
    <div className={styles.container}>
      <h2>Nice work!</h2>
      {task && <p className={styles.task}>{task}</p>}
      <p className={styles.count}>
        {completedSessions} session{completedSessions === 1 ? '' : 's'} this
        sitting
      </p>
      <p className={styles.prompt}>
        {isLongBreak ? 'Time for a long break' : 'Take a breather'}
      </p>
      <div className={styles.buttonRow}>
        <Button
          ga={{
            category: 'Break',
            action: isLongBreak ? 'startLongBreak' : 'startShortBreak',
          }}
          onClick={() => dispatch({ type: 'BREAK' })}
        >
          {breakMinutes} min break
        </Button>
        <Button
          invert
          ga={{
            category: 'Break',
            action: 'skipBreak',
          }}
          onClick={() => dispatch({ type: 'READY' })}
        >
          Skip
        </Button>
      </div>
    </div>
  )
}
