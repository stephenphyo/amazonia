import React from "react";
import { useMsal } from "@azure/msal-react";

function handleLogout(instance) {
    instance.logoutPopup().catch(e => {
        console.error(e);
    });
}

/* Renders a button which, when selected, will open a popup for logout */
export const SignOutMSALButton = () => {
    const { instance } = useMsal();

    return (
        <button variant="secondary" className="ml-auto" onClick={() => handleLogout(instance)}>Sign out using Popup</button>
    );
}