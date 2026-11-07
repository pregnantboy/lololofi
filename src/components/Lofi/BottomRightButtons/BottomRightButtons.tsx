import { RefObject, useContext } from 'react'
import { useFullscreen, useToggle } from 'react-use'

import { ExitFullscreenIcon, FullscreenIcon } from 'components/common'
import { AppContext } from 'contexts/App.context'

import styles from './BottomRightButtons.module.scss'

export const BottomRightButtons = () => {
  const { appRef } = useContext(AppContext)
  const [show, toggle] = useToggle(false)
  const isFullscreen = useFullscreen(appRef as RefObject<Element>, show, {
    onClose: () => toggle(false),
  })

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.fullscreenBtn}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        onClick={() => toggle()}
      >
        {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
      </button>
    </div>
  )
}
