import { useContext, useMemo } from 'react'
import cx from 'classnames'

import { PomoContext } from 'contexts/Pomo.context'

import { Break } from './Break'
import { Breathe } from './Breathe'
import { Complete } from './Complete'
import { Form } from './Form'
import { Timer } from './Timer'

import styles from './Pomo.module.scss'

const Pomo = () => {
  const { state } = useContext(PomoContext)
  // The breathing exercise floats on the scene; every other state gets a panel.
  const hasPanel = state !== 'STARTING'

  const component = useMemo(() => {
    switch (state) {
      case 'READY':
        return <Form />
      case 'STARTING':
        return <Breathe />
      case 'STARTED':
        return <Timer />
      case 'COMPLETED':
        return <Complete />
      case 'BREAK':
        return <Break />
      default:
        return null
    }
  }, [state])

  return (
    <div className={styles.container}>
      <div className={cx(styles.inner, { [styles.panel]: hasPanel })}>
        {component}
      </div>
    </div>
  )
}

export { Pomo }
