import React, { useState } from 'react';
import './ImageUploader.css';

/* MUI Imports */
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/Remove';

/* Utility Imports */
import Axios from 'utils/Axios';

function ImageUploader() {

    /* useState */
  const [selectedImages, setSelectedImages] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  /* Constants & Variables */
  const allowedExtensions = ['.jpg', '.jpeg', '.png', 'webp', '.mp4'];
  const concurrentImgLimit = 100;

  /* Functions */
  const fileTypeChecker = (fileArr, allowedExtensions) => {
    const finalArr = fileArr.filter((file) => {
      return allowedExtensions.some((ext) => {
        return file.name.toLowerCase().endsWith(ext)
      })
    });
    return finalArr;
  }

  const fileUpload = (fileList) => {
    const data = new FormData();
    if (fileList) {
      fileList.map((img) => {
        data.append('img', img, img.name);
      })
    };
      Axios.post('/profile/pfp', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (e) => {
          setUploadProgress(e.loaded / e.total * 100)
        }
      }).then((res) => {
        if (res.status === 201) {
          console.log('OK');
        }
      });
  }

  const updateSelectedFiles = (
    originalFiles, appendFiles,
    setSelectedFiles, concurrentLimit) => {
    if (originalFiles) {
      if (originalFiles.length + appendFiles.length <= concurrentLimit) {
        setSelectedFiles([...originalFiles, ...appendFiles]);
        console.log([...originalFiles, ...appendFiles]);
      } else {
        alert("Greater than 5");
      }
    } else {
      if (appendFiles.length <= concurrentLimit) {
        setSelectedFiles([...appendFiles]);
      } else {
        alert("Greater than than 5");
      }
      }
  }

  const delImages = (index) => {
    const initial = selectedImages;
    initial.splice(index, 1);
    setSelectedImages([...initial]);
  }

  return (
    <div className="imgup">
      <div className="imgup__body">
        <div className="imgup__imgcontainer addimg">
          <AddCircleIcon style={{ fontSize: "40px" }} />
          <input
            type="file" multiple
            accept="image/*"
            name="myImage"
            title=""
            onChange={(e) => {
              updateSelectedFiles(
                selectedImages,
                fileTypeChecker([...e.target.files], allowedExtensions),
                setSelectedImages, concurrentImgLimit);
            }} />
        </div>
        {selectedImages && selectedImages.map((img, index) => (
          <div key={index} className="imgup__imgcontainer">
            <img alt={img.name} src={URL.createObjectURL(img)} />
            <div id='delete' onClick={() => delImages(index)}>
              <RemoveIcon style={{fontSize: "15px"}} />
            </div>
          </div>
        ))}
      </div>
      <div className='progress__container'>
        <div className="progress__bar">
          <div
            className="progress"
            style={{ width: `${uploadProgress}%` }}>
            <p>{`${Math.floor(uploadProgress)}%`}</p>
          </div>
        </div>
        </div>
      <div className="imgup__footer">
        <button
          className='btn outlined'
          onClick={() => setSelectedImages(null)}>
            Clear All
        </button>
        <button
          className='btn filled'
          onClick={() => fileUpload(selectedImages)}>
            Upload
        </button>
      </div>
    </div>
  )
};

export default ImageUploader;