import { Form } from './components/Form'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Form onSubmit={(a) => console.log(a)}></Form>
      </div>
    </div>
  )
}

export default App
