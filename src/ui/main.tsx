import { createRoot } from 'react-dom/client'
import { App } from './App'

const container = document.getElementById('ui-overlay')!
createRoot(container).render(<App />)