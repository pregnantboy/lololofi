import styled from 'styled-components'

import { usePomoContext } from 'hooks'

import background from 'assets/img/background.gif'

const BackgroundImage = styled.div<{ $shouldBlur: boolean }>`
  height: 100%;
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${background});
  transition: filter 1s linear;
  filter: ${({ $shouldBlur }) => $shouldBlur ? 'blur(10px)' : 'none'};
  opacity: ${({ $shouldBlur }) => $shouldBlur ? '0.5' : '1'};
`

export const PomoBackground = () => {
  const { state } = usePomoContext()
  const shouldBlur = state === 'STARTING'

  return <BackgroundImage $shouldBlur={shouldBlur} />
}