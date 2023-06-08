import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Error } from "./components/commonComponents/Error";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import MyProducts from "./pages/MyProducts";
import MyProductPage from "./pages/SellerProductView";
import Edit from "./pages/ProductEdit";
import NavBar from "./components/commonComponents/NavBar";
import SoldProducts from "./pages/SoldProducts";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";

import ImageStack from "./components/productComponents/ImageStack";
import Authentication from "./components/commonComponents/Authentication";

function App() {
  return (
    <Router>
      {/* Any global displays */}
      {/* <AllLinks /> */}
      <Authentication />
      <NavBar />
      <Routes>
        {/* A Page to login and contact */}

        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/signin" element={<Signin />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/error" element={<Error />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/soldproducts" element={<SoldProducts />}></Route>
        <Route exact path="/addproduct" element={<AddProduct />}></Route>
        <Route exact path="/myproducts" element={<MyProducts />}></Route>
        <Route exact path="/myproducts/:id" element={<MyProductPage />}></Route>
        <Route exact path="/myproducts/edit/:id" element={<Edit />}></Route>
        <Route path="product/:id" element={<ProductPage />} />

        {/* <Route path="image-stack" element={<ImageStack images={images} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
