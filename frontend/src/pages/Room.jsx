import React, { useState, useEffect } from 'react';
import TitleBar from '../components/TitleBar';
import VideoHandler from '../components/VideoHandler';

function Room() {
    const [videoURL, setVideoURL] = useState('');


    return (
        <div className='room'>
        <TitleBar setVideo={setVideoURL}/>
        <VideoHandler videoURL={videoURL} />
        </div>
    )
}

export default Room;