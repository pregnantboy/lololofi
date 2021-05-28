import {ChangeEvent,ComponentPropsWithoutRef} from 'react'
import cx from 'classnames'

import styles from './TextInput.module.scss'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  onValueChange: (val: string) => void
}

const TextInput = (props: InputProps) => {
  const {
    className, onValueChange, ...otherProps 
  } = props

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value)
  }

  return (
    <input
      type="text"
      {...otherProps}
      spellCheck="false"
      className={cx(styles.input, className)}
      onChange={onChange}
    />
  )
}

export {TextInput}
