import React, { useState } from 'react';

/* Microsoft MSAL Imports */
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "auth/MICROSOFT MSAL/configMSAL";
import { callMsGraph } from "auth/MICROSOFT MSAL/MSGraph";

function SignInMSAL() {
    const { instance, accounts, inProgress } = useMsal();
    const [graphData, setGraphData] = useState();
    const isAuthenticated = useIsAuthenticated();

    const handleMsalLogin = (instance) => {
        instance.loginPopup(loginRequest).catch(e => {
            console.error(e);
        });
    }

    const RequestMSALProfileData = () => {
        const req = {...loginRequest, account: accounts[0]};

        /* Silently acquires an access token which is then attached to
            a request for Microsoft Graph data */
        instance.acquireTokenSilent(req).then((res) => {
            callMsGraph(res.accessToken)
                .then(res => setGraphData(res));
        }).catch((e) => {
            instance.acquireTokenPopup(req).then((res) => {
                callMsGraph(res.accessToken)
                    .then(res => setGraphData(res));
            });
        });
    }

  return (<></>)
};

export default SignInMSAL;