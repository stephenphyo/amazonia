import React from 'react';
import './Arrow.css';
import Microsoft from 'images/microsoft.png';

import { SignInMSALButton } from 'auth/MICROSOFT MSAL/SignInMSALButton';

/* Microsoft MSAL Imports */
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "auth/MICROSOFT MSAL/configMSAL";
import { callMsGraph } from "auth/MICROSOFT MSAL/MSGraph";

import { SignInMSAL } from 'auth/MICROSOFT MSAL/SignInMSAL'

function Arrow() {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="container">
      <div className='mybutton' onClick={e => console.log('Click')}>
        <SignInMSALButton />
        Login
      </div>
    </div>
  )
}

export default Arrow