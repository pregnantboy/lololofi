import React from 'react'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.center}>
        <div className={styles.pokeball}>
          <div className={styles.pokeballButton}></div>
        </div>
      </header>
      <p className={styles.text}>I own this haha</p>
    </div>
  )
}

export default App
