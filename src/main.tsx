import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { MantineProvider } from '@mantine/core'

const strict = true

console.log(`Strict: ${strict}`)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    { strict ? 
    <React.StrictMode>
      <MantineProvider>
        <App />
      </MantineProvider>
    </React.StrictMode>
    : <>
    <MantineProvider>
        <App />
    </MantineProvider></>}
  </>
)