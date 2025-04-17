//ArgentBank-app\src\index.jsx
//import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import './css/main.css'
//import reportWebVitals from './reportWebVitals'
// REDUX
import { Provider } from 'react-redux'
import Store from './redux/store.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <StrictMode>
      <App />
    </StrictMode>,
  </Provider>
)
//reportWebVitals();