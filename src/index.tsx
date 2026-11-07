import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'

import App from './App'
import reportWebVitals from './reportWebVitals'

import './styles/main.scss'

ReactGA.initialize('G-0R72LHG5L9')

// iOS Safari ignores user-scalable=no, so cancel its pinch gestures directly.
;['gesturestart', 'gesturechange', 'gestureend'].forEach((type) =>
  document.addEventListener(type, (e) => e.preventDefault())
)
document.addEventListener(
  'touchmove',
  (e) => {
    if (e.touches.length > 1) {
      e.preventDefault()
    }
  },
  { passive: false }
)

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
