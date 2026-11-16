import { useLocalStorage } from 'react-use'

export type BackgroundId = 'city' | 'classic'

const BACKGROUND_STORAGE_KEY = 'LOLOLOFI_BACKGROUND'

export function useBackgroundPref() {
  const [value, setValue] = useLocalStorage<BackgroundId>(
    BACKGROUND_STORAGE_KEY,
    'city'
  )
  // Anything unexpected in storage falls back to the default.
  const background: BackgroundId = value === 'classic' ? 'classic' : 'city'
  return {
    background,
    toggleBackground: () =>
      setValue(background === 'city' ? 'classic' : 'city'),
  }
}
