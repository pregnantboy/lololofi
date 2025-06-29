import { type ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'

import { useLofiContext } from 'hooks'

import { ReactComponent as Mute } from 'assets/img/mute.svg'
import { ReactComponent as Volume } from 'assets/img/volume.svg'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const MuteButton = styled.button`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Slider = styled.input`
  height: 1.5rem;
  padding: 0 1rem;
  -webkit-appearance: none;
  width: 100%;
  max-width: 200px;
  background: transparent;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0.5rem;
    height: 1.5rem;
    background: #ffffff;
    cursor: pointer;
    margin-top: -0.5rem;
  }

  &::-moz-range-thumb {
    width: 0.5rem;
    height: 1.5rem;
    background: #ffffff;
    cursor: pointer;
    border: none;
  }

  &::-ms-thumb {
    height: 1.5rem;
    width: 0.5rem;
    background: #ffffff;
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    max-width: 200px;
    height: 0.8rem;
    cursor: pointer;
    border: 2px solid white;
  }

  &::-moz-range-track {
    width: 100%;
    max-width: 200px;
    height: 0.8rem;
    cursor: pointer;
    border: 2px solid white;
  }

  &::-ms-fill-lower {
    border: 2px solid white;
  }

  &::-ms-fill-upper {
    border: 2px solid white;
  }
`

export const VolumeControl = () => {
  const { volume, dispatch, isMuted } = useLofiContext()

  const handleVolumeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value) / 100
      dispatch({ type: 'VOLUME', value: newValue })
    },
    [dispatch]
  )

  const handleToggleMute = useCallback(() => {
    dispatch({ type: 'TOGGLE_MUTE' })
  }, [dispatch])

  return (
    <Container>
      <MuteButton onClick={handleToggleMute}>
        {isMuted ? <Mute /> : <Volume />}
      </MuteButton>
      <Slider
        type="range"
        defaultValue={volume * 100}
        onInput={handleVolumeChange}
      />
    </Container>
  )
}