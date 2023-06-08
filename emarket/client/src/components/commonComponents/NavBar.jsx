import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import Notification from "./Notification";
import useAxiosInstance from "../../utils/useAxios";
import logo from "../../website-logo.jpeg";

/**
 *
 * The component for an awsome responsive NavBar
 */
function NavBar() {
  const location = useLocation().pathname;
  const [showall, setshowall] = useState(true);
  const [notification, setNotification] = useState(false);
  const api = useAxiosInstance();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const url = "/products/seller/notifications/";
      try {
        const response = await api.get(url);
        setNotification(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (location === "/myproducts" || location === "/") {
      getData();
    }
  }, [window.location.href]);
  // The above line helps the nav bar to reload on every page change

  if (location === "/signin" || location === "/signup") {
    return <></>;
  }

  const profile = sessionStorage.getItem("profile");
  const img_url = profile ? JSON.parse(profile).picture : "";
  return (
    <div className="navbar">
      <div className="logo">
        <a href="\">
          <img src={logo} alt="" />
          <p className="name">IITH EMP</p>
        </a>
      </div>
      <ul className={showall ? "navitems" : " navitems mobile-navitems"}>
        <li className="item" onClick={() => navigate("/")}>
          <a href="/">Home</a>
        </li>
        <li className="item" onClick={() => navigate("/myproducts")}>
          <a href="/myproducts">My Products</a>
          {notification && <Notification />}
          {/* <Notification /> */}
        </li>
        <li className="item" onClick={() => navigate("/soldproducts")}>
          <a href="/soldproducts">Sold Products</a>
        </li>
      </ul>
      <div className="hamburger">
        <a href="#" onClick={() => setshowall(!showall)}>
          <i className="fa-solid fa-bars"></i>
        </a>
        {/* {notification && <Notification />} */}
      </div>
      <div className="right">
        <div className="cart">
          <a href="\cart">
            <i className="fa-solid fa-shopping-cart"></i>
          </a>
        </div>
        <a className="profileimg" href="\profile">
          <img
            // src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            src={img_url}
            alt="profile-img"
          />
        </a>
      </div>
    </div>
  );
}

export default NavBar;
