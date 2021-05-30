import { useContext } from 'react'
import ReactPlayer from 'react-player/youtube'

import { LofiContext } from 'contexts/Lofi.context'

export const Player = () => {
  const { trackUrl, isPlaying, volume, isMuted } = useContext(LofiContext)
  return (
    <ReactPlayer
      url={trackUrl}
      controls={false}
      width={0}
      height={0}
      playing={isPlaying}
      volume={volume}
      muted={isMuted}
    />
  )
}
