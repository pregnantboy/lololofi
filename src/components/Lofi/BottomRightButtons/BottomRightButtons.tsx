import { RefObject, useContext } from 'react'
import { useFullscreen, useToggle } from 'react-use'

import { AppContext } from 'contexts/App.context'

import ExitFullscreen from 'assets/img/exit_fullscreen.svg?react'
import Fullscreen from 'assets/img/fullscreen.svg?react'

import styles from './BottomRightButtons.module.scss'

export const BottomRightButtons = () => {
  const { appRef } = useContext(AppContext)
  const [show, toggle] = useToggle(false)
  const isFullscreen = useFullscreen(appRef as RefObject<Element>, show, {
    onClose: () => toggle(false),
  })

  return (
    <div className={styles.container}>
      {isFullscreen ? (
        <ExitFullscreen
          className={styles.fullscreenBtn}
          onClick={() => toggle()}
        />
      ) : (
        <Fullscreen className={styles.fullscreenBtn} onClick={() => toggle()} />
      )}
    </div>
  )
}
