import { ChangeEvent, useCallback, useContext } from 'react'

import { MuteIcon, VolumeIcon } from 'components/common'
import { LofiContext } from 'contexts/Lofi.context'

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
      <button
        type="button"
        className={styles.muteBtn}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        aria-pressed={isMuted}
        onClick={onToggleMute}
      >
        {isMuted ? <MuteIcon /> : <VolumeIcon />}
      </button>
      <input
        type="range"
        aria-label="Volume"
        defaultValue={volume * 100}
        className={styles.slider}
        onChange={onVolumeChange}
      />
    </div>
  )
}
