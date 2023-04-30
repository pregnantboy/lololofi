import { Lofi } from 'components/Lofi'
import { Pomo, PomoBackground } from 'components/Pomo'
import { AppContextProvider } from 'contexts/App.context'
import { LofiContextProvider } from 'contexts/Lofi.context'
import { PomoContextProvider } from 'contexts/Pomo.context'

import styles from './App.module.scss'

function App() {
  return (
    <AppContextProvider>
      <PomoContextProvider>
        <LofiContextProvider>
          <div className={styles.container}>
            <div className={styles.background}>
              <PomoBackground />
              <div className={styles.pomo}>
                <Pomo />
              </div>
            </div>
            <div className={styles.lofi}>
              <Lofi />
            </div>
          </div>
        </LofiContextProvider>
      </PomoContextProvider>
    </AppContextProvider>
  )
}

export default App
