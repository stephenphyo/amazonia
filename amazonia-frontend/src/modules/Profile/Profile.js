import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import './Profile.css';

/* Data Store Imports */
import { DataStore } from 'data/DataStore';

function Profile() {

    /* Data Store */
    const { state, dispatch: ctxDispatch } = useContext(DataStore);
    const { userInfo } = state;

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [pfpEditor, setPfpEditor] = useState(false);

    /* useEffect */
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/profile');
        }
    }, [userInfo, navigate]);

        /* Override Modal Style */
        const modal_style = {
            "--container-width": "450px",
            "--container-height": "500px",
            "--header-height": "40px",
            "--footer-height": "50px",
            "--background-color": "#fff",
        }

        const modal_header = "Confirmation";
        const modal_buttons = [
            {
                type: 'outlined',
                content: 'Close',
                function: () => setPfpEditor(false)
            },
            {
                type: 'filled',
                content: 'Save Profile'
            },
        ];

    return (
        <div className='profile'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            {
                pfpEditor &&
                <div className="modal" style={modal_style}>
                        <div className="modal__backdrop">
                            <div className="modal__container">
                                <div className="modal__header">
                                    <p>{modal_header}</p>
                                </div>
                                <div className="modal__body">
                                    <div className="modal__body__content">
                                          <p>Hi</p>
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

            }
            <div className='profile__sidebar'>
                <div className="profile__sidebar__pfp">
                    <div className="profile__sidebar__pfp__container">
                        <div
                            className="profile__sidebar__pfp__cover"
                            onClick={() => setPfpEditor(true)}>
                            CHANGE
                        </div>
                        <img
                            src="https://amazonia-111111.s3.amazonaws.com/pfp/tomcruise.jpg"
                            alt='tomcruise'
                        />
                    </div>
                </div>
                <div className="profile__sidebar__settings">
                    <div className='profile__sidebar__setting'>Setting 1</div>
                    <div className='profile__sidebar__setting'>Setting 2</div>
                    <div className='profile__sidebar__setting'>Setting 3</div>
                </div>
            </div>
            <div className="profile__body">
                <div className="profile__body__username">
                    {userInfo && `${userInfo.firstName} ${userInfo.lastName}`}
                </div>
            </div>
        </div>
    );
}

export default Profile;