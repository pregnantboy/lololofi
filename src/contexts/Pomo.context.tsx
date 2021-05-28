import React, { createContext, Dispatch, useReducer } from 'react'

type PomoState = 'READY' | 'STARTED' | 'PAUSED' | 'COMPLETED'

interface PomoContextState {
  task: string
  minutes: number
  remainingSecs: number
  state: PomoState
}

type PomoAction =
  | { type: 'READY' }
  | { type: 'STARTED'; payload: Pick<PomoContextState, 'task' | 'minutes'> }
  | { type: 'PAUSED'; payload: Pick<PomoContextState, 'remainingSecs'> }
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
    case 'STARTED': {
      const { task, minutes } = action.payload
      return {
        state: action.type,
        task,
        minutes,
        remainingSecs: minutes * 60,
      }
    }
    case 'PAUSED': {
      const { remainingSecs } = action.payload
      return {
        ...prevState,
        state: action.type,
        remainingSecs,
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
