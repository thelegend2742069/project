import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';


function VideoHandler(videoURL) {
    const baseURL = import.meta.env.VITE_API_URL
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
                src: "media/test/b99_s10e05/video.m3u8",
                type: "application/x-mpegURL"
            }
        ]

    }
    

    useEffect(() => {
        console.log(`changing source to ${videoURL.videoURL}`)
        videojsOptions.sources[0].src = `${baseURL}/${videoURL.videoURL}`
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