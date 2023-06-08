import React, { useState } from "react";
import "../../styles/productList.css";
import { useNavigate } from "react-router-dom";
import settings from "../../settings.json";
import Notification from "../commonComponents/Notification";

const base_url = settings.base_url;

/**
 * This will display the short product cards we can see in the website
 * @param {*} param0
 * @returns
 */
const ProductCard = ({
  id,
  name,
  actual_cost,
  selling_cost,
  date_of_purchase,
  image,
  notification,
  nav_to,
}) => {
  const navigate = useNavigate();
  const [notify, setNotify] = useState(true);
  const img_src = nav_to === null ? image : image.image;

  const handleClick = (id) => {
    if (nav_to !== null) navigate(nav_to + id);
  };
  return (
    <div
      className="productcard"
      onClick={() => {
        handleClick(id);
      }}
    >
      {notification && nav_to === "/myproducts/" && <Notification />}
      <div className="product-img">
        <img src={base_url + img_src} alt="" />
      </div>

      <h1>{name}</h1>
      <h4>Actual Cost: &#8377;{actual_cost}</h4>
      <h4>Selling Cost: &#8377;{selling_cost}</h4>
    </div>
  );
};

// export default ProductCard;

/**
 * This will take a list of products to display and displays their product cards. The data contains the products list and nav_to contiains where to navigate to if clicked on card.
 * @param {data,nav_to} props
 * @returns
 */
function ProductList(props) {
  const products = props.data;
  const nav_to = props.nav_to;

  if (products.length === 0)
    return (
      <div className="productlist">
        <h2>No products found</h2>
      </div>
    );

  return (
    <>
      <div className="productlist">
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              {...product}
              nav_to={nav_to}
            ></ProductCard>
          );
        })}
      </div>
    </>
  );
}

export default ProductList;
