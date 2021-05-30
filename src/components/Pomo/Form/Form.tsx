import { ChangeEvent, useContext, useState } from 'react'

import { Button, TextInput } from 'components/common'
import { PomoContext } from 'contexts/Pomo.context'

import styles from './Form.module.scss'

const Form = () => {
  const { dispatch } = useContext(PomoContext)

  const [task, setTask] = useState('')
  const [minutes, setMinutes] = useState(25)

  const onFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (minutes > 0 && minutes <= 99 && task.length > 0) {
      Notification.requestPermission().then((result) => {
        if (result === 'granted') {
          dispatch({
            type: 'STARTED',
            payload: {
              task,
              minutes,
            },
          })
        } else {
          alert('Please allow notifications')
        }
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
      <h2>What do you want to focus on?</h2>
      <TextInput
        className={styles.textInput}
        autoFocus={true}
        value={task}
        onValueChange={setTask}
        maxLength={42}
      ></TextInput>
      <h2>For how long?</h2>
      <TextInput
        className={styles.timeInput}
        value={minutes}
        onValueChange={onMinutesChange}
      ></TextInput>
      <span>mins</span>
      <Button>Start</Button>
    </form>
  )
}

export { Form }
