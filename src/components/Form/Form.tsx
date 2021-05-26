import { useState, ChangeEvent } from 'react'
import { Button, TextInput } from 'components/common'

import styles from './Form.module.scss'

interface FormProps {
  onSubmit: ({ task, time }: { task: string; time: number }) => void
}

const Form = ({ onSubmit }: FormProps) => {
  const [task, setTask] = useState('')
  const [time, setTime] = useState(25)

  const onFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (time > 0 && time <= 99 && task.length > 0) {
      console.log('here')
      onSubmit({ task, time })
    }
  }

  const onTimeChange = (newVal: string) => {
    let parsedNum = +newVal
    if (parsedNum >= 0 && parsedNum <= 99) {
      setTime(parsedNum)
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
      ></TextInput>
      <h2>For how long</h2>
      <TextInput
        className={styles.timeInput}
        value={time}
        onValueChange={onTimeChange}
      ></TextInput>
      <span>mins</span>
      <Button>Start</Button>
    </form>
  )
}

export { Form }
