import { Player } from 'components/Player'
import { Pomo } from 'components/Pomo'
import { PomoContextProvider } from 'contexts/Pomo.context'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <PomoContextProvider>
          <div className={styles.pomo}>
            <Pomo />
          </div>
        </PomoContextProvider>
        <div className={styles.player}>
          <Player />
        </div>
      </div>
    </div>
  )
}

export default App
