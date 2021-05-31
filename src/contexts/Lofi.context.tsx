import React, { createContext, Dispatch, useReducer } from 'react'

import tracklist from 'assets/data/tracklist.json'

interface LofiContextState {
  isPlaying: boolean
  trackUrl: string
  trackName: string
  trackIndex: number
  volume: number
  isMuted: boolean
}

export type LofiAction =
  | { type: 'PAUSE' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'PLAY' }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'VOLUME'; value: number }

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
}

export const LofiContext = createContext({} as PomoContextProps)

const reducer = (
  prevState: LofiContextState,
  action: LofiAction
): LofiContextState => {
  switch (action.type) {
    case 'PLAY':
      return { ...prevState, isPlaying: true }
    case 'PAUSE':
      return { ...prevState, isPlaying: false }
    case 'NEXT': {
      const newTrackIndex = (prevState.trackIndex + 1) % tracklist.length
      return {
        ...prevState,
        trackIndex: newTrackIndex,
        trackName: tracklist[newTrackIndex].title,
        trackUrl: tracklist[newTrackIndex].url,
      }
    }
    case 'PREV': {
      let newTrackIndex = prevState.trackIndex - 1
      if (newTrackIndex < 0) {
        newTrackIndex = tracklist.length - 1
      }
      return {
        ...prevState,
        trackIndex: newTrackIndex,
        trackName: tracklist[newTrackIndex].title,
        trackUrl: tracklist[newTrackIndex].url,
      }
    }
    case 'VOLUME':
      return { ...prevState, volume: action.value }
    case 'TOGGLE_MUTE':
      return { ...prevState, isMuted: !prevState.isMuted }
  }
}

export const LofiContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

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
