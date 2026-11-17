import { useContext } from 'react'
import cx from 'classnames'

import { AppContext } from 'contexts/App.context'
import { PomoContext } from 'contexts/Pomo.context'

import city from 'assets/img/background.webp'
import classic from 'assets/img/background-classic.gif'

import styles from './Pomo.module.scss'

export const PomoBackground = () => {
  const { state } = useContext(PomoContext)
  const { background } = useContext(AppContext)

  const shouldBlur = state === 'STARTING'

  return (
    <div
      className={cx(styles.backgroundImg, { [styles.blur]: shouldBlur })}
      style={{
        backgroundImage: `url(${background === 'city' ? city : classic})`,
      }}
    />
  )
}
