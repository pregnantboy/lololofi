import { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { PomoContext } from 'contexts/Pomo.context'

import { Breathe } from './Breathe'
import { Form } from './Form'
import { Timer } from './Timer'

const Container = styled.div<{ $shouldCenter: boolean }>`
  max-width: 450px;
  width: 100%;
  margin: ${props => props.$shouldCenter ? 'auto' : '0'};

  @media (max-width: 576px) {
    margin: auto;
  }
`

const Pomo = () => {
  const { state } = useContext(PomoContext)
  const shouldCenter = state === 'STARTING'

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

  return (
    <Container $shouldCenter={shouldCenter}>
      {component}
    </Container>
  )
}

export { Pomo }