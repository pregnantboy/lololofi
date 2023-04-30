import { Lofi } from 'components/Lofi'
import { Pomo } from 'components/Pomo'
import { AppContextProvider } from 'contexts/App.context'
import { LofiContextProvider } from 'contexts/Lofi.context'
import { PomoContextProvider } from 'contexts/Pomo.context'

import background from 'assets/img/background.gif'

import styles from './App.module.scss'

function App() {
  return (
    <AppContextProvider>
      <PomoContextProvider>
        <LofiContextProvider>
          <div className={styles.container}>
            <div className={styles.background}>
              <div
                className={styles.backgroundImg}
                style={{ backgroundImage: `url(${background})` }}
              />
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
