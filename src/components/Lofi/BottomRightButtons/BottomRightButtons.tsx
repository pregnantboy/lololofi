import { useToggle, useFullscreen } from 'react-use'
import styled from 'styled-components'

import { useAppContext } from 'hooks'

import { ReactComponent as ExitFullscreen } from 'assets/img/exit_fullscreen.svg'
import { ReactComponent as Fullscreen } from 'assets/img/fullscreen.svg'

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1.5rem 1rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`

const FullscreenButton = styled.button`
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BottomRightButtons = () => {
  const { appRef } = useAppContext()
  const [show, toggle] = useToggle(false)
  const isFullscreen = useFullscreen(appRef, show, {
    onClose: () => toggle(false),
  })

  return (
    <Container>
      <FullscreenButton onClick={() => toggle()}>
        {isFullscreen ? <ExitFullscreen /> : <Fullscreen />}
      </FullscreenButton>
    </Container>
  )
}