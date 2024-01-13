import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from 'src/App'
import { registerSW } from 'virtual:pwa-register'

const root = createRoot(document.getElementById('root') as Element)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

//register Service Worker
registerSW()