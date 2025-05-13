import React, { useState, useEffect, useRef, useContext } from 'react';
import TitleBar from '../components/TitleBar';
import VideoHandler from '../components/VideoHandler';
import Chat from '../components/Chat';
import '../styles/room.css'
import { AuthContext } from '../hooks/AuthContext';

function Room() {
    const mediaSocketRef = useRef(null);
    const playerRef = useRef(null);
    const videoRef = useRef(null);
    const { isAuthorized, setIsAuthorized } = useContext(AuthContext)
    const [videoURL, setVideoURL] = useState("media/test/b99_s10e05/video.m3u8");
    const ws_url = import.meta.env.VITE_WS_URL
    

    useEffect(() => {
        mediaSocketRef.current = new WebSocket(`${ws_url}/ws/media${window.location.pathname}/`)

        mediaSocketRef.current.onmessage = (e) => {
            const media_data = JSON.parse(e.data)
            if (media_data.method === 'change_src') setVideoURL(media_data.path)
            else if (media_data.method === 'play') {
                console.log("received play")
                playerRef.current.play()
                playerRef.current.currentTime(media_data.timestamp)
            }
            else if (media_data.method === 'pause') {
                console.log("received pause")
                playerRef.current.pause()
                playerRef.current.currentTime(media_data.timestamp)
            }
            // else if (media_data.method === 'seeked') playerRef.current.currentTime(media_data.timestamp)
            else if (media_data.method === 'ratechange') {
                console.log("received ratechange")
                playerRef.current.playbackRate(media_data.playback_rate)
            }
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
                    <VideoHandler 
                        videoURL={videoURL} 
                        setVideoURL={setVideoURL} 
                        mediaSocketRef={mediaSocketRef} 
                        playerRef={playerRef}
                        videoRef={videoRef}
                    />
                </div>
                
            </div>
            <div className='chat-container'>
                <Chat />
            </div>
        </div>
    )
}

export default Room;