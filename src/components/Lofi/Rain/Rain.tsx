import { useContext, useEffect, useMemo, useState } from 'react'

import { ToggleButton } from 'components/common'
import { LofiContext } from 'contexts/Lofi.context'
import { PomoContext } from 'contexts/Pomo.context'

import rain from 'assets/img/rain.png'
import rainInvert from 'assets/img/rain-invert.png'
import umbrella from 'assets/img/umbrella.png'
import umbrellaInvert from 'assets/img/umbrella-invert.png'

import styles from './Rain.module.scss'

const rainBg = '/sounds/rain.mp3'
const umbrellaBg = '/sounds/umbrella.mp3'

type RAIN_STATE = 'OFF' | 'RAIN' | 'UMBRELLA'
const DEFAULT_RAIN_VOLUME = 0.6
const DEFAULT_UMBRELLA_VOLUME = 1

export const Rain = () => {
  const [rainState, setRainState] = useState<RAIN_STATE>('OFF')

  const { state } = useContext(PomoContext)
  const { volume, isMuted } = useContext(LofiContext)

  const rainAudio = useMemo(() => {
    const audio = new Audio(rainBg)
    audio.volume = DEFAULT_RAIN_VOLUME * (volume ?? 0.5)
    audio.loop = true
    return audio
  }, [volume])
  
  const umbrellaAudio = useMemo(() => {
    const audio = new Audio(umbrellaBg)
    audio.volume = DEFAULT_UMBRELLA_VOLUME * (volume ?? 0.5)
    audio.loop = true
    return audio
  }, [volume])

  useEffect(() => {
    if (isMuted) {
      rainAudio.volume = 0
      umbrellaAudio.volume = 0
    } else {
      rainAudio.volume = DEFAULT_RAIN_VOLUME * volume
      umbrellaAudio.volume = DEFAULT_UMBRELLA_VOLUME * volume
    }
  }, [volume, isMuted, rainAudio, umbrellaAudio])

  useEffect(() => {
    if (state === 'COMPLETED') {
      setRainState('OFF')
    }
  }, [state])

  function onButtonClick(newState: RAIN_STATE) {
    if (rainState === newState) {
      rainAudio.pause()
      umbrellaAudio.pause()
      setRainState('OFF')
    } else {
      if (newState === 'RAIN') {
        umbrellaAudio.pause()
        rainAudio.play()
      } else if (newState === 'UMBRELLA') {
        rainAudio.pause()
        umbrellaAudio.play()
      }
      setRainState(newState)
    }
  }

  return (
    <div className={styles.container}>
      <ToggleButton
        onClick={() => onButtonClick('RAIN')}
        isActive={rainState === 'RAIN'}
        img={rain}
        activeImg={rainInvert}
      />
      <ToggleButton
        onClick={() => onButtonClick('UMBRELLA')}
        isActive={rainState === 'UMBRELLA'}
        img={umbrella}
        activeImg={umbrellaInvert}
      />
    </div>
  )
}