import {useContext} from 'react'

import {PomoContext} from 'contexts/Pomo.context'

import {Form} from './Form'
import {Timer} from './Timer'

const Pomo = () => {
  const {state} = useContext(PomoContext)
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
}

export {Pomo}
