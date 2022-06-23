import React, {useEffect, useState} from 'react';

import FinalUploader from './FinalUploader';

function FinalUploaderModal(props) {

    /* useState */
    const [upload, setUpload] = useState(false);

    /* Uploader Modal Properties */
    const modal_style = {
        "--container-width": "320px",
        "--container-height": "500px",
        "--header-height": "40px",
        "--footer-height": "50px",
        "--background-color": "#fff",
    };

    const modal_header = "Upload";
    const modal_buttons = [
        {
            type: 'outlined',
            content: 'Close',
            function: () => props.setModal(false)
        },
        {
            type: 'filled',
            content: 'Upload',
            function: () => setUpload(true)
        },
    ];

    // return (
    //     <Modal
    //     modal_style={modal_style}
    //     modal_header={modal_header}
    //     modal_buttons={modal_buttons}
    //     modal_body={<ImageUploader />}
    // />
    // )


    return (
        <div className="modal" style={modal_style}>
            <div className="modal__backdrop">
                <div className="modal__container">
                    {
                        modal_header &&
                        <div className="modal__header">
                            <p>{modal_header}</p>
                        </div>
                    }
                    <div className="modal__body">
                        <div className="modal__body__content">
                            {<FinalUploader upload={upload} setUpload={setUpload} close={props.modal} />}
                                {/* {imgs.map((img, index) => (
                                    <div className="modal__body__container" key={index}>
                                        <img src={img} alt='' />
                                    </div>
                                ))} */}
                            {/* <div className="imgup__imgcontainer addimg">
                                <AddCircleIcon style={{ fontSize: "40px" }} />
                                <input
                                    type="file" multiple
                                    accept="image/*"
                                    name="file"
                                    title="" />
                            </div> */}
                        </div>
                    </div>
                    <div className="modal__footer">
                        {
                            modal_buttons.map((btn, index) => (
                                <button
                                    key={index}
                                    className={`btn ${btn.type}`}
                                    onClick={btn.function ? btn.function : null}>
                                    {btn.content}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinalUploaderModal;