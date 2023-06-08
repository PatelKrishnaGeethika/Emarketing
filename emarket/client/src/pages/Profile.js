// import DisplayProfile from "../components/userComponents/DisplayProfile";
import React, { useState, useEffect } from "react";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import EditContact from "../components/userComponents/EditContact";
import useAxiosInstance from "../utils/useAxios";

function Profile() {
  const user = JSON.parse(sessionStorage.getItem("profile"));
  const api = useAxiosInstance();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const url = "users/contact/";
        const response = await api.get(url);
        setContact(response.data.contact);
      } catch (error) {
        console.error(error);
      }
    }

    fetchContact();
  }, []);
  const changeContact = (val) => {
    setContact(val);
  };
  const Logout = () => {
    sessionStorage.removeItem("profile");
    navigate("/signin");
    // console.log("LOGOUT");
  };

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="profile-img">
          <img src={user.picture} alt="Profile Image" />
        </div>
        <div className="profile-text">
          <h1>{user.name}</h1>
          <p>
            <span>Email : </span>
            {user.email}
          </p>
          <p>
            <span>Contact No : </span>
            {contact}
          </p>
        </div>
      </div>
      <button onClick={Logout} className="logout-btn">
        Logout <i className="fa fa-sign-out"></i>
      </button>
      <div className="edit-info">
        <EditContact changeContact={changeContact} />
      </div>
    </div>
  );
}
export default Profile;
