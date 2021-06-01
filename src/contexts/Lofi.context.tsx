import React, { createContext, Dispatch, useEffect, useReducer } from 'react'

import { usePlayerPrefs } from 'hooks'

import tracklist from 'assets/data/tracklist.json'

interface LofiContextState {
  isPlaying: boolean
  trackUrl: string
  trackName: string
  trackIndex: number
  volume: number
  isMuted: boolean
  isBuffering: boolean
}

export type LofiAction =
  | { type: 'PAUSE' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'PLAY' }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'VOLUME'; value: number }
  | { type: 'BUFFER_START' }
  | { type: 'BUFFER_END' }

interface PomoContextProps extends LofiContextState {
  dispatch: Dispatch<LofiAction>
}

const defaultState: LofiContextState = {
  isPlaying: false,
  trackUrl: tracklist[0].url,
  trackName: tracklist[0].title,
  trackIndex: 0,
  volume: 0.8,
  isMuted: false,
  isBuffering: false,
}

export const LofiContext = createContext({} as PomoContextProps)

const getTrack = (
  trackIndex?: number
): Pick<LofiContextState, 'trackIndex' | 'trackUrl' | 'trackName'> => {
  const parsedTrackIndex =
    trackIndex != null && trackIndex < tracklist.length ? trackIndex : 0
  return {
    trackIndex: parsedTrackIndex,
    trackName: tracklist[parsedTrackIndex].title,
    trackUrl: tracklist[parsedTrackIndex].url,
  }
}

const reducer = (
  prevState: LofiContextState,
  action: LofiAction
): LofiContextState => {
  switch (action.type) {
    case 'PLAY':
      return {
        ...prevState,
        isPlaying: true,
      }
    case 'PAUSE':
      return {
        ...prevState,
        isPlaying: false,
      }
    case 'NEXT': {
      const newTrackIndex = (prevState.trackIndex + 1) % tracklist.length
      return {
        ...prevState,
        ...getTrack(newTrackIndex),
      }
    }
    case 'PREV': {
      let newTrackIndex = prevState.trackIndex - 1
      if (newTrackIndex < 0) {
        newTrackIndex = tracklist.length - 1
      }
      return {
        ...prevState,
        ...getTrack(newTrackIndex),
      }
    }
    case 'VOLUME':
      return {
        ...prevState,
        volume: action.value,
      }
    case 'TOGGLE_MUTE':
      return {
        ...prevState,
        isMuted: !prevState.isMuted,
      }
    case 'BUFFER_START':
      return {
        ...prevState,
        isBuffering: true,
      }
    case 'BUFFER_END':
      return {
        ...prevState,
        isBuffering: false,
      }
  }
}

export const LofiContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { prefs, setPrefs } = usePlayerPrefs()

  const mergedDefaultState: LofiContextState = {
    ...defaultState,
    ...prefs,
    ...getTrack(prefs?.trackIndex),
  }

  const [state, dispatch] = useReducer(reducer, mergedDefaultState)

  const { trackIndex, volume } = state

  useEffect(() => {
    setPrefs({ trackIndex, volume })
  }, [trackIndex, volume, setPrefs])

  return (
    <LofiContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </LofiContext.Provider>
  )
}
