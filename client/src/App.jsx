import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { Toaster } from "react-hot-toast"
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextOnly'
import { Navigate } from 'react-router-dom';


import LandingPage from './pages/LandingPage'

function App() {
  const { authUser } = useContext(AuthContext)

  return (
    <div className="bg-[url('./assets/bgImage.svg')] bg-contain">
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <Navigate to="/chat" /> : <LandingPage />} />
        <Route path='/chat' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/chat" />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
