import { useContext } from 'react'
import { Form } from './Form'
import { PomoContext } from 'contexts/Pomo.context'

const Pomo = () => {
  const { state } = useContext(PomoContext)
  switch (state) {
    case 'READY':
      return <Form />
    case 'STARTED':
      return <div>timer</div>
    case 'PAUSED':
      return <div>paused</div>
    case 'COMPLETED':
      return <div>good job</div>
    default:
      return null
  }
}

export { Pomo }
