import React from "react";
import ProductList from "../components/productComponents/ProductList";
import DisplayData from "../components/commonComponents/DisplayData";
import Pagenation from "../components/commonComponents/Pagenation";
import { useEffect, useState } from "react";

function SoldProducts() {
    const [page, setPage] = useState(1);
  const [url, setURL] = useState("products/sold/?page="+page);

    useEffect(() => {
        setURL("products/sold/?page="+page)
    }, [page]);
  return (
    <>
      <h2 className="page-name">Sold Products</h2>
      <div className="products-display">
        <DisplayData url={url} Child={ProductList} nav_to={null} />
        <Pagenation setPage={setPage} />
      </div>
    </>
  );
}

export default SoldProducts;
