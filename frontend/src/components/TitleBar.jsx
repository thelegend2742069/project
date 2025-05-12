import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'
import api from '../api';
import Card from './Card';
import '../styles/titlebar.css'

function TitleBar(setVideoURL) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [open, setOpen] = useState(false);
    const [video, setVideo] = useState(undefined);
    const [title, setTitle] = useState('');
    const [uploads, setUploads] = useState([])
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleUpload = (e) => setVideo(e.target.files[0])
    const formData = new FormData()


    const handleSubmit = async (e) => {
        e.preventDefault()
        formData.append("title", title)
        formData.append("video", video)

        console.log("sending POST request")
        const res = await api.post(`/api${window.location.pathname}/video/`, formData)
        console.log(res.data)

        setVideoURL(res.data.path)
        setOpen(false)
    }


    useEffect(() => {
        getUploads()
    }, []);


    const getUploads = async () => {
        try {
            const res = await api.get(`/api${window.location.pathname}/video`)
            setUploads(res.data)
        } catch (error) {
            alert(error)
        }
    }
    
    const onDelete = (id) => {
        api
            .delete(`/api${window.location.pathname}/video/delete/${id}/`)
            .catch((err) => {alert(err)})
    }


    return (
    <div className='title-bar'>
        <div className='select-video-container'>
            <button
            onClick={handleOpen}
            >
                Select Video
            </button>


            <Modal
            isOpen={open}
            onRequestClose={handleClose}
            >
                Upload a Video

                <form 
                className="video-upload-form" 
                onSubmit={handleSubmit}
                encType='multipart/form-data'
                >
                    
                    <input 
                    className="video-upload" 
                    type="file" 
                    onChange={handleUpload}
                    />

                    <input 
                    className="video-title"
                    type="text" 
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    placeholder='title'
                    />

                    <button className='form-button' type='submit'>upload</button>
                </form>
                <div>
                    {
                        uploads.map((upload) => (
                            <Card 
                            setVideoURL={setVideoURL}
                            setOpen={setOpen}
                            upload={upload} 
                            onDelete={onDelete} 
                            key={upload.id}
                            />
                        ))
                    }
                </div>
            </Modal>
        </div>
    </div>
    );
}

export default TitleBar;