import { useEffect, useRef, useState, useCallback } from 'react'
import ReactGA from 'react-ga4'
import styled from 'styled-components'

import { Button } from 'components/common'
import { usePomoContext } from 'hooks'
import { TIMER_DEFAULTS } from 'constants/index'

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

const BreatheText = styled.h2`
  margin: 0;
  font-weight: normal;
  font-size: 2.5rem;
`

export const Breathe = () => {
  const timerRef = useRef<NodeJS.Timeout>()
  const { dispatch } = usePomoContext()
  const [isBreatheOut, setIsBreatheOut] = useState(false)

  const handleNext = useCallback((skip = false) => {
    ReactGA.event({
      category: 'Breathe',
      action: skip ? 'skipBreathe' : 'completeBreathe',
    })
    dispatch({ type: 'STARTED' })
  }, [dispatch])

  const handleBreatheOut = useCallback(() => {
    setIsBreatheOut(true)
    timerRef.current = setTimeout(() => handleNext(), TIMER_DEFAULTS.BREATHE_DURATION)
  }, [handleNext])

  useEffect(() => {
    timerRef.current = setTimeout(handleBreatheOut, TIMER_DEFAULTS.BREATHE_DURATION)
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [handleBreatheOut])

  return (
    <Container>
      <BreatheText>Breathe {isBreatheOut ? 'out' : 'in'}</BreatheText>
      <CircleExpand
        src={circleUrl}
        height={350}
        width={350}
        alt="Breathing circle"
      />
      <SkipButton onClick={() => handleNext(true)}>
        Skip
      </SkipButton>
    </Container>
  )
}