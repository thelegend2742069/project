import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from './VideoPlayer';


function VideoHandler({videoURL, setVideoURL, mediaSocketRef}) {
    const baseURL = import.meta.env.VITE_API_URL
    const isFirstRender = useRef(true);

    
    const videojsOptions = {
        preload: "auto",
        responsive: true,
        controls: true,
        fluid: true,
        liveui: true,
        experimentalSvgIcons: true,
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
            skipButtons:{
                forward: 5,
                backward: 5
            }
        },
        userActions: {
            hotkeys: true
        },
        sources: [
            {
                src: `${baseURL}/media/test/b99_s10e05/video.m3u8`,
                type: "application/x-mpegURL"
            }
        ]

    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            console.log(baseURL)
            return
        }  

        videojsOptions.sources[0].src = `${baseURL}/${videoURL}`
        
        const media_data = JSON.stringify({
            path: videoURL,
        })

        console.log(typeof mediaSocketRef)
        if (mediaSocketRef.current.readyState === WebSocket.OPEN) {
            mediaSocketRef.current.send(media_data)
        } else {
            console.log("websocket connection not open")
            console.log(mediaSocketRef.current.readyState)
        }
    }, [videoURL]);

    return (
        <div>
            <VideoPlayer
                options={videojsOptions}
                onReady={() => {console.log("video player ready")}}
            />
        </div>
    )
}

export default VideoHandler