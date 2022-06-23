import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DropDown.css';
import { useMsal } from "@azure/msal-react";

/* Data Store Import */
import { DataStore } from 'data/DataStore';

/* Components */
const Divider = () => {
    return (
        <div className="divider">
            <div className="divider-child"></div>
        </div>
    )
}

function DropDown(props) {
    /* Data Store */
    const { state, dispatch: ctxDispatch } = useContext(DataStore);

    /* Microsoft MSAL */
    const { instance } = useMsal();

    /* Functions */
    const signout = () => {
        console.log(state);
        if (state.userInfo.signinMethod === 'M') {
            instance.logoutPopup().catch(e => {
                console.error(e);
            });
            ctxDispatch({ type: 'USER_SIGNOUT' });
            props.setDropdown(false);
        } else {
            ctxDispatch({ type: 'USER_SIGNOUT' });
            props.setDropdown(false);
        }
    }

    return (
        <div className='dropdown'>
            <Link
                to='/profile'
                style={{ textDecoration: 'none', color: 'white' }}>
                <div
                    className='dropdown__list'
                    onClick={() => props.setDropdown(false)}>
                    User Profile
                </div>
            </Link>
            <Link
                to='/orders'
                style={{ textDecoration: 'none', color: 'white' }}>
                <div
                    className='dropdown__list'
                    onClick={() => props.setDropdown(false)}>
                    Order History
                </div>
            </Link>
            <Divider />
            <div className='dropdown__list' onClick={() => signout()}>Sign Out</div>
        </div>
    );
}

export default DropDown;