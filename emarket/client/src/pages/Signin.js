import "../styles/signin.css";
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import credentials from "../credentials.json";
import settings from "../settings.json";

function SigninBackend({ gtoken }) {
  //console.log("in signin backend");
  const api_url = settings.api_url;
  const url = api_url + "users/signin/";
  const data = { token: gtoken };

  sessionStorage.setItem("gtoken", JSON.stringify(gtoken));

  const navigate = useNavigate();
  axios
    .post(url, data)
    .then((res) => {
      sessionStorage.setItem("authTokens", JSON.stringify(res.data["token"]));
      sessionStorage.setItem("profile", JSON.stringify(res.data["profile"]));
      // console.log("go to home ");
      navigate("/"); //redirect to home page
    })
    .catch((err) => {
      if (err.response.status === 404) {
        navigate("/signup"); //redirect to signup page
      } else {
        console.log(err.response.status);
      }
    });
}

function SigninGoogle() {
  //console.log("in signin google");

  const [gtoken, setGtoken] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setGtoken(codeResponse.access_token),
    onError: (error) => console.log("Login Failed:", error),
  });

  // console.log(gtoken);

  return (
    <div className="my-background">
      <div className="signin">
        <h2>Welcome to</h2>
        <h2>IITH E-MarketPlace</h2>
        <div className="signin-button">
          <button onClick={() => login()}>
            Sign in with Google <i className="fa fa-google fa-2x"></i>{" "}
          </button>
          {gtoken && <SigninBackend gtoken={gtoken} />}
        </div>
      </div>
    </div>
  );
}

export default function Signin() {
  return (
    <GoogleOAuthProvider clientId={credentials.clientId}>
      <SigninGoogle />
    </GoogleOAuthProvider>
  );
}
