import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center'>
        <Form />
      </div>
    </div>
  )
}

export default App
