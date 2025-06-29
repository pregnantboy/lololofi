import { ChangeEvent, useContext, useState } from 'react'
import styled from 'styled-components'

import { Button, TextInput } from 'components/common'
import { PomoContext } from 'contexts/Pomo.context'
import { useNotification } from 'hooks'

const StyledForm = styled.form`
  max-width: 100%;
  padding: 2rem 0;

  input {
    margin-top: 0.5rem;
    margin-bottom: 5vh;
  }
`

const TimeInput = styled(TextInput)`
  max-width: 5rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
`

const TextInputStyled = styled(TextInput)`
  width: 100%;
`

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
    <StyledForm onSubmit={onFormSubmit}>
      <h3>What do you want to focus on?</h3>
      <TextInputStyled
        autoFocus={true}
        value={task}
        onValueChange={setTask}
        maxLength={42}
      />
      <h3>For how long?</h3>
      <TimeInput
        value={minutes}
        onValueChange={onMinutesChange}
      />
      <span>mins</span>
      <Button
        ga={{
          category: 'Session',
          action: 'startSession',
        }}
      >
        Start
      </Button>
    </StyledForm>
  )
}

export { Form }