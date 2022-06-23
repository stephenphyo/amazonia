import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import './FinalUploader.css';

/* MUI Imports */
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

// import { Upload } from "@progress/kendo-react-upload";

/* Image Imports */
import Image from 'images/image.png';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Component Imports */
import Modal from './Modal';

/* Data Store Import */
import { DataStore } from 'data/DataStore';

function FinalUploader(props) {
    /* useState */
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});

    /* useRef */
    const cancelRequest = useRef({});

    /* Constants & Variables */
    const allowedExtensions = ['.jpg', '.jpeg', '.png', 'webp', '.mp4'];
    const concurrentImgLimit = 100;

    /* Data Store */
    const { state: ctxState } = useContext(DataStore);

    /* Functions */
    const checkFileExtension = (fileArr, allowedExtensions) => {
        const resultedArr = fileArr.filter((file) => {
            return allowedExtensions.some((ext) => {
                return file.name.toLowerCase().endsWith(ext)
            })
        });
        return resultedArr;
    };

    const checkFileName = (fileName, maxLength = 16) => {
        if (fileName.length > maxLength) {
            return (`${fileName.slice(0, maxLength)} ...`)
        } else {
            return (fileName)
        }
    };

    const checkFileSize = (fileSize, decimal = 2) => {
        const k = 1024;
        const power = Math.floor(Math.log(fileSize) / Math.log(k));
        const prefix = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB'];

        return (`${(fileSize / (1024 ** power)).toFixed(decimal)} ${prefix[power]}`);
    };

    const uploadFile = async (fileList) => {
        if (fileList) {
            fileList.map((file, index) => {
                // Form Data
                const data = new FormData();
                data.append('file', file, file.name);
                data.append('userInfo', JSON.stringify({
                    userId: ctxState.userInfo.userId,
                    email: ctxState.userInfo.email
                }));

                // Axios Cancel Token
                cancelRequest.current[index] = axios.CancelToken.source();

                Axios.post('/gallery/upload', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    // signal: controller.signal,
                    cancelToken: cancelRequest.current[index].token,
                    onUploadProgress: (e) => {
                        setUploadProgress(prev => ({...prev, [index]: (e.loaded / e.total * 100)}))
                    }
                }).then((res) => {
                    if (res.status === 201) {
                        console.log('OK');
                        props.setUpload(false);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            })
        };
    };

    const cancelAxios = (index) => {
        cancelRequest.current[index].cancel();
    }

    const updateSelectedFiles = (
        originalFiles, appendFiles,
        setSelectedFiles, concurrentLimit) => {
        if (originalFiles) {
            if (originalFiles.length + appendFiles.length <= concurrentLimit) {
                setSelectedFiles([...originalFiles, ...appendFiles]);
                console.log([...originalFiles, ...appendFiles]);
            } else {
                alert(`Greater than ${concurrentLimit}`);
            }
        } else {
            if (appendFiles.length <= concurrentLimit) {
                setSelectedFiles([...appendFiles]);
            } else {
                alert(`Greater than ${concurrentLimit}`);
            }
        }
    };

    const delImages = (index) => {
        const initial = selectedFiles;
        initial.splice(index, 1);
        setSelectedFiles([...initial]);
    };

    /* useEffect */
    useEffect(() => {
        if (props.upload) {
            uploadFile(selectedFiles);
        }
    }, [props.upload]);

    return (
        <>
            <div className="up_body">
                {/* <Upload
                    batch={false}
                    multiple={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={"http://20.92.111.178:9000/gallery/upload"}
                /> */}
                <div className="up_addImg">
                    <CloudUploadIcon style={{ fontSize: "30px" }} />
                    <span>Click here or Drop files here to upload</span>
                    <input
                        type="file" multiple
                        accept="image/*"
                        name="file"
                        title=""
                        onChange={(e) => {
                            updateSelectedFiles(
                                selectedFiles,
                                checkFileExtension([...e.target.files], allowedExtensions),
                                setSelectedFiles, concurrentImgLimit);
                        }} />
                </div>
                <div className="up_files_wrapper">
                    {selectedFiles && selectedFiles.map((image, index) => (
                        <div className="up_file" key={index}>
                            <div className="up_file_content">
                                <span className="up_file_icon">
                                    <img src={Image} alt='' />
                                </span>
                                <span className="up_file_description">
                                    <span className="up_file_name">
                                        {checkFileName(image.name)}
                                    </span>
                                    <span className="up_file_size">
                                        {checkFileSize(image.size)}
                                    </span>
                                </span>
                                <span className="up_file_trailer">
                                    <span className="up_file_progress_percent">
                                        {`${uploadProgress[index] ? uploadProgress[index].toFixed(1) : 0}%`}
                                    </span>
                                    <span className="up_file_cancel">
                                        <DoNotDisturbIcon onClick={() => cancelAxios(index)} />
                                    </span>
                                </span>
                            </div>
                            <div className="up_file_progressbar">
                                <div
                                    className="up_file_progress"
                                    style={{
                                        width: `${uploadProgress[index]
                                            ? uploadProgress[index].toFixed(1) : 0}%`
                                    }} >
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FinalUploader;