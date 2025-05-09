import react from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import JoinRoom from "./pages/JoinRoom"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/room" element={<JoinRoom />} />
        <Route path="*" element={<NotFound />} />        
      </Routes>
    </BrowserRouter>
  )
}

export default App
