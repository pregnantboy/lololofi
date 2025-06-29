import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { AUDIO_FILES, VOLUME_DEFAULTS } from 'constants/index'

import { ToggleButton } from 'components/common'
import type { RainState } from 'contexts/types'
import { useLofiContext, usePomoContext } from 'hooks'
import { createAudioElement, pauseAudio, playAudio } from 'utils'

import rain from 'assets/img/rain.png'
import rainInvert from 'assets/img/rain-invert.png'
import umbrella from 'assets/img/umbrella.png'
import umbrellaInvert from 'assets/img/umbrella-invert.png'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: auto;

  button {
    margin-right: 1rem;
  }
`

export const Rain = () => {
  const [rainState, setRainState] = useState<RainState>('OFF')
  const { state: pomoState } = usePomoContext()
  const { volume, isMuted } = useLofiContext()

  const rainAudio = useMemo(
    () =>
      createAudioElement(
        AUDIO_FILES.RAIN,
        VOLUME_DEFAULTS.RAIN * (volume ?? 0.5),
        true,
      ),
    [volume],
  )

  const umbrellaAudio = useMemo(
    () =>
      createAudioElement(
        AUDIO_FILES.UMBRELLA,
        VOLUME_DEFAULTS.UMBRELLA * (volume ?? 0.5),
        true,
      ),
    [volume],
  )

  // Update audio volumes when volume or mute state changes
  useEffect(() => {
    const newVolume = isMuted ? 0 : volume
    rainAudio.volume = VOLUME_DEFAULTS.RAIN * newVolume
    umbrellaAudio.volume = VOLUME_DEFAULTS.UMBRELLA * newVolume
  }, [volume, isMuted, rainAudio, umbrellaAudio])

  // Stop rain when pomodoro completes
  useEffect(() => {
    if (pomoState === 'COMPLETED') {
      setRainState('OFF')
      pauseAudio(rainAudio)
      pauseAudio(umbrellaAudio)
    }
  }, [pomoState, rainAudio, umbrellaAudio])

  const handleButtonClick = useCallback(
    async (newState: RainState) => {
      if (rainState === newState) {
        // Turn off current state
        pauseAudio(rainAudio)
        pauseAudio(umbrellaAudio)
        setRainState('OFF')
      } else {
        // Switch to new state
        if (newState === 'RAIN') {
          pauseAudio(umbrellaAudio)
          await playAudio(rainAudio)
        } else if (newState === 'UMBRELLA') {
          pauseAudio(rainAudio)
          await playAudio(umbrellaAudio)
        }
        setRainState(newState)
      }
    },
    [rainState, rainAudio, umbrellaAudio],
  )

  return (
    <Container>
      <ToggleButton
        onClick={() => handleButtonClick('RAIN')}
        isActive={rainState === 'RAIN'}
        img={rain}
        activeImg={rainInvert}
      />
      <ToggleButton
        onClick={() => handleButtonClick('UMBRELLA')}
        isActive={rainState === 'UMBRELLA'}
        img={umbrella}
        activeImg={umbrellaInvert}
      />
    </Container>
  )
}
