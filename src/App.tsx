import { Lofi } from 'components/Lofi'
import { Pomo } from 'components/Pomo'
import { LofiContextProvider } from 'contexts/Lofi.context'
import { PomoContextProvider } from 'contexts/Pomo.context'

import background from 'assets/img/background.gif'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.container}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className={styles.pomo}>
          <PomoContextProvider>
            <Pomo />
          </PomoContextProvider>
        </div>
      </div>
      <div className={styles.lofi}>
        <LofiContextProvider>
          <Lofi />
        </LofiContextProvider>
      </div>
    </div>
  )
}

export default App
