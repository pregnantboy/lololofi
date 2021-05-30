import { useContext } from 'react'
import ReactPlayer from 'react-player/youtube'

import { LofiContext } from 'contexts/Lofi.context'

export const Player = () => {
  const { trackUrl, isPlaying } = useContext(LofiContext)
  return (
    <ReactPlayer
      url={trackUrl}
      controls={false}
      width={0}
      height={0}
      playing={isPlaying}
    />
  )
}
