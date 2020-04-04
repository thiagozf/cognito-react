import React from "react";
import ReactDOM from "react-dom";
import Auth from "@aws-amplify/auth";
import App from "./App";

Auth.configure({
  region: process.env.REACT_APP_USER_POOL_REGION,
  userPoolId: process.env.REACT_APP_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
  oauth: {
    domain: process.env.REACT_APP_USER_POOL_DOMAIN,
    scope: [
      "phone",
      "email",
      "profile",
      "openid",
      "aws.cognito.signin.user.admin"
    ],
    redirectSignIn: `${window.location.origin}/`,
    redirectSignOut: `${window.location.origin}/`,
    responseType: "code"
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
