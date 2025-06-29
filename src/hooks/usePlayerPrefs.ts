import { useLocalStorage } from 'react-use'

import { STORAGE_KEYS, VOLUME_DEFAULTS } from 'constants/index'
import type { PlayerPrefs } from 'types'

export const usePlayerPrefs = () => {
  const [prefs, setPrefs] = useLocalStorage<PlayerPrefs>(
    STORAGE_KEYS.PLAYER_PREFS,
    { 
      trackIndex: 0, 
      volume: VOLUME_DEFAULTS.PLAYER 
    }
  )

  return { prefs, setPrefs }
}