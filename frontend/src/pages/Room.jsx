import React, { useState, useEffect } from 'react';
import TitleBar from '../components/TitleBar';
import VideoHandler from '../components/VideoHandler';

function Room() {
    const [videoURL, setVideoURL] = useState("media/test/b99_s10e05/video.m3u8");


    return (
        <div className='room'>
        <TitleBar setVideoURL={setVideoURL}/>
        <VideoHandler videoURL={videoURL} />
        </div>
    )
}

export default Room;