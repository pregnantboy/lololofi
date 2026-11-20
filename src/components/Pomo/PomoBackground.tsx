import { useContext } from 'react'
import cx from 'classnames'

import { AppContext } from 'contexts/App.context'
import { PomoContext } from 'contexts/Pomo.context'

import city from 'assets/img/background.gif'
import classic from 'assets/img/background-classic.gif'
import cityPoster from 'assets/img/background-poster.webp'

import styles from './Pomo.module.scss'

export const PomoBackground = () => {
  const { state } = useContext(PomoContext)
  const { background } = useContext(AppContext)

  const shouldBlur = state === 'STARTING'

  return (
    <div
      className={cx(styles.backgroundImg, { [styles.blur]: shouldBlur })}
      style={{
        // The small still frame sits underneath and shows instantly while the
        // larger animated GIF downloads on top of it.
        backgroundImage:
          background === 'city'
            ? `url(${city}), url(${cityPoster})`
            : `url(${classic})`,
      }}
    />
  )
}
