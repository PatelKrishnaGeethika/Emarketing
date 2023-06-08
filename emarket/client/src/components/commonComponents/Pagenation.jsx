import React from "react";
import { useState } from "react";
import "../../styles/pagenation.css";

/**
 * This will display and change the page number
 * @param {serPage} param0 A function to change the page number value
 */
export default function Pagenation({ setPage }) {
  const [count, setCount] = useState(1);
  const decreasePage = () => {
    if (count > 1) {
      const new_count = count - 1;
      setCount(new_count);
      setPage(new_count);
    }
  };
  const increasePage = () => {
    const new_count = count + 1;
    setCount(new_count);
    setPage(new_count);
  };

  return (
    <div className="pagenation">
      <i
        className="fa fa-angle-double-left pg-arrow"
        onClick={decreasePage}
      ></i>
      <div className="page-count">{count}</div>
      <i
        className="fa fa-angle-double-right pg-arrow"
        onClick={increasePage}
      ></i>
    </div>
  );
}
