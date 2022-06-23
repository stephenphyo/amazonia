import React, { useEffect } from "react";
import { SignInMSALButton } from 'auth/MICROSOFT MSAL/SignInMSALButton';
import { SignOutMSALButton } from 'auth/MICROSOFT MSAL/SignOutMSALButton';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import {ProfileContent} from 'auth/MICROSOFT MSAL/ProfileContent';

function Idp() {


    useEffect(() => {
        console.log(process.env);
    }, []);
    const isAuthenticated = useIsAuthenticated();

  return (
      <div>
          {isAuthenticated ? <SignOutMSALButton /> : <SignInMSALButton />}
          <AuthenticatedTemplate>
              <ProfileContent />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
              <p>You are not signed in! Please sign in.</p>
          </UnauthenticatedTemplate>
      </div>
  )
}

export default Idp;