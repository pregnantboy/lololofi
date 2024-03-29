import { ChangeEvent, useContext, useState } from 'react'

import { Button, TextInput } from 'components/common'
import { PomoContext } from 'contexts/Pomo.context'
import { useNotification } from 'hooks'

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
    <form className={styles.form} onSubmit={onFormSubmit}>
      <h3>What do you want to focus on?</h3>
      <TextInput
        className={styles.textInput}
        autoFocus={true}
        value={task}
        onValueChange={setTask}
        maxLength={42}
      ></TextInput>
      <h3>For how long?</h3>
      <TextInput
        className={styles.timeInput}
        value={minutes}
        onValueChange={onMinutesChange}
      ></TextInput>
      <span>mins</span>
      <Button
        ga={{
          category: 'Session',
          action: 'startSession',
        }}
      >
        Start
      </Button>
    </form>
  )
}

export { Form }
