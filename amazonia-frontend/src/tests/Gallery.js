import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';

/* MUI Imports */
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import FinalUploaderModal from './FinalUploaderModal';

/* Image Imports */
import Image from 'images/image.png';
import VideoIcon from 'images/video_icon_48x48.png';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Data Store Import */
import { DataStore } from 'data/DataStore';

/* Component Imports */
import Modal from './Modal';

function Gallery() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [uploader, setUploader] = useState(false);
    const [emptyList, setEmptyList] = useState(false);
    const [imageViewer, setImageViewer] = useState(false);
    const [videoViewer, setVideoViewer] = useState(false);
    const [src, setSrc] = useState('');

    /* useRef */
    const videoMetadata = useRef('');
    const viewer = useRef();

    /* Data Context */
    const { state: ctxState } = useContext(DataStore);
    const userInfo = ctxState.userInfo;

    /* Image Viewer Close Event */
    const closeViewer = (e) => {
        console.log("Event");
        if (
            viewer.current
            && e.target.id !== 'viewer_img'
        ) { setImageViewer(false) }
    };

    useEffect(() => {
        if (imageViewer) {
            viewer.current.addEventListener('mousedown', closeViewer);
        }
    }, [imageViewer]);

    /* Functions */
    const checkFileType = (filename) => {
        const extImages = ['.jpg', '.jpeg', '.png', '.webp'];
        const extVideos = ['.mp4', '.avi'];

        if (extImages.some((ext) => {
            return filename.toLowerCase().endsWith(ext)
        })) {
            return "image";
        } else if (extVideos.some((ext) => {
            return filename.toLowerCase().endsWith(ext)
        })) {
            return "video";
        }
    };

    const getVideoDuration = (seconds) => {
        const duration = Math.floor(seconds);

        if (duration >= 60) {
            return (`${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`)
        } else {
            return (`0:${duration}`)
        }
    };

    const imgs = [
        "https://amazonia-gallery.s3.amazonaws.com/2022_6_20_17_21_img1.jpg"
    ]

    const [fileList, setFileList] = useState([]);
    const fetchData = async () => {
        const query_params = {
            userId: userInfo.userId,
            email: userInfo.email
        };
        await Axios.get('/gallery/filelist', {params: query_params})
            .then((res) => {
                if (res.status === 204) {
                    setEmptyList(true);
                } else {
                    setEmptyList(false);
                    setFileList(res.data.files);
                }
            }).catch((err) => {
                console.log(err.message);
            })
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/gallery');
        }
    });

    useEffect(() => {
        if (!uploader) {
            fetchData();
        }
    }, [uploader]);

    return (
        <div className="gallery">
            <div className="gallery__body">
                {emptyList
                    ?
                    <div className="gallery__message">
                        <span>No files were found.</span>
                    </div>
                    :
                    fileList.map((img, index) => (
                        <div
                            key={index}
                            className="gallery__imgcontainer"
                            onClick={() => {
                                if (checkFileType(img.file_url) === "image") {
                                    setImageViewer(true);
                                } else {
                                    setVideoViewer(true);
                                }
                                setSrc(img.file_url);
                            }}>
                            {checkFileType(img.file_url) === 'image' &&
                                <img alt={img.file_url} src={img.file_url} />
                            }
                            {checkFileType(img.file_url) === 'video' &&
                                <div className="gallery__overlay">
                                    <video
                                        ref={videoMetadata} src={img.file_url}
                                        preload="metadata" id="metadata" />
                                    <img alt="video" src={VideoIcon} id="icon" />
                                    {/* <span id="duration">
                                        {getVideoDuration(videoMetadata.current.duration)}
                                        {getVideoDuration(document.getElementById('metadata').duration)}
                                    </span> */}
                                    <div className="gallery__overlay__hover">
                                        <PlayCircleOutlineIcon />
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
            </div>
            {imageViewer &&
                <div ref={viewer} className="gallery__viewer">
                    <img alt={src} src={src} id="viewer_img" />
                    <label onClick={() => setImageViewer(false)}>
                        <CloseIcon />
                    </label>
                </div>
            }
            {videoViewer &&
                <div className="gallery__viewer">
                    <video src={src}  controls autoPlay loop />
                    <label onClick={() => setVideoViewer(false)}>
                        <CloseIcon />
                    </label>
                </div>
            }
            <div className="gallery__footer">
                <button
                    className='btn filled' id='add'
                    onClick={() => setUploader(true)}>
                    Add
                </button>
                <button
                    className='btn filled' id='delete'>
                    Delete
                </button>
            </div>
            {uploader && <FinalUploaderModal setModal={setUploader} modal={uploader} fetchData={fetchData} />}
        </div>
    );
}

export default Gallery;