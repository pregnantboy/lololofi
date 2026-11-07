import { createContext, useRef } from 'react'

interface AppContextState {
  appRef: React.RefObject<HTMLDivElement | null>
}

export const AppContext = createContext({} as AppContextState)

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const appRef = useRef<HTMLDivElement>(null)

  return (
    <AppContext.Provider value={{ appRef }}>
      <div ref={appRef}>{children}</div>
    </AppContext.Provider>
  )
}
