import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./configMSAL";

function handleMsalLogin(instance) {
    instance.loginPopup(loginRequest).catch(e => {
        console.error(e);
    });
}

/* Renders a button which, when selected, will open a popup for login */
export const SignInMSALButton = () => {
    const { instance } = useMsal();

    return (
        <div className="ml-auto" onClick={() => handleMsalLogin(instance)}> </div>
    );
}