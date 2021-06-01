import { useLocalStorage } from 'react-use'

interface PlayerPrefs {
  trackIndex: number
  volume: number
}

const PLAYER_PREFS_STORAGE_KEY = 'LOLOLOFI_PLAYER_PREFS'

export function usePlayerPrefs() {
  const [value, setValue] = useLocalStorage(
    PLAYER_PREFS_STORAGE_KEY,
    {} as PlayerPrefs
  )
  return {
    prefs: value,
    setPrefs: setValue,
  }
}
