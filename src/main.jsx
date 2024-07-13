import React from 'react'
import ReactDOM from 'react-dom/client'
import './weather.css'
import { Weather } from './Weather.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    < Weather/>
  </React.StrictMode>,
)
