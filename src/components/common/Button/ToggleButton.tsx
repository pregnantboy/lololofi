import { type ComponentPropsWithoutRef, type MouseEvent } from 'react'
import ReactGA from 'react-ga4'
import styled from 'styled-components'

import circleUrl from 'assets/img/circle.svg?url'
import type { GAEvent } from 'types'

const StyledToggleButton = styled.button`
  height: 3rem;
  width: 3rem;
  margin: 2px;
  padding: 0.5rem;
  background: transparent;
  background-size: cover;
  overflow: visible;
  cursor: pointer;
  user-select: none;
  transition: ease-out 0.1s transform;
  background-image: url(${circleUrl});

  &:hover {
    transform: translate(-2px, -2px);
  }

  &:active {
    transform: translate(2px, 2px);
  }

  img {
    height: 100%;
    width: 100%;
  }
`

interface ToggleButtonProps extends ComponentPropsWithoutRef<'button'> {
  isActive: boolean
  img: string
  activeImg: string
  ga?: GAEvent
}

export const ToggleButton = ({ 
  ga, 
  isActive, 
  img, 
  activeImg, 
  onClick, 
  ...otherProps 
}: ToggleButtonProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (ga) {
      ReactGA.event(ga)
    }
    onClick?.(event)
  }

  return (
    <StyledToggleButton {...otherProps} onClick={handleClick}>
      <img 
        src={isActive ? activeImg : img} 
        height="100%" 
        width="100%" 
        alt="" 
      />
    </StyledToggleButton>
  )
}