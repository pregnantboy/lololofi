import { createContext, useReducer, type ReactNode, type Dispatch } from 'react'

import { minutesToSeconds } from 'utils'
import { TIMER_DEFAULTS } from 'constants/index'

import type { PomoAction, PomoContextState } from './types'

interface PomoContextValue extends PomoContextState {
  dispatch: Dispatch<PomoAction>
}

export const PomoContext = createContext<PomoContextValue | null>(null)

const defaultState: PomoContextState = {
  task: '',
  minutes: TIMER_DEFAULTS.DEFAULT_MINUTES,
  remainingSecs: minutesToSeconds(TIMER_DEFAULTS.DEFAULT_MINUTES),
  state: 'READY',
}

const pomoReducer = (state: PomoContextState, action: PomoAction): PomoContextState => {
  switch (action.type) {
    case 'READY':
      return defaultState
    case 'STARTING': {
      const { task, minutes } = action.payload
      return {
        state: action.type,
        task,
        minutes,
        remainingSecs: minutesToSeconds(minutes),
      }
    }
    case 'STARTED':
      return {
        ...state,
        state: action.type,
      }
    case 'COMPLETED':
      return {
        ...state,
        state: action.type,
        remainingSecs: 0,
      }
    default:
      return state
  }
}

interface PomoContextProviderProps {
  children: ReactNode
}

export const PomoContextProvider = ({ children }: PomoContextProviderProps) => {
  const [state, dispatch] = useReducer(pomoReducer, defaultState)

  return (
    <PomoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PomoContext.Provider>
  )
}