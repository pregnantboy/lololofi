import { ComponentPropsWithoutRef } from 'react'
import cx from 'classnames'

import styles from './Button.module.scss'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  invert?: boolean
}

const Button = (props: ButtonProps) => {
  const { children, invert, className, ...otherProps } = props
  return (
    <button
      {...otherProps}
      className={cx(invert ? styles.invertButton : styles.button, className)}
    >
      {children}
    </button>
  )
}
export { Button }
