import React from "react";
import "../../styles/OTPform.css";
import axios from "axios";
import { useState } from "react";
import settings from "../../settings.json";
const api_url = settings.api_url;

/**
 * This component takes the contact number as input and will handle the backend based verification of it
 * @param {props} props
 * @returns
 */
export default function OTPVeify(props) {
  const [mobile, setMobile] = useState("");
  const [otprecv, setOtprecv] = useState("");
  const [msg, setMsg] = useState("");
  const [verified, setVerified] = useState(false);

  const send_otp = async (e) => {
    e.preventDefault();
    const data = {
      mobile_number: mobile,
    };
    const response = await axios.post(api_url + "generate_otp/", data);
    setMsg("OTP sent to " + mobile);
  };

  const verify_otp = async (e) => {
    e.preventDefault();
    const data = {
      mobile_number: mobile,
      otp: otprecv,
    };
    try {
      const response = await axios.post(api_url + "verify_otp/", data);
      props.getContact(mobile);
    } catch (e) {
      console.log(e);
      setMsg("Invalid otp");
    }
  };
  return (
    <div className="otp">
      <p> {msg} </p>
      <div className="signup-form">
        <form onSubmit={(e) => send_otp(e)}>
          <label> Contact: </label>
          <input
            type="text"
            name="Contact"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button> Send otp </button>
        </form>

        <form>
          <label> OTP: </label>
          <input
            type="text"
            autoComplete="off"
            name="Contact"
            value={otprecv}
            onChange={(e) => setOtprecv(e.target.value)}
          />
          <button onClick={(e) => verify_otp(e)}> Verify otp </button>
          <button onClick={(e) => send_otp(e)}> Resend otp </button>
        </form>
      </div>
    </div>
  );
}
