import { useState } from "react"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"


function Form({route, method}) {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const name = method === 'login' ? "Login" : "Register"

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            const res = await api.post(route, {username, password})
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
             
            }
            console.log(res.data)

        } catch(error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input 
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
            />
            <input 
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    )
}

export default Form