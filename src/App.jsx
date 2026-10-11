import { useState } from 'react'
import Home from './pages/Home.jsx'
import PinGate from './components/PinGate.jsx'

const KEY = 'bday:unlocked'

export default function App() {
  // Unlock lasts for the browser tab session; closing the tab asks for the PIN again.
  const [unlocked, setUnlocked] = useState(() => {
    try { return sessionStorage.getItem(KEY) === '1' } catch { return false }
  })

  const unlock = () => {
    try { sessionStorage.setItem(KEY, '1') } catch { /* ignore */ }
    window.scrollTo(0, 0)
    setUnlocked(true)
  }

  return unlocked ? <Home /> : <PinGate onUnlock={unlock} />
}
