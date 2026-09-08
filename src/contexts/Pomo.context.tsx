import React, { createContext, Dispatch, useReducer } from 'react'

type PomoState = 'READY' | 'STARTING' | 'STARTED' | 'COMPLETED' | 'BREAK'

export const SHORT_BREAK_MINUTES = 5
export const LONG_BREAK_MINUTES = 15
export const SESSIONS_BEFORE_LONG_BREAK = 4

interface PomoContextState {
  task: string
  minutes: number
  remainingSecs: number
  state: PomoState
  /** Work sessions completed this sitting, used to schedule the long break. */
  completedSessions: number
  breakMinutes: number
}

type PomoAction =
  | { type: 'READY' }
  | { type: 'STARTING'; payload: Pick<PomoContextState, 'task' | 'minutes'> }
  | { type: 'STARTED' }
  | { type: 'COMPLETED' }
  | { type: 'BREAK' }

interface PomoContextProps extends PomoContextState {
  dispatch: Dispatch<PomoAction>
}

const defaultState: PomoContextState = {
  task: '',
  minutes: 25,
  remainingSecs: 25 * 60,
  state: 'READY',
  completedSessions: 0,
  breakMinutes: SHORT_BREAK_MINUTES,
}

export const PomoContext = createContext({} as PomoContextProps)

export const getBreakMinutes = (completedSessions: number) =>
  completedSessions > 0 && completedSessions % SESSIONS_BEFORE_LONG_BREAK === 0
    ? LONG_BREAK_MINUTES
    : SHORT_BREAK_MINUTES

const reducer = (
  prevState: PomoContextState,
  action: PomoAction
): PomoContextState => {
  switch (action.type) {
    case 'READY':
      // Keep the cycle count so the long break still lands on the 4th session.
      return {
        ...defaultState,
        completedSessions: prevState.completedSessions,
        breakMinutes: prevState.breakMinutes,
      }
    case 'STARTING': {
      const { task, minutes } = action.payload
      return {
        ...prevState,
        state: action.type,
        task,
        minutes,
        remainingSecs: minutes * 60,
      }
    }
    case 'STARTED': {
      return {
        ...prevState,
        state: action.type,
      }
    }
    case 'COMPLETED': {
      const completedSessions = prevState.completedSessions + 1
      return {
        ...prevState,
        state: action.type,
        remainingSecs: 0,
        completedSessions,
        breakMinutes: getBreakMinutes(completedSessions),
      }
    }
    case 'BREAK': {
      return {
        ...prevState,
        state: action.type,
        remainingSecs: prevState.breakMinutes * 60,
      }
    }
  }
}

export const PomoContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <PomoContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </PomoContext.Provider>
  )
}
