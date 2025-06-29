// Application constants
export const STORAGE_KEYS = {
  PLAYER_PREFS: 'LOLOLOFI_PLAYER_PREFS',
} as const

export const AUDIO_FILES = {
  NOTIFICATION: '/sounds/complete4.mp3',
  RAIN: '/sounds/rain.mp3',
  UMBRELLA: '/sounds/umbrella.mp3',
} as const

export const VOLUME_DEFAULTS = {
  RAIN: 0.6,
  UMBRELLA: 1.0,
  NOTIFICATION: 0.5,
  PLAYER: 0.5,
} as const

export const TIMER_DEFAULTS = {
  BREATHE_DURATION: 5000,
  DEFAULT_MINUTES: 25,
  MAX_MINUTES: 99,
} as const

export const GA_TRACKING_ID = 'G-0R72LHG5L9'