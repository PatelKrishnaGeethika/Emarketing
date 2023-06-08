import "../styles/signin.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import settings from "../settings.json";
import OTPVeify from "../components/userComponents/otpVerify";

const api_url = settings.api_url;

function SignupBackend({ gtoken, contact }) {
  const url = api_url + "users/signup/";
  const data = {
    token: gtoken,
    contact: contact,
  };

  const navigate = useNavigate();

  axios
    .post(url, data)
    .then((res) => {
      sessionStorage.setItem("authTokens", JSON.stringify(res.data["token"]));
      sessionStorage.setItem("profile", JSON.stringify(res.data["profile"]));
      navigate("/");
    })
    .catch((_err) => {
      console.log(_err.response.status);
      navigate("/error");
    });
}

export default function Signup() {
  //TODO: phone number verification

  const gtoken = sessionStorage.getItem("gtoken");
  const [mobile, setMobile] = useState(null);
  const getMobile = (val) => {
    setMobile(val);
  };

  return (
    <div className="my-background">
      <div className="signup">
        <OTPVeify getContact={getMobile} />
        {mobile && gtoken && <SignupBackend gtoken={gtoken} contact={mobile} />}
      </div>
    </div>
  );
}
