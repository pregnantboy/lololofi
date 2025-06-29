import { useCallback } from 'react'
import ReactPlayer from 'react-player/youtube'

import { useLofiContext } from 'hooks'

export const Player = () => {
  const { trackUrl, isPlaying, volume, isMuted, dispatch } = useLofiContext()

  const handleStateChange = useCallback(
    (type: 'PLAY' | 'PAUSE' | 'BUFFER_START' | 'BUFFER_END') => () =>
      dispatch({ type }),
    [dispatch],
  )

  return (
    <ReactPlayer
      url={trackUrl}
      controls={false}
      width={0}
      height={0}
      playing={isPlaying}
      onPlay={handleStateChange('PLAY')}
      onPause={handleStateChange('PAUSE')}
      volume={volume}
      muted={isMuted}
      onBuffer={handleStateChange('BUFFER_START')}
      onBufferEnd={handleStateChange('BUFFER_END')}
    />
  )
}
