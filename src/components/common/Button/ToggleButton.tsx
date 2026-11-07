import { ComponentPropsWithoutRef, ReactNode } from 'react'
import ReactGA from 'react-ga4'
import cx from 'classnames'

import styles from './ToggleButton.module.scss'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  isActive: boolean
  icon: ReactNode
  label: string
  ga?: {
    category: string
    action: string
    label?: string
  }
}

export const ToggleButton = (props: ButtonProps) => {
  const { ga, isActive, icon, label, onClick, className, ...otherProps } = props

  function onTrackedClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (ga) {
      ReactGA.event(ga)
    }
    onClick?.(e)
  }

  return (
    <button
      type="button"
      {...otherProps}
      onClick={onTrackedClick}
      aria-label={label}
      title={label}
      aria-pressed={isActive}
      className={cx(styles.toggleButton, className)}
    >
      {icon}
    </button>
  )
}
