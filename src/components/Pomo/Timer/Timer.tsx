import { useCallback, useContext, useEffect } from 'react'
import ReactGA from 'react-ga4'
import { useBeforeUnload } from 'react-use'
import styled from 'styled-components'

import { Button } from 'components/common'
import { PomoContext } from 'contexts/Pomo.context'
import { useCountdown, useNotification } from 'hooks'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
`

const Timer = styled.p`
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

export const Timer = () => {
  const { remainingSecs, task, dispatch } = useContext(PomoContext)
  const { seconds, paused, togglePause, stop } = useCountdown(remainingSecs)
  const { displayNotification } = useNotification()
  useBeforeUnload(true, 'Do you want to quit?')

  const formattedTime = () => {
    const min = Math.floor(seconds / 60)
    let sec = `${seconds % 60}`
    if (sec.toString().length < 2) {
      sec = '0' + sec
    }
    return `${min}:${sec}`
  }

  const onStop = useCallback(
    (completed?: boolean) => {
      stop()
      dispatch({ type: completed ? 'COMPLETED' : 'READY' })
    },
    [dispatch, stop]
  )

  useEffect(() => {
    if (seconds === 0) {
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
  }, [displayNotification, onStop, seconds])

  return (
    <Container>
      <h2>{task}</h2>
      <Timer>{formattedTime()}</Timer>
      <ButtonRow>
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
      </ButtonRow>
    </Container>
  )
}