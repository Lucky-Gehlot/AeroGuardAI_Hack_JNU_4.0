import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Header.jsx'
import AqiCard from './AqiCard.jsx'
import Home from './Home'

createRoot(document.getElementById('root')).render(
  // <Header/>
  <Home />
)
