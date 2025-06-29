import { useLocalStorage } from 'react-use'

interface PlayerPrefs {
  trackIndex: number
  volume: number
}

const PLAYER_PREFS_STORAGE_KEY = 'LOLOLOFI_PLAYER_PREFS'

export function usePlayerPrefs() {
  const [value, setValue] = useLocalStorage<PlayerPrefs>(
    PLAYER_PREFS_STORAGE_KEY,
    { trackIndex: 0, volume: 0.5 }
  )
  return {
    prefs: value,
    setPrefs: setValue,
  }
}