import React, { createContext, Dispatch, useReducer } from 'react'

type PomoState = 'READY' | 'STARTING' | 'STARTED' | 'COMPLETED'

interface PomoContextState {
  task: string
  minutes: number
  remainingSecs: number
  state: PomoState
}

type PomoAction =
  | { type: 'READY' }
  | { type: 'STARTING'; payload: Pick<PomoContextState, 'task' | 'minutes'> }
  | { type: 'STARTED' }
  | { type: 'COMPLETED' }

interface PomoContextProps extends PomoContextState {
  dispatch: Dispatch<PomoAction>
}

const defaultState: PomoContextState = {
  task: '',
  minutes: 25,
  remainingSecs: 25 * 60,
  state: 'READY',
}

export const PomoContext = createContext({} as PomoContextProps)

const reducer = (
  prevState: PomoContextState,
  action: PomoAction
): PomoContextState => {
  switch (action.type) {
    case 'READY':
      return defaultState
    case 'STARTING': {
      const { task, minutes } = action.payload
      return {
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
      return {
        ...prevState,
        state: action.type,
        remainingSecs: 0,
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
