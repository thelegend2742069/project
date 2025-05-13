import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import '../styles/chat.css'
import { AuthContext } from '../hooks/AuthContext';


function Chat() {
    const {isAuthorized, setIsAuthorized} = useContext(AuthContext)
    const [messages, setMessages] = useState([]);
    const [username,setUsername] = useState('')
    const [messageText, setMessageText] = useState('');
    const [socket, setSocket] = useState()
    const ws_url = import.meta.env.VITE_WS_URL


    const getMessages = async () => {
        const res = await api.get(`/api${window.location.pathname}/messages/`)
        setMessages(res.data)
    }

    const handleUsername = async (e) => {
        e.preventDefault()

        setIsAuthorized(true)
        console.log(isAuthorized)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const newMessage = JSON.stringify({
                username: username,
                text: messageText
            })
            
            socket.send(newMessage)

        } catch (error) {
            console.log(error)
            alert(error)
        }
        setMessageText('')
    }
    
    useEffect(() => {
        getMessages()
        const socket = new WebSocket(`${ws_url}/ws/chat${window.location.pathname}/`)
        setSocket(socket)
        
        socket.onmessage = (e) => {
            const newMessage = JSON.parse(e.data)
            setMessages(messages => [newMessage, ...messages])
        }

        return () =>{
            socket.close()
        }
    }, []);


    return (
        <div className='chat'>
            <div className="chat-messages">
                {messages.map((message) => (<div className="message">{message.username}: {message.text}</div>))}
            </div>
            <div className='input-container'>
            { isAuthorized ?
                <div className="message-box">
                    <form onSubmit={handleSubmit} className="message-form">
                        <input 
                        className="message-input" 
                        type="text" 
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder='type something'
                        />

                        <button 
                        className="send-message-button" 
                        type='submit'
                        >
                            send
                        </button>
                    </form>
                </div> : 
                <div className="username-box">
                    <form className="username-form" onSubmit={handleUsername}>
                        <input 
                        className="username-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='enter a username'
                        />
                        <button className="username-button" type='submit'>ok</button>
                    </form>
                </div>
            }
            </div>
        </div>
    );
}

export default Chat;