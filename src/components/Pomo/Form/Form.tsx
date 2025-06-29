import { type FormEvent, useCallback, useState } from 'react'
import styled from 'styled-components'

import { TIMER_DEFAULTS } from 'constants/index'

import { Button, TextInput } from 'components/common'
import { useNotification, usePomoContext } from 'hooks'

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

const FormTitle = styled.h3`
  font-size: 2.3rem;
  font-weight: normal;
  margin: 0;
`

const MinutesLabel = styled.span`
  font-size: 2rem;
  margin: 0;
`

export const Form = () => {
  const { dispatch } = usePomoContext()
  const { requestPermission } = useNotification()

  const [task, setTask] = useState('')
  const [minutes, setMinutes] = useState(TIMER_DEFAULTS.DEFAULT_MINUTES)

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (minutes > 0 && minutes <= TIMER_DEFAULTS.MAX_MINUTES) {
        requestPermission()
        dispatch({
          type: 'STARTING',
          payload: { task, minutes },
        })
      }
    },
    [minutes, task, requestPermission, dispatch],
  )

  const handleMinutesChange = useCallback((newValue: string) => {
    const parsedNumber = Number(newValue)
    if (parsedNumber >= 0 && parsedNumber <= TIMER_DEFAULTS.MAX_MINUTES) {
      setMinutes(parsedNumber)
    }
  }, [])

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormTitle>What do you want to focus on?</FormTitle>
      <TextInputStyled
        autoFocus
        value={task}
        onValueChange={setTask}
        maxLength={42}
      />
      <FormTitle>For how long?</FormTitle>
      <TimeInput
        value={minutes.toString()}
        onValueChange={handleMinutesChange}
      />
      <MinutesLabel>mins</MinutesLabel>
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
