import { ChangeEvent, useContext, useState } from 'react'

import { Button, TextInput } from 'components/common'
import { PomoContext } from 'contexts/Pomo.context'
import { useNotification } from 'hooks'

import { Stats } from '../Stats'

import styles from './Form.module.scss'

const Form = () => {
  const { dispatch } = useContext(PomoContext)

  const [task, setTask] = useState('')
  const [minutes, setMinutes] = useState(25)
  const { requestPermission } = useNotification()

  const onFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (minutes > 0 && minutes <= 99) {
      requestPermission()
      dispatch({
        type: 'STARTING',
        payload: {
          task,
          minutes,
        },
      })
    }
  }

  const onMinutesChange = (newVal: string) => {
    const parsedNum = +newVal
    if (parsedNum >= 0 && parsedNum <= 99) {
      setMinutes(parsedNum)
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <div className={styles.field}>
          <label htmlFor="task">What do you want to focus on?</label>
          <TextInput
            id="task"
            autoFocus={true}
            value={task}
            onValueChange={setTask}
            maxLength={42}
            placeholder="Deep work, reading, writing..."
          ></TextInput>
        </div>
        <div className={styles.field}>
          <label htmlFor="minutes">For how long?</label>
          <div className={styles.durationRow}>
            <TextInput
              id="minutes"
              className={styles.timeInput}
              inputMode="numeric"
              value={minutes}
              onValueChange={onMinutesChange}
            ></TextInput>
            <span>mins</span>
          </div>
        </div>
        <Button
          className={styles.submit}
          ga={{
            category: 'Session',
            action: 'startSession',
          }}
        >
          Start
        </Button>
      </form>
      <Stats />
    </>
  )
}

export { Form }
