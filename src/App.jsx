import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import ProfileManager from './pages/ProfileManager.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    
     <ProfileManager/>
  
  )
}

export default App
