import { ComponentPropsWithoutRef } from 'react'
import ReactGA from 'react-ga4'
import styled, { css } from 'styled-components'

const buttonBase = css<{ $invert?: boolean }>`
  padding: 0.5rem 2rem;
  margin: 5px;
  min-width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${props => props.$invert ? '#e6e6e6' : 'black'};
  color: ${props => props.$invert ? 'black' : 'white'};
  border: 0;
  outline: 0;
  border-radius: 0;
  cursor: pointer;
  font-size: 2rem;
  transition: ease-out 0.1s padding, ease-out 0.1s box-shadow;
  user-select: none;

  @media (max-width: 768px) {
    min-width: 8rem;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
  }

  &:before {
    top: -5px;
    left: 0;
    border-top: 5px white solid;
    border-bottom: 5px white solid;
  }

  &:after {
    left: -5px;
    top: 0;
    border-left: 5px white solid;
    border-right: 5px white solid;
  }

  &:hover {
    background-color: ${props => props.$invert ? 'black' : 'white'};
    color: ${props => props.$invert ? '#e6e6e6' : 'black'};
    box-shadow: inset -6px -6px 0px 0px ${props => props.$invert ? '#4d4d4d' : '#e6e6e6'};
    padding: calc(0.5rem - 4px) calc(2rem + 4px) calc(0.5rem + 4px) calc(2rem - 4px);
  }

  &:active {
    box-shadow: inset 4px 4px 0px 0px ${props => props.$invert ? '#4d4d4d' : '#e6e6e6'};
    padding: calc(0.5rem + 4px) calc(2rem - 4px) calc(0.5rem - 4px) calc(2rem + 4px);
  }
`

const StyledButton = styled.button<{ $invert?: boolean }>`
  ${buttonBase}
`

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  invert?: boolean
  ga?: {
    category: string
    action: string
    label?: string
  }
}

const Button = (props: ButtonProps) => {
  const { children, invert, ga, onClick, ...otherProps } = props

  function onTrackedClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (ga) {
      ReactGA.event(ga)
    }
    onClick?.(e)
  }

  return (
    <StyledButton
      {...otherProps}
      onClick={onTrackedClick}
      $invert={invert}
    >
      {children}
    </StyledButton>
  )
}

export { Button }