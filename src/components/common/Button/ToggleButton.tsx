import { ComponentPropsWithoutRef } from 'react'
import ReactGA from 'react-ga4'
import cx from 'classnames'

import circleUrl from 'assets/img/circle.svg?url'

import styles from './ToggleButton.module.scss'

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
    <button
      {...otherProps}
      onClick={onTrackedClick}
      className={cx(styles.toggleButton)}
      style={{
        backgroundImage: `url(${circleUrl})`,
      }}
    >
      <img src={isActive ? activeImg : img} height="100%" width="100%" alt="" />
    </button>
  )
}