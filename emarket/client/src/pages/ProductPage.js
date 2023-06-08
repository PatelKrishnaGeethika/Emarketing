import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosInstance from "../utils/useAxios";
import ProductInfo from "../components/productComponents/ProductInfo";
import SellerInfo from "../components/userComponents/SellerInfo";
import ImageStack from "../components/productComponents/ImageStack";
import CommentSection from "../components/userComponents/CommentSection";
import Alert from "../components/commonComponents/Alert";
import "../styles/productPage.css";

function ProductPage() {
  const { id } = useParams();
  const api = useAxiosInstance();
  const navigte = useNavigate();
  const url = "products/" + id;
  const [data, setData] = useState(null);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleInterest = async () => {
    try {
      const response = await api.post("products/interested/" + id + "/");
      navigte(0);
    } catch (error) {
      console.error(error);
    }
    setAlert(false);
  };
  const handlenotint = async () => {
    try {
      const response = await api.delete("products/interested/" + id + "/");
      navigte(0);
    } catch (error) {
      console.error(error);
    }
    setAlert(false);
  };
  if (data === null) {
    return <></>;
  }
  return (
    <div className="productpage">
      <div className="productdata">
        <div className="product-imgs">
          <ImageStack images={data.product.images} />
        </div>
        <div className="buyer-product-info">
          <ProductInfo {...data.product} />
        </div>
        <div className="buyer-seller-info">
          <SellerInfo {...data.seller} />
        </div>
      </div>

      {!data.interested ? (
        <div className="interested-btn">
          <button
            onClick={() => setAlert(true)}
            style={{ backgroundColor: " rgb(29, 250, 29)" }}
          >
            Interested <i className="fa fa-cart-plus fa-xl"></i>
          </button>
          {alert && (
            <Alert
              message="Are you sure you want to add product to your cart?"
              onYesClick={handleInterest}
              onNoClick={() => setAlert(false)}
            />
          )}
        </div>
      ) : (
        <div className="interested-btn">
          <button
            onClick={() => setAlert(true)}
            style={{ backgroundColor: "red" }}
          >
            Not Interested <i className="fa fa-times fa-xl"></i>
          </button>
          {alert && (
            <Alert
              message="Are you sure you want to remove product from your cart?"
              onYesClick={handlenotint}
              onNoClick={() => setAlert(false)}
            />
          )}
        </div>
      )}

      <CommentSection id={id} />
    </div>
  );
}

export default ProductPage;
