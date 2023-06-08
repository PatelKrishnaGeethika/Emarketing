import { useNavigate } from "react-router-dom";

import ProductList from "../components/productComponents/ProductList";
import "../styles/myproductsPage.css";
import DisplayData from "../components/commonComponents/DisplayData";
import Pagenation from "../components/commonComponents/Pagenation";
import { useEffect, useState } from "react";

function MyProducts() {
    const [page, setPage] = useState(1);
  const [url, setURL] = useState("products/seller/?page="+page);
  const navigate = useNavigate();
  const nav_to = "/myproducts/";
  const handleClick = () => {
    navigate("/addproduct");
  };


    useEffect(() => {
        setURL("products/seller/?page="+page)
    }, [page]);

  return (
    <>
      <h2 className="page-name">My Products</h2>
      <div className="btn-cont">
        <button onClick={() => handleClick()} className="addbutton">
          <span class="addbuttonspan">Add Product</span>
        </button>
      </div>
      <DisplayData url={url} Child={ProductList} nav_to={nav_to} />
      <Pagenation setPage={setPage} />
    </>
  );
}

export default MyProducts;
