import React, { createContext, Dispatch, useReducer } from 'react'

interface LofiContextState {
  isPlaying: boolean
  trackUrl: string
  trackName: string
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
  trackUrl: 'https://www.youtube.com/watch?v=P8j-_MOSrec',
  trackName:
    'STUDIO GHIBLI MUSIC 24/7 ~ Relaxing Music for Sleep & Study スタジオジブリ音楽',
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
    case 'NEXT':
      return { ...prevState }
    case 'PREV':
      return { ...prevState }
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
