import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SidebarProvider } from './Contexts/SidebarContext.jsx'
import { LoggedInUserProvider } from './Contexts/LoggedInUserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoggedInUserProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </LoggedInUserProvider>
  </StrictMode>,
)
