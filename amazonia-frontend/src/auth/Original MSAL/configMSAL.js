export const msalConfig = {
    auth: {
      clientId: "e9f74690-4c80-415e-bf1d-147cea00e8f3",
      authority: "https://login.microsoftonline.com/common", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };

  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
    scopes: ["User.Read", "User.Read.All"]
  };

  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeURL: "https://graph.microsoft.com/v1.0/me",
      graphMePhotoURL: "https://graph.microsoft.com/v1.0/me/photo/$value"
  };