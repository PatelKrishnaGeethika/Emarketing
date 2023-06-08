import React, { useEffect, useState } from "react";
import ProductList from "../components/productComponents/ProductList";
import "../styles/homePage.css";
import DisplayData from "../components/commonComponents/DisplayData";
import SearchBar from "../components/commonComponents/SearchBar";
import Pagenation from "../components/commonComponents/Pagenation";

function Home() {
    const [page, setPage] = useState(1)
  const [url, setURL] = useState("products/?page="+page);

  const changeUrl = (new_url) => {
    setURL(new_url);
  };

    useEffect(() => {
        setURL("products/?page="+page)
    }, [page]);


  return (
    <div>
      <SearchBar url={url} changeUrl={changeUrl} />
      <div className="products-display">
        <DisplayData url={url} Child={ProductList} nav_to="/product/" />
      </div>
      <Pagenation setPage={setPage} />
    </div>
  );
}

export default Home;
