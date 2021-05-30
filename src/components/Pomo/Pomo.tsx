import { useContext, useMemo } from 'react'

import { PomoContext } from 'contexts/Pomo.context'

import { Form } from './Form'
import { Timer } from './Timer'

import styles from './Pomo.module.scss'

const Pomo = () => {
  const { state } = useContext(PomoContext)

  const component = useMemo(() => {
    switch (state) {
      case 'READY':
        return <Form />
      case 'STARTED':
        return <Timer />
      case 'PAUSED':
        return <div>paused</div>
      case 'COMPLETED':
        return <div>good job</div>
      default:
        return null
    }
  }, [state])

  return <div className={styles.container}>{component}</div>
}

export { Pomo }
