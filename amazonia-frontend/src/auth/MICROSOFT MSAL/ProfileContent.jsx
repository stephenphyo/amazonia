import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./configMSAL";
import { ProfileData } from ".//ProfileData";
import { callMsGraph, callMsGraphPhoto } from "./MSGraph";

export function ProfileContent() {
    const { instance, accounts, inProgress } = useMsal();
    const [graphData, setGraphData] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const name = accounts[0] && accounts[0].name;

    function RequestProfileData() {
        const req = {
            ...loginRequest,
            account: accounts[0]
        };

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

    function RequestProfilePhoto() {
        const req = {
            ...loginRequest,
            account: accounts[0]
        };

        /* Silently acquires an access token which is then attached to
            a request for Microsoft Graph data */
        instance.acquireTokenSilent(req).then((res) => {
            callMsGraphPhoto(res.accessToken)
                .then(res => setProfilePhoto(res));

        }).catch((e) => {
            instance.acquireTokenPopup(req).then((res) => {
                callMsGraphPhoto(res.accessToken)
                    .then(res => setProfilePhoto(res));
            });
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {
                graphData
                    ? <ProfileData graphData={graphData} />
                    : <button onClick={RequestProfileData}>
                        Request Profile Data
                    </button>
            }
            {
                profilePhoto
                    ? <img src={profilePhoto} />
                    : <button onClick={RequestProfilePhoto}>
                        Request Profile Photo
                    </button>
            }
        </>
    );
};