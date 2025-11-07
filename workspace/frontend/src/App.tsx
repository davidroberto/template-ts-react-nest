import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { greetFromShared } from '@workspace/shared/test'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [sharedMessage] = useState<string>(greetFromShared('Frontend'))

  useEffect(() => {
    fetch('/api/healthcheck')
      .then(response => response.text())
      .then(data => {
        setMessage(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching message:', error)
        setMessage('Error loading message')
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <h2>Message from API:</h2>
        {loading ? <p>Loading...</p> : <p>{message}</p>}
      </div>
      <div className="card">
        <h2>Message from Shared Package:</h2>
        <p>{sharedMessage}</p>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
