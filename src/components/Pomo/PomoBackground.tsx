import { useContext } from 'react'
import cx from 'classnames'

import { PomoContext } from 'contexts/Pomo.context'

import background from 'assets/img/background.gif'

import styles from './Pomo.module.scss'

export const PomoBackground = () => {
  const { state } = useContext(PomoContext)

  const shouldBlur = state === 'STARTING'

  return (
    <div
      className={cx(styles.backgroundImg, { [styles.blur]: shouldBlur })}
      style={{ backgroundImage: `url(${background})` }}
    />
  )
}
