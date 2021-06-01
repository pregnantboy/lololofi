import { ChangeEvent, useCallback, useContext } from 'react'

import { LofiContext } from 'contexts/Lofi.context'

import { ReactComponent as Mute } from 'assets/img/mute.svg'
import { ReactComponent as Volume } from 'assets/img/volume.svg'

import styles from './VolumeControl.module.scss'

export const VolumeControl = () => {
  const { volume, dispatch, isMuted } = useContext(LofiContext)

  const onVolumeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newVal = +event.target.value / 100
      dispatch({
        type: 'VOLUME',
        value: newVal,
      })
    },
    [dispatch]
  )
  const onToggleMute = useCallback(() => {
    dispatch({ type: 'TOGGLE_MUTE' })
  }, [dispatch])

  return (
    <div className={styles.container}>
      {isMuted ? (
        <Mute className={styles.muteBtn} onClick={onToggleMute} />
      ) : (
        <Volume className={styles.muteBtn} onClick={onToggleMute} />
      )}
      <input
        type="range"
        defaultValue={volume * 100}
        className={styles.slider}
        onInput={onVolumeChange}
      />
    </div>
  )
}
