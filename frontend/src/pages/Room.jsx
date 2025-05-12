import React, { useState, useEffect, useRef } from 'react';
import TitleBar from '../components/TitleBar';
import VideoHandler from '../components/VideoHandler';
import Chat from '../components/Chat';
import '../styles/room.css'

function Room() {
    const [videoURL, setVideoURL] = useState("media/test/b99_s10e05/video.m3u8");

    const ws_url = import.meta.env.VITE_WS_URL
    const mediaSocketRef = useRef(null);

    useEffect(() => {
        mediaSocketRef.current = new WebSocket(`${ws_url}/ws/media${window.location.pathname}/`)

        mediaSocketRef.current.onmessage = (e) => {
            const media_data = JSON.parse(e.data)
            setVideoURL(media_data.path)
        }
        return () => {
            mediaSocketRef.current.close()
        }
    }, []);


    return (
        <div className='room'>
            <div className='media-container'>
                <div className='title-bar-container'>
                    <TitleBar setVideoURL={setVideoURL} />
                </div>
                <div className="video-container">
                    <VideoHandler videoURL={videoURL} setVideoURL={setVideoURL} mediaSocketRef={mediaSocketRef} />
                </div>
                
            </div>
            <div className='chat-container'>
                <Chat />
            </div>
        </div>
    )
}

export default Room;