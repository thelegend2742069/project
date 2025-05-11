import React, { useState } from 'react';

function Card({setVideoURL, setOpen, upload, onDelete, key}) {

    const handleClick = () => {
        setVideoURL.setVideoURL(upload.path)
        setOpen(false)
    }
    console.log(typeof setVideoURL)
    return (
        <div className='video-card'>
            <div className="video-thumbnail" onClick={handleClick}>
                {upload.title}                
            </div>
            <button className="delete-upload" onClick={() => onDelete(key)}>
                delete
            </button>
        </div>
    );
}

export default Card;