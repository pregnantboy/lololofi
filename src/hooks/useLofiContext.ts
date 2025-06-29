import { useContext } from 'react'

import { LofiContext } from 'contexts/Lofi.context'

export const useLofiContext = () => {
  const context = useContext(LofiContext)
  if (!context) {
    throw new Error('useLofiContext must be used within LofiContextProvider')
  }
  return context
}