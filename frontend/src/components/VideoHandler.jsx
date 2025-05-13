import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from './VideoPlayer';


function VideoHandler({videoURL, setVideoURL, mediaSocketRef, playerRef, videoRef}) {
    const baseURL = import.meta.env.VITE_API_URL
    const isFirstRender = useRef(true);

    function onPlay () {
        console.log('media played')
        const media_data = JSON.stringify({
            method: "play",
            path: videoURL,
            timestamp: videoRef.current?.lastChild.player.children_[0].currentTime,
            playback_rate: videoRef.current?.lastChild.player.children_[0].playbackRate,
        })
        
        if (mediaSocketRef.current.readyState === WebSocket.OPEN) mediaSocketRef.current.send(media_data)
        console.log('media data sent via websockets')
    }

    const onPause = () => {
        const media_data = JSON.stringify({
            method: "pause",
            path: videoURL,
            timestamp: videoRef.current?.lastChild.player.children_[0].currentTime,
            playback_rate: videoRef.current?.lastChild.player.children_[0].playbackRate,
        })
        
        mediaSocketRef.current.send(media_data)

    }

    const onSeek = () => {
        const media_data = JSON.stringify({
            method: "seeked",
            path: videoURL,
            timestamp: videoRef.current?.lastChild.player.children_[0].currentTime,
            playback_rate: videoRef.current?.lastChild.player.children_[0].playbackRate,
        })
        
        mediaSocketRef.current.send(media_data)
    }

    const onRateChange = () => {
        const media_data = JSON.stringify({
            method: "rate_change",
            path: videoURL,
            timestamp: videoRef.current?.lastChild.player.children_[0].currentTime,
            playback_rate: videoRef.current?.lastChild.player.children_[0].playbackRate,
        })
        
        mediaSocketRef.current.send(media_data)
    }

    const playerTrackingOff = () => {
        playerRef.current.off('play')
        playerRef.current.off('pause')
        playerRef.current.off('seeked')
        playerRef.current.off('rate change')
    }
    
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
        console.log('video handler mounted')
        if (isFirstRender.current) {
            isFirstRender.current = false
            console.log(baseURL)
            return
        }  

        videojsOptions.sources[0].src = `${baseURL}/${videoURL}`
        
        playerRef.current.on('play', () => {onPlay()})
        playerRef.current.on('pause', () => {onPause()})
        // playerRef.current.on('seeked', () => {onSeek()})
        playerRef.current.on('ratechange', () => {onRateChange()})

        
        if (mediaSocketRef.current.readyState === WebSocket.OPEN) {
            const media_data = JSON.stringify({
                method: "change_src",
                path: videoURL,
                timestamp: 0,
                playback_rate: 1,
            })

            mediaSocketRef.current.send(media_data)
        } else {
            console.log("websocket connection not open")
            console.log(mediaSocketRef.current.readyState)
        }

        return () => {
            console.log("video handler unmounted");     
            playerTrackingOff()
        }
    }, [videoURL]);

    return (
        <div>
            <VideoPlayer
                options={videojsOptions}
                onReady={() => {console.log("video player ready")}}
                playerRef={playerRef}
                videoRef={videoRef}
            />
        </div>
    )
}

export default VideoHandler