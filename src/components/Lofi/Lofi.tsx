import styled from 'styled-components'

import { isIos, isIphone } from 'utils'

import { BottomRightButtons } from './BottomRightButtons'
import { Controls } from './Controls'
import { Player } from './Player'
import { Rain } from './Rain'
import { VolumeControl } from './VolumeControl'

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 2rem;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    display: flex;
    margin: auto;
    max-width: 500px;
  }
`

const Center = styled.div`
  width: 100%;
  flex: 0 3 300px;

  @media (max-width: 768px) {
    flex: 1;
    flex-basis: 100%;
    order: 1;
  }
`

const Left = styled.div`
  width: auto;
  flex: 0 2 200px;

  @media (max-width: 768px) {
    flex: 1;
    flex-basis: 0;
    order: 2;
  }
`

const Right = styled.div`
  width: auto;
  flex: 0 1 200px;
  min-width: 180px;

  @media (max-width: 768px) {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    order: 3;
  }
`

export const Lofi = () => {
  return (
    <Wrapper>
      <Container>
        <Left>
          <Rain />
        </Left>
        <Center>
          <Controls />
        </Center>
        {!isIphone && (
          <Right>
            {!isIos && <VolumeControl />}
            <BottomRightButtons />
          </Right>
        )}
      </Container>
      <Player />
    </Wrapper>
  )
}
