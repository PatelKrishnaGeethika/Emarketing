import React from "react";
import "../../styles/productinfo.css";

/**
 * A basic component to display product related info in the product page and other pages
 * @param {name,date_of_purchase, actual_cost,selling_cost,description} props
 * @returns
 */
export default function ProductInfo(props) {
  return (
    <div className="product-info">
      <h2 className="product-name">{props.name}</h2>
      <div className="underline"></div>
      <p>
        <span className="heading">Date of purchase:</span>{" "}
        {props.date_of_purchase}
      </p>
      <p>
        <span className="heading">Actual Cost:</span>&#8377; {props.actual_cost}
      </p>
      <p>
        <span className="heading">Selling Cost:</span>&#8377;{" "}
        {props.selling_cost}
      </p>
      <h3>Description:</h3>
      <p className="description-text">{props.description}</p>
    </div>
  );
}
