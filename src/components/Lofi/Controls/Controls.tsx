import { useCallback, useMemo } from 'react'
import Marquee from 'react-double-marquee'
import styled from 'styled-components'

import { useLofiContext } from 'hooks'

import { ReactComponent as Buffering } from 'assets/img/loading.svg'
import { ReactComponent as Music } from 'assets/img/music.svg'
import { ReactComponent as Next } from 'assets/img/next.svg'
import { ReactComponent as Pause } from 'assets/img/pause_button.svg'
import { ReactComponent as Play } from 'assets/img/play_button.svg'
import { ReactComponent as Prev } from 'assets/img/previous.svg'

const Container = styled.div`
  width: 100%;
  max-width: 50vw;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`

const ControlButton = styled.button`
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  transition: ease-out 0.1s transform;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translate(-2px, -2px);
  }

  &:active {
    transform: translate(2px, 2px);
  }

  &.play,
  &.pause {
    margin: 0 1rem;
  }
`

const TrackName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  max-width: 100%;
  overflow: hidden;
  padding: 1rem 2rem;
`

const BufferingIcon = styled(Buffering)`
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 1rem;
  flex-shrink: 0;
  animation: spin 5s infinite linear;
`

const MusicIcon = styled(Music)`
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 1rem;
  flex-shrink: 0;
  cursor: pointer;
  transition: ease-out 0.1s transform;

  &:hover {
    transform: translate(-2px, -2px);
  }

  &:active {
    transform: translate(2px, 2px);
  }
`

const MarqueeContainer = styled.div`
  width: 100%;
  max-width: 400px;
  white-space: nowrap;

  span {
    font-size: 1.3rem;
    line-height: 1.3rem;
  }
`

export const Controls = () => {
  const { dispatch, isPlaying, trackName, trackUrl, isBuffering } =
    useLofiContext()

  const handleControlClick = useCallback(
    (type: 'PREV' | 'NEXT' | 'PLAY' | 'PAUSE') => () => dispatch({ type }),
    [dispatch],
  )

  const handleTrackClick = useCallback(() => {
    window.open(trackUrl, '_blank', 'noopener,noreferrer')
  }, [trackUrl])

  const trackMarquee = useMemo(
    () => (
      <MarqueeContainer>
        <Marquee
          direction="left"
          scrollWhen="always"
          speed={isPlaying && !isBuffering ? 0.03 : 0}
        >
          <span>{trackName}</span>
        </Marquee>
      </MarqueeContainer>
    ),
    [isPlaying, trackName, isBuffering],
  )

  return (
    <Container>
      <ButtonRow>
        <ControlButton onClick={handleControlClick('PREV')}>
          <Prev />
        </ControlButton>
        {isPlaying ? (
          <ControlButton
            className="pause"
            onClick={handleControlClick('PAUSE')}
          >
            <Pause />
          </ControlButton>
        ) : (
          <ControlButton className="play" onClick={handleControlClick('PLAY')}>
            <Play />
          </ControlButton>
        )}
        <ControlButton onClick={handleControlClick('NEXT')}>
          <Next />
        </ControlButton>
      </ButtonRow>
      <TrackName>
        {isBuffering ? (
          <BufferingIcon />
        ) : (
          <MusicIcon onClick={handleTrackClick} />
        )}
        {trackMarquee}
      </TrackName>
    </Container>
  )
}
