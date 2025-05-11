import React, { useState, useEffect } from 'react';
import { useAuthorizedStatus } from '../hooks/useAuthorizedStatus';
import api from '../api';


function Chat() {
    const [isAuthorized, setIsAuthorized] = useState(useAuthorizedStatus())
    const [messages, setMessages] = useState([]);
    const [username,setUsername] = useState('')
    const [messageText, setMessageText] = useState('');

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
            console.log(`sending post request to /api${window.location.pathname}/messages/`)
            console.log(`data: text=${messageText}, username=${username}`)
            const res = await api.post(`/api${window.location.pathname}/messages/`, {text:messageText, username:username})
            console.log(res.data)
            setMessageText('')
            setMessages(messages => [...messages, res.data])
        } catch (error) {
            console.log(error)
            alert(error)
        }
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
                    <form onSubmit={handleSubmit} className="message-form">
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
    );
}

export default Chat;