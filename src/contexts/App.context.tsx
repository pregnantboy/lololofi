import {
  createContext,
  type MutableRefObject,
  type ReactNode,
  useRef,
} from 'react'

interface AppContextValue {
  appRef: MutableRefObject<HTMLDivElement | null>
}

export const AppContext = createContext<AppContextValue | null>(null)

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const appRef = useRef<HTMLDivElement | null>(null)

  return (
    <AppContext.Provider value={{ appRef }}>
      <div ref={appRef}>{children}</div>
    </AppContext.Provider>
  )
}
