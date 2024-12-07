
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ResetPasswordPage from './pages/ResetPassword.jsx'
import RSVPPage from './pages/RSVPPage.jsx'
import ManageEventPage from './pages/ManageEventPage'
import CreateEventPage from './pages/CreateEventPage'
import ModifyEventPage from './pages/ModifyEventPage'
import AllEventsPage from './pages/AllEventsPage'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}/> {/* Change to point to dashboard when it is implemented */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/resetpassword' element={<ResetPasswordPage />} />
        <Route path='/rsvp' element={<RSVPPage />} />
        <Route path='/createevent' element={<CreateEventPage />} />
        <Route path='/manageevent' element={<ManageEventPage />} />
        <Route path='/modifyevent' element={<ModifyEventPage />} />
        <Route path='/events' element={<AllEventsPage />} />
      </Routes>
    </Router>
  </StrictMode>,
)
