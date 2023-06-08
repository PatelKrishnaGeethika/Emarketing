import React from "react";
import "../../styles/loading.css";

/**
 *
 *  A cool animation to show while the data is being loaded
 */
export default function Loading() {
  return (
    <div className="loader">
      <div className="circles">
        <span className="one"></span>
        <span className="two"></span>
        <span className="three"></span>
      </div>
      <div className="pacman">
        <span className="top"></span>
        <span className="bottom"></span>
        <span className="left"></span>
        <div className="eye"></div>
      </div>
    </div>
  );
}
