import React from "react";
import "../../styles/notification.css";

/**
 *
 * A simple component when placed inside other component will make a notification dot appear on it.
 */
export default function Notification() {
  return (
    <div className="notification-badge">
      {/* <div className="badge"></div> */}
      <i className="fa fa-circle fa-beat-fade fa-xs"></i>
    </div>
  );
}
