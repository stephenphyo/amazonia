import React, {useState} from 'react';
import './Modal.css';

function Modal(props) {

    /* useState */
    const [modal, setModal] = useState(false);

    /* Override Modal Style */
    // const modal_style = {
    //     "--container-width": "350px",
    //     "--container-height": "200px",
    //     "--header-height": "40px",
    //     "--footer-height": "50px",
    //     "--background-color": "#fff",
    // }

    // const modal_header = "Confirmation";
    // const modal_buttons = [
    //     {
    //         type: 'outlined',
    //         content: 'Close',
    //         function: () => setModal(false)
    //     },
    //     {
    //         type: 'filled',
    //         content: 'Save Changes'
    //     },
    // ];

    return (
                <div className="modal" style={props.modal_style}>
                    <div className="modal__backdrop">
                        <div className="modal__container">
                            {
                                props.modal_header &&
                                <div className="modal__header">
                                    <p>{props.modal_header}</p>
                                </div>
                            }
                            <div className="modal__body">
                                <div className="modal__body__content">
                                    {props.modal_body}
                                </div>
                            </div>
                            <div className="modal__footer">
                                {
                                    props.modal_buttons.map((btn, index) => (
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

export default Modal;