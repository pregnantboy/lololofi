import { useMemo } from 'react'
import styled from 'styled-components'

import { usePomoContext } from 'hooks'

import { Breathe } from './Breathe'
import { Form } from './Form'
import { Timer } from './Timer'

const Container = styled.div<{ $shouldCenter: boolean; $isHidden: boolean }>`
  max-width: 450px;
  width: 100%;
  margin: ${({ $shouldCenter }) => ($shouldCenter ? 'auto' : '0')};
  display: ${({ $isHidden }) => ($isHidden ? 'none' : 'block')};

  @media (max-width: 576px) {
    margin: auto;
  }
`

export const Pomo = () => {
  const { state } = usePomoContext()
  const shouldCenter = state === 'STARTING'
  const isHidden = true // Hide the pomo UI for now

  const component = useMemo(() => {
    switch (state) {
      case 'READY':
      case 'COMPLETED':
        return <Form />
      case 'STARTING':
        return <Breathe />
      case 'STARTED':
        return <Timer />
      default:
        return null
    }
  }, [state])

  return <Container $shouldCenter={shouldCenter} $isHidden={isHidden}>{component}</Container>
}