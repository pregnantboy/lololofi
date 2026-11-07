import { useCallback, useContext, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

import { LofiAction, LofiContext } from 'contexts/Lofi.context'

import styles from './Player.module.scss'

export const Player = () => {
  const {
    trackUrl,
    trackName,
    isPlaying,
    volume,
    isMuted,
    dispatch,
    trackCount,
  } = useContext(LofiContext)

  const playerRef = useRef<HTMLVideoElement>(null)

  const changeState = useCallback(
    (type: Exclude<LofiAction['type'], 'VOLUME'>) => () => dispatch({ type }),
    [dispatch]
  )

  // Swapping `src` tears down the old media (which fires a stray `pause`) and
  // loads a new one that starts paused. While switching, ignore that pause and
  // resume the new media ourselves once it can play.
  const isPlayingRef = useRef(isPlaying)
  isPlayingRef.current = isPlaying
  const isSwitching = useRef(false)
  const lastUrl = useRef(trackUrl)

  if (lastUrl.current !== trackUrl) {
    lastUrl.current = trackUrl
    isSwitching.current = true
  }

  const resumeIfSwitching = useCallback(() => {
    if (!isSwitching.current || !isPlayingRef.current) {
      return
    }
    playerRef.current?.play()?.catch(() => {
      // Autoplay was blocked, the user can press play again.
    })
  }, [])

  const onPause = useCallback(() => {
    if (isSwitching.current) {
      return
    }
    dispatch({ type: 'PAUSE' })
  }, [dispatch])

  // A dead stream skips to the next one, but if every track fails (offline, or
  // YouTube unreachable) stop rather than cycling the list forever.
  const consecutiveErrors = useRef(0)

  // `onPlay` fires when playback is requested, so only `onPlaying` (media is
  // actually advancing) proves a stream works.
  const onPlaying = useCallback(() => {
    consecutiveErrors.current = 0
    isSwitching.current = false
    dispatch({ type: 'BUFFER_END' })
  }, [dispatch])

  const onError = useCallback(() => {
    consecutiveErrors.current += 1
    if (consecutiveErrors.current >= trackCount) {
      isSwitching.current = false
      dispatch({ type: 'PAUSE' })
      return
    }
    dispatch({ type: 'NEXT' })
  }, [dispatch, trackCount])

  // Let the user retry the whole list after pressing play again.
  useEffect(() => {
    if (isPlaying) {
      consecutiveErrors.current = 0
    }
  }, [isPlaying])

  // Surface the current track in OS media controls (lock screen, media keys,
  // headphone buttons).
  useEffect(() => {
    if (!('mediaSession' in navigator)) {
      return
    }
    navigator.mediaSession.metadata = new MediaMetadata({
      title: trackName,
      artist: 'lololo.fi',
      artwork: [{ src: '/logo192.png', sizes: '192x192', type: 'image/png' }],
    })
  }, [trackName])

  useEffect(() => {
    if (!('mediaSession' in navigator)) {
      return
    }
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'
  }, [isPlaying])

  useEffect(() => {
    if (!('mediaSession' in navigator)) {
      return
    }
    const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
      ['play', () => dispatch({ type: 'PLAY' })],
      ['pause', () => dispatch({ type: 'PAUSE' })],
      ['nexttrack', () => dispatch({ type: 'NEXT' })],
      ['previoustrack', () => dispatch({ type: 'PREV' })],
    ]

    handlers.forEach(([action, handler]) => {
      try {
        navigator.mediaSession.setActionHandler(action, handler)
      } catch {
        // Action unsupported by this browser, skip it.
      }
    })

    return () => {
      handlers.forEach(([action]) => {
        try {
          navigator.mediaSession.setActionHandler(action, null)
        } catch {
          // Nothing to clean up if it was never registered.
        }
      })
    }
  }, [dispatch])

  // The YouTube embed is a custom element that ignores the width/height props
  // and renders its own 300x150 iframe, so it is clipped off-screen instead of
  // `display: none`, which browsers may throttle or refuse to play.
  return (
    <div className={styles.hidden} aria-hidden="true">
      <ReactPlayer
        ref={playerRef}
        src={trackUrl}
        controls={false}
        width={0}
        height={0}
        playing={isPlaying}
        onPlay={changeState('PLAY')}
        onPause={onPause}
        onLoadStart={resumeIfSwitching}
        onLoadedData={resumeIfSwitching}
        onCanPlay={resumeIfSwitching}
        volume={volume}
        muted={isMuted}
        onWaiting={changeState('BUFFER_START')}
        onPlaying={onPlaying}
        onError={onError}
      />
    </div>
  )
}
