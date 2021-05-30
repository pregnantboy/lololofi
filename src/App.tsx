import { Lofi } from 'components/Lofi'
import { Pomo } from 'components/Pomo'
import { LofiContextProvider } from 'contexts/Lofi.context'
import { PomoContextProvider } from 'contexts/Pomo.context'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.pomo}>
          <PomoContextProvider>
            <Pomo />
          </PomoContextProvider>
        </div>
        <div className={styles.lofi}>
          <LofiContextProvider>
            <Lofi />
          </LofiContextProvider>
        </div>
      </div>
    </div>
  )
}

export default App
