import react from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import JoinRoom from "./pages/JoinRoom"
import Room from "./pages/Room"
import './App.css'
import { AuthProvider } from "./hooks/AuthContext"

function App() {

  return (
    
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/room" element={<JoinRoom />} />
          <Route path="/room/*" element={<Room />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
