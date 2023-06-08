import React, { useState } from "react";
import "../../styles/alert.css";

/**
 * A comonent that takes a message and 2 functions as arguments that executes them based on the clicked button
 * @param message The message or text to display in the Alert
 * @param onYesClick Function to call if yes is clicked
 * @param onNoClick Function to calll if no is clicked
 */
export default function Alert({ message, onYesClick, onNoClick }) {
  const [show, setShow] = useState(true);

  const handleYesClick = () => {
    setShow(false);
    onYesClick();
  };

  const handleNoClick = () => {
    setShow(false);
    onNoClick();
  };
  if (!show) {
    return <></>;
  }
  return (
    <div className="alert-wrapper">
      <div className="alert-content">
        <p>
          <i className="fa fa-exclamation-triangle"></i>
          {message}
        </p>
        <div className="alert-buttons">
          <button onClick={handleYesClick}>
            Yes <i className="fa fa-check"></i>
          </button>
          <button onClick={handleNoClick}>
            No <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
