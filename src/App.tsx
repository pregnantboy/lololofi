import styled from 'styled-components'

import { Lofi } from 'components/Lofi'
import { Pomo, PomoBackground } from 'components/Pomo'
import { AppContextProvider } from 'contexts/App.context'
import { LofiContextProvider } from 'contexts/Lofi.context'
import { PomoContextProvider } from 'contexts/Pomo.context'
import { GlobalStyles } from 'styles/GlobalStyles'

const Container = styled.div`
  background-color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Background = styled.div`
  max-width: calc(1200px + 10rem);
  padding: 0 calc(1rem + 3vw);
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  position: relative;
`

const PomoSection = styled.div`
  max-width: calc(1200px - 10rem);
  z-index: 1;
  width: 100%;
  margin: auto;
`

const LofiSection = styled.div`
  max-width: 1200px;
  margin: auto;
  width: 100%;
  flex: 0 1 180px;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

function App() {
  return (
    <AppContextProvider>
      <PomoContextProvider>
        <LofiContextProvider>
          <GlobalStyles />
          <Container>
            <Background>
              <PomoBackground />
              <PomoSection>
                <Pomo />
              </PomoSection>
            </Background>
            <LofiSection>
              <Lofi />
            </LofiSection>
          </Container>
        </LofiContextProvider>
      </PomoContextProvider>
    </AppContextProvider>
  )
}

export default App