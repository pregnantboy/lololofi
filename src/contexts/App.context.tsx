import { createContext, useRef } from 'react'

interface AppContextState {
  appRef: React.MutableRefObject<null>
}

export const AppContext = createContext({} as AppContextState)

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const appRef = useRef(null)

  return (
    <AppContext.Provider value={{ appRef }}>
      <div ref={appRef}>{children}</div>
    </AppContext.Provider>
  )
}
