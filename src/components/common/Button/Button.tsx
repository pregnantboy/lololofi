import { ComponentPropsWithoutRef } from 'react'
import ReactGA from 'react-ga4'
import cx from 'classnames'

import styles from './Button.module.scss'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  invert?: boolean
  ga?: {
    category: string
    action: string
    label?: string
  }
}

const Button = (props: ButtonProps) => {
  const { children, invert, className, ga, onClick, ...otherProps } = props

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
      className={cx(invert ? styles.invertButton : styles.button, className)}
    >
      {children}
    </button>
  )
}
export { Button }
