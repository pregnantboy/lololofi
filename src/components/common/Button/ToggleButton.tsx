import { ComponentPropsWithoutRef } from 'react'
import ReactGA from 'react-ga4'
import styled from 'styled-components'

import circleUrl from 'assets/img/circle.svg?url'

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

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  isActive: boolean
  img: string
  activeImg: string
  ga?: {
    category: string
    action: string
    label?: string
  }
}

export const ToggleButton = (props: ButtonProps) => {
  const { ga, isActive, img, activeImg, onClick, ...otherProps } = props

  function onTrackedClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (ga) {
      ReactGA.event(ga)
    }
    onClick?.(e)
  }

  return (
    <StyledToggleButton
      {...otherProps}
      onClick={onTrackedClick}
    >
      <img src={isActive ? activeImg : img} height="100%" width="100%" alt="" />
    </StyledToggleButton>
  )
}