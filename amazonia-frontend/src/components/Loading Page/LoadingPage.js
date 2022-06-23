import React from 'react';
import './LoadingPage.css';
import { CircularProgress } from '@mui/material';

function LoadingPage(props) {
    return (
        <div className={`loading-page ${props.loading ? 'visible' : 'hidden'}`}>
            <CircularProgress />
        </div>
    );
}

export default LoadingPage;