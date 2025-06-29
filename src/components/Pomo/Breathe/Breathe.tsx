import { useContext, useEffect, useRef, useState } from 'react'
import ReactGA from 'react-ga4'
import styled from 'styled-components'

import { Button } from 'components/common'
import { PomoContext } from 'contexts/Pomo.context'

import circleUrl from 'assets/img/circle.svg?url'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  opacity: 0;
  height: 450px;
  animation: fadeIn 1s ease-out forwards, fadeOut 1s ease-in forwards 9s;
`

const CircleExpand = styled.img`
  position: absolute;
  max-width: 100%;
  width: 350px;
  height: 350px;
  animation: circleExpand 10s ease-in-out forwards;
`

const SkipButton = styled(Button)`
  position: absolute;
  bottom: -1rem;
`

export const Breathe = () => {
  const BREATHE_IN_DURATION = 5000
  const timerRef = useRef<NodeJS.Timeout>()
  const { dispatch } = useContext(PomoContext)
  const [isBreatheOut, setIsBreatheOut] = useState(false)

  useEffect(() => {
    timerRef.current = setTimeout(onBreatheOut, BREATHE_IN_DURATION)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  function onBreatheOut() {
    setIsBreatheOut(true)
    timerRef.current = setTimeout(onNext, BREATHE_IN_DURATION)
  }

  function onNext(skip?: boolean) {
    ReactGA.event({
      category: 'Breathe',
      action: skip ? 'skipBreathe' : 'completeBreathe',
    })
    dispatch({
      type: 'STARTED',
    })
  }

  return (
    <Container>
      <h2>Breathe {isBreatheOut ? 'out' : 'in'}</h2>
      <CircleExpand
        src={circleUrl}
        height={350}
        width={350}
        alt="Breathing circle"
      />
      <SkipButton onClick={() => onNext(true)}>
        Skip
      </SkipButton>
    </Container>
  )
}