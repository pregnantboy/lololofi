import React, { createContext, Dispatch, useReducer } from 'react'

import tracklist from 'assets/data/tracklist.json'

interface LofiContextState {
  isPlaying: boolean
  trackUrl: string
  trackName: string
  trackIndex: number
}

export type LofiAction =
  | { type: 'PAUSE' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'PLAY' }

interface PomoContextProps extends LofiContextState {
  dispatch: Dispatch<LofiAction>
}

const defaultState: LofiContextState = {
  isPlaying: false,
  trackUrl: tracklist[0].url,
  trackName: tracklist[0].title,
  trackIndex: 0,
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
      const newTrackIndex = prevState.trackIndex++ % tracklist.length
      return {
        ...prevState,
        trackIndex: newTrackIndex,
        trackName: tracklist[newTrackIndex].title,
        trackUrl: tracklist[newTrackIndex].url,
      }
    }
    case 'PREV': {
      let newTrackIndex = prevState.trackIndex--
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
