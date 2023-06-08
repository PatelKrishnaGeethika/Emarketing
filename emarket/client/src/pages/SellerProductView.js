import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/sellerProductView.css";
import useAxiosInstance, { useAxios } from "../utils/useAxios";
import ProductInfo from "../components/productComponents/ProductInfo";
import ImageStack from "../components/productComponents/ImageStack";
import RequestList from "../components/userComponents/RequestList";
// import Loading from "../components/commonComponents/Loading";
import CommentSection from "../components/userComponents/CommentSection";
import Alert from "../components/commonComponents/Alert";
// A detailed product display page
function MyProductPage() {
  // Getting parameters from the url
  const { id } = useParams();
  const api = useAxiosInstance();
  const url = "products/seller/" + id + "/";
  // const [data, setData] = useState(null);
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const { apidata } = useAxios(url);
  const { apidata: interested_peeps } = useAxios(
    "products/seller/interested/" + id + "/"
  );

  const handleEditClick = () => {
    navigate("/myproducts/edit/" + id);
  };
  const handleSold = async () => {
    const response = await api.post("products/sold/" + id + "/");
    navigate("/myproducts");
  };
  const handleDelete = async () => {
    const response = await api.delete("products/seller/" + id + "/");
    navigate("/myproducts");
  };
  if (apidata === null) {
    return <div></div>;
  }

  return (
    <div className="myproductpage">
      <div className="product">
        <div className="seller-product-imgs">
          <ImageStack images={apidata.images} />
        </div>
        <ProductInfo {...apidata} />
      </div>
      <div className="buttons">
        <button onClick={handleEditClick} className="edit-button">
          Edit Info <i className="fa fa-edit"></i>
        </button>
        <button
          onClick={() => {
            setAlert(1);
          }}
          className="sold-button"
        >
          Mark as sold <i className="fa fa-check"></i>
        </button>
        {alert === 1 && (
          <Alert
            message="Are you sure you want to Mark the product as sold?"
            onYesClick={handleSold}
            onNoClick={() => setAlert(false)}
          />
        )}
        <button
          onClick={() => {
            setAlert(2);
          }}
          className="delete-button"
        >
          Delete Product <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        {alert === 2 && (
          <Alert
            message="Are you sure you want to Delete Product?"
            onYesClick={handleDelete}
            onNoClick={() => setAlert(false)}
          />
        )}
      </div>
      {/* the comments and requests goes here */}
      <div>
        {interested_peeps && (
          <RequestList interested_peeps={interested_peeps} />
        )}
      </div>
      <CommentSection id={id} />
    </div>
  );
}

export default MyProductPage;
