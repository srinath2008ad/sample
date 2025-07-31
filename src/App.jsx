import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Navbar from './components/navbar'
import Navbar from './components/navbar/navbar.jsx'
import { BrowserRouter } from 'react-router-dom'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )
}

export default App
