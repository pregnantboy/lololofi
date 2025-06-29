import { 
  createContext, 
  useContext, 
  useEffect, 
  useReducer, 
  type ReactNode, 
  type Dispatch 
} from 'react'

import { usePlayerPrefs } from 'hooks'
import tracklist from 'assets/data/tracklist.json'

import { PomoContext } from './Pomo.context'
import type { LofiAction, LofiContextState } from './types'

interface LofiContextValue extends LofiContextState {
  dispatch: Dispatch<LofiAction>
}

export const LofiContext = createContext<LofiContextValue | null>(null)

const defaultState: LofiContextState = {
  isPlaying: false,
  trackUrl: tracklist[0].url,
  trackName: tracklist[0].title,
  trackIndex: 0,
  volume: 0.5,
  isMuted: false,
  isBuffering: false,
}

const getTrack = (trackIndex = 0) => {
  const validIndex = trackIndex < tracklist.length ? trackIndex : 0
  return {
    trackIndex: validIndex,
    trackName: tracklist[validIndex].title,
    trackUrl: tracklist[validIndex].url,
  }
}

const lofiReducer = (state: LofiContextState, action: LofiAction): LofiContextState => {
  switch (action.type) {
    case 'PLAY':
      return { ...state, isPlaying: true }
    case 'PAUSE':
      return { ...state, isPlaying: false }
    case 'NEXT': {
      const newTrackIndex = (state.trackIndex + 1) % tracklist.length
      return { ...state, ...getTrack(newTrackIndex) }
    }
    case 'PREV': {
      const newTrackIndex = state.trackIndex - 1 < 0 
        ? tracklist.length - 1 
        : state.trackIndex - 1
      return { ...state, ...getTrack(newTrackIndex) }
    }
    case 'VOLUME':
      return { ...state, volume: action.value }
    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted }
    case 'BUFFER_START':
      return { ...state, isBuffering: true }
    case 'BUFFER_END':
      return { ...state, isBuffering: false }
    default:
      return state
  }
}

interface LofiContextProviderProps {
  children: ReactNode
}

export const LofiContextProvider = ({ children }: LofiContextProviderProps) => {
  const { prefs, setPrefs } = usePlayerPrefs()
  const pomoContext = useContext(PomoContext)

  const mergedDefaultState: LofiContextState = {
    ...defaultState,
    ...prefs,
    ...getTrack(prefs?.trackIndex),
  }

  const [state, dispatch] = useReducer(lofiReducer, mergedDefaultState)

  // Persist preferences
  useEffect(() => {
    setPrefs({ trackIndex: state.trackIndex, volume: state.volume })
  }, [state.trackIndex, state.volume, setPrefs])

  // Pause music when pomodoro completes
  useEffect(() => {
    if (pomoContext?.state === 'COMPLETED') {
      dispatch({ type: 'PAUSE' })
    }
  }, [pomoContext?.state])

  return (
    <LofiContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LofiContext.Provider>
  )
}