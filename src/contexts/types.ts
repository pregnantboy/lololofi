// Context-specific types
export type PomoState = 'READY' | 'STARTING' | 'STARTED' | 'COMPLETED'

export interface PomoContextState {
  task: string
  minutes: number
  remainingSecs: number
  state: PomoState
}

export type PomoAction =
  | { type: 'READY' }
  | { type: 'STARTING'; payload: Pick<PomoContextState, 'task' | 'minutes'> }
  | { type: 'STARTED' }
  | { type: 'COMPLETED' }

export interface LofiContextState {
  isPlaying: boolean
  trackUrl: string
  trackName: string
  trackIndex: number
  volume: number
  isMuted: boolean
  isBuffering: boolean
}

export type LofiAction =
  | { type: 'PAUSE' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'PLAY' }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'VOLUME'; value: number }
  | { type: 'BUFFER_START' }
  | { type: 'BUFFER_END' }

export type RainState = 'OFF' | 'RAIN' | 'UMBRELLA'