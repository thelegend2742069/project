import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

function VideoHandler(videoURL) {
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
                src: "http://localhost:8000/media/test/b99_s10e05/video.m3u8",
                type: "application/x-mpegURL"
            }
        ]

    }

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