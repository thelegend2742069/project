import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { useAuthorizedStatus } from "../hooks/useAuthorizedStatus"


function RoomForm() {
    const isAuthorized = useAuthorizedStatus()
    const [roomCode, setRoomCode] = useState('')
    const [submitButton, setSubmitButton] = useState('JOIN')
    const navigate = useNavigate()
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            if (submitButton === "JOIN") {
                const res = await api.get("/api/room/", {params: {room_code: roomCode}})
                
                if (res.status = 200) {
                    if (res.data.length === 0) {
                        alert("room does not exist")

                    } else {
                        navigate(`/room/${roomCode}`)
                    }

                } else {
                    console.log(res.status)
                }
    
            } else if (submitButton === "CREATE") {
                const res = await api.post("/api/room/", {room_code: roomCode})
    
                if (res.status = 200) {
                    navigate(`/room/${roomCode}`)

                } else {
                    console.log(res.status)
                }
            }

        } catch(error) {
            alert(error)
        }
    }


    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Join</h1>
            <input 
                className="form-input"
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="enter room code"
            />
            <button 
                className="form-button" 
                type="submit" 
                onClick={() => setSubmitButton("JOIN")}
            >
                JOIN
            </button>
            <button 
                className="form-button" 
                type="submit" 
                disabled={!isAuthorized} 
                onClick={() => setSubmitButton("CREATE")}
            >
                CREATE
            </button>
        </form>
    )
}

export default RoomForm