import { useLocalStorage } from 'react-use'
import type { PlayerPrefs } from 'types'

import { STORAGE_KEYS, VOLUME_DEFAULTS } from 'constants/index'

export const usePlayerPrefs = () => {
  const [prefs, setPrefs] = useLocalStorage<PlayerPrefs>(
    STORAGE_KEYS.PLAYER_PREFS,
    {
      trackIndex: 0,
      volume: VOLUME_DEFAULTS.PLAYER,
    },
  )

  return { prefs, setPrefs }
}
