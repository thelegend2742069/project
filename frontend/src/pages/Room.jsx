import React, { useState, useEffect } from 'react';
import TitleBar from '../components/TitleBar';

function Room() {
    const [videoURL, setVideoURL] = useState('');


    return (<TitleBar setVideo={setVideoURL}/>);
}

export default Room;