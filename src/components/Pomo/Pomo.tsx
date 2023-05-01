import { useContext, useMemo } from 'react'
import cx from 'classnames'

import { PomoContext } from 'contexts/Pomo.context'

import { Breathe } from './Breathe'
import { Form } from './Form'
import { Timer } from './Timer'

import styles from './Pomo.module.scss'

const Pomo = () => {
  const { state } = useContext(PomoContext)
  const shouldCenter = state === 'STARTING'

  const component = useMemo(() => {
    switch (state) {
      case 'READY':
      case 'COMPLETED':
        return <Form />
      case 'STARTING':
        return <Breathe />
      case 'STARTED':
        return <Timer />
      default:
        return null
    }
  }, [state])

  return (
    <div className={cx(styles.container, { [styles.center]: shouldCenter })}>
      {component}
    </div>
  )
}

export { Pomo }
