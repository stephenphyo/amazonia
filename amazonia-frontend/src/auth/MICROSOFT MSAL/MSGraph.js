import { graphConfig } from "./configMSAL";

/* Attaches a given access token to a Microsoft Graph API call. Returns information about the user */
export async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMeURL, options)
        .then(res => res.json())
        .catch(err => console.log(err));
}

export async function callMsGraphPhoto(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("Content-type", 'image/jpeg');

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMePhotoURL, options)
        .then(res => {
            res.blob().then(data => {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = () => {
                    const base64data = reader.result;
                }
            })
        })
        .catch(err => console.log(err));
}