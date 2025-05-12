import React, { useState, useEffect } from 'react';
import TitleBar from '../components/TitleBar';
import VideoHandler from '../components/VideoHandler';
import Chat from '../components/Chat';
import '../styles/room.css'

function Room() {
    const [videoURL, setVideoURL] = useState("media/test/b99_s10e05/video.m3u8");

    useEffect(() => {
        console.log("room mounted")

        return () => {
            console.log("room unmounted")
        }
    }, []);
    return (
        <div className='room'>
            <div className='media-container'>
                <div className='title-bar-container'>
                    <TitleBar setVideoURL={setVideoURL} />
                </div>
                <div className="video-container">
                    <VideoHandler videoURL={videoURL} />
                </div>
                
            </div>
            <div className='chat-container'>
                <Chat />
            </div>
        </div>
    )
}

export default Room;