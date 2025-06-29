import { useCallback, useEffect } from 'react'
import ReactGA from 'react-ga4'
import { useBeforeUnload } from 'react-use'
import styled from 'styled-components'

import { Button } from 'components/common'
import { useCountdown, useNotification, usePomoContext } from 'hooks'
import { formatTime } from 'utils'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
`

const StyledTimerText = styled.p`
  font-size: 8rem;
  margin: 3rem 0;
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;

  button {
    margin: 0 1rem 3rem;
  }
`

const TaskTitle = styled.h2`
  margin: 0;
  font-weight: normal;
  font-size: 2.5rem;
`

export const Timer = () => {
  const { remainingSecs, task, dispatch } = usePomoContext()
  const { seconds, paused, togglePause, stop } = useCountdown(remainingSecs)
  const { displayNotification } = useNotification()

  useBeforeUnload(true, 'Do you want to quit?')

  const handleStop = useCallback(
    (completed = false) => {
      stop()
      dispatch({ type: completed ? 'COMPLETED' : 'READY' })
    },
    [dispatch, stop],
  )

  const handlePauseToggle = useCallback(() => {
    ReactGA.event({
      category: 'Session',
      action: 'pauseSession',
    })
    togglePause()
  }, [togglePause])

  const handleStopClick = useCallback(() => {
    ReactGA.event({
      category: 'Session',
      action: 'stopSession',
    })
    handleStop(false)
  }, [handleStop])

  useEffect(() => {
    if (seconds === 0) {
      handleStop(true)
      ReactGA.event({
        category: 'Session',
        action: 'completeSession',
      })
      displayNotification({
        title: 'lololo.fi',
        body: 'Time for a break!',
      })
    }
  }, [displayNotification, handleStop, seconds])

  return (
    <Container>
      <TaskTitle>{task}</TaskTitle>
      <StyledTimerText>{formatTime(seconds)}</StyledTimerText>
      <ButtonRow>
        <Button onClick={handlePauseToggle}>
          {paused ? 'Resume' : 'Pause'}
        </Button>
        <Button invert onClick={handleStopClick}>
          Stop
        </Button>
      </ButtonRow>
    </Container>
  )
}
