import { RefObject, useContext } from 'react'
import { useFullscreen, useToggle } from 'react-use'

import {
  ExitFullscreenIcon,
  FullscreenIcon,
  ImageIcon,
} from 'components/common'
import { AppContext } from 'contexts/App.context'

import styles from './BottomRightButtons.module.scss'

export const BottomRightButtons = () => {
  const { appRef, background, toggleBackground } = useContext(AppContext)
  const [show, toggle] = useToggle(false)
  const isFullscreen = useFullscreen(appRef as RefObject<Element>, show, {
    onClose: () => toggle(false),
  })

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.fullscreenBtn}
        aria-label={
          background === 'city'
            ? 'Switch to classic background'
            : 'Switch to city background'
        }
        title="Switch background"
        onClick={toggleBackground}
      >
        <ImageIcon />
      </button>
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
