import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * This will check if the user has access to a particular page
 * If yes he will be allowed or else the user will be redirected signin page
 */

export default function Authentication() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const profile = sessionStorage.getItem("profile");

  useEffect(() => {
    if (profile === null) {
      // user is allowed to be in these pages without being authenticated
      if (location === "/signin" || location === "/signup") {
      }
      // will be redirected for the rest of the pages
      else {
        navigate("/signin");
      }
    }
  });

  return <></>;
}
