// Common types used across the application
export interface NotificationOptions {
  title: string
  body: string
}

export interface PlayerPrefs {
  trackIndex: number
  volume: number
}

export interface Track {
  title: string
  url: string
}

export interface GAEvent {
  category: string
  action: string
  label?: string
}