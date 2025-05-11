import React, { useState, useEffect } from 'react';
import { useAuthorizedStatus } from '../hooks/useAuthorizedStatus';
import api from '../api';


function Chat() {
    const isAuthorized = useAuthorizedStatus()
    const [messages, setMessages] = useState([]);
    const [username,setUsername] = useState('')
    const [messageText, setMessageText] = useState('');

    const getMessages = async () => {
        const res = await api.get(`/api${window.location.pathname}/messages/`)
        setMessages(res.data)
    }

    const handleSend = async () => {
        try{
            console.log(`sending post request to /api${window.location.pathname}/messages/`)
            console.log(`data: text=${messageText}, username=${username || "guest"}`)
            const res = await api.post(`/api${window.location.pathname}/messages/`, {text:messageText, username:username||"guest"})
            console.log(res.data)
        } catch (error) {
            console.log(error)
            alert(error)
        }
        setMessageText('')
    }

    useEffect(() => {
        getMessages()
    }, []);


    return (
        <div className='chat'>
            <div className="chat-messages">
                {messages.map((message) => (<div className="message">{message.username}: {message.text}</div>))}
            </div>
            
            { isAuthorized ?
                <div className="message-box">
                    <input 
                    className="message-input" 
                    type="text" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder='type something'
                    />

                    <button 
                    className="send-message" 
                    type='submit'
                    onClick={handleSend}
                    >
                        send
                    </button>
                </div> : 
                <div className="username">
                    <input 
                    className="username-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='enter a username'
                    />
                </div>
            }
        </div>
    );
}

export default Chat;