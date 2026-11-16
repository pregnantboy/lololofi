import { createContext, useRef } from 'react'

import { BackgroundId, useBackgroundPref } from 'hooks'

interface AppContextState {
  appRef: React.RefObject<HTMLDivElement | null>
  background: BackgroundId
  toggleBackground: () => void
}

export const AppContext = createContext({} as AppContextState)

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const appRef = useRef<HTMLDivElement>(null)
  const { background, toggleBackground } = useBackgroundPref()

  return (
    <AppContext.Provider value={{ appRef, background, toggleBackground }}>
      <div ref={appRef}>{children}</div>
    </AppContext.Provider>
  )
}
