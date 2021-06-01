import { useCallback, useContext } from 'react'
import ReactPlayer from 'react-player/youtube'

import { LofiAction, LofiContext } from 'contexts/Lofi.context'

export const Player = () => {
  const { trackUrl, isPlaying, volume, isMuted, dispatch } =
    useContext(LofiContext)

  const changeState = useCallback(
    (type: Exclude<LofiAction['type'], 'VOLUME'>) => () => dispatch({ type }),
    [dispatch]
  )
  return (
    <ReactPlayer
      url={trackUrl}
      controls={false}
      width={0}
      height={0}
      playing={isPlaying}
      onPlay={changeState('PLAY')}
      onPause={changeState('PAUSE')}
      volume={volume}
      muted={isMuted}
      onBuffer={changeState('BUFFER_START')}
      onBufferEnd={changeState('BUFFER_END')}
    />
  )
}
