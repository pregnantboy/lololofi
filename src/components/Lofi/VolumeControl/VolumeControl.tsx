import { ChangeEvent, useCallback, useContext } from 'react'
import styled from 'styled-components'

import { LofiContext } from 'contexts/Lofi.context'

import { ReactComponent as Mute } from 'assets/img/mute.svg'
import { ReactComponent as Volume } from 'assets/img/volume.svg'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const MuteButton = styled.div`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
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
    <Container>
      <MuteButton onClick={onToggleMute}>
        {isMuted ? <Mute /> : <Volume />}
      </MuteButton>
      <Slider
        type="range"
        defaultValue={volume * 100}
        onInput={onVolumeChange}
      />
    </Container>
  )
}