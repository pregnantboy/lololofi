import {Pomo} from 'components/Pomo'
import {PomoContextProvider} from 'contexts/Pomo.context'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <PomoContextProvider>
          <Pomo />
        </PomoContextProvider>
      </div>
    </div>
  )
}

export default App
