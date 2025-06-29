import { useContext } from 'react'

import { PomoContext } from 'contexts/Pomo.context'

export const usePomoContext = () => {
  const context = useContext(PomoContext)
  if (!context) {
    throw new Error('usePomoContext must be used within PomoContextProvider')
  }
  return context
}
