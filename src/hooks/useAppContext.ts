import { useContext } from 'react'

import { AppContext } from 'contexts/App.context'

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider')
  }
  return context
}
