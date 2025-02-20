import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";

import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartProductPage from "./pages/CartProductPage";
import OrderProduct from "./components/OrderProduct/OrderProduct";
import Signup from "./components/Signup/Signup";
import CardDetails from "./components/ProductDetails/CardDetails";
import "bootstrap/dist/css/bootstrap.min.css";

import { createContext, useEffect, useState } from "react";
import { fetchDataFromAPI, postDataSign } from "./utils/api";
import HomePage from "./pages/HomePage";
import CoupleWatches from "./pages/Couple/couple";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Listing from "./pages/Listing";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import ProductDetails from "./pages/ProductDetails";
import WhishList from "./pages/WhishList";
import CheckoutSuccess from "./pages/Checkout/success";
import Orders from "./pages/Orders";
import SearchPage from "./pages/Search";
import MyAccount from "./pages/MyAccount";
const MyContext = createContext();
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [cartCount, setCartCount] = useState();
  const [addingInCart, setAddingInCart] = useState(false)
  const [alertBox, setAlertBox] = useState({
    msg: "",
    error: false,
    open: false,
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertBox({
      open: false,
    });
  };
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== "" && token!==undefined) {
      setIsLogin(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);


  const [isHeaderAFooterShow, setIsHeaderAFooterShow] = useState(true);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromAPI("/api/category").then((res) => {
      setCategoryData(res.categoryList);
    });

    fetchDataFromAPI("/api/products").then((res) => {
      setProductData(res.productList);
      
      const brandNames = res?.productList?.map((item) => item.brand);

  // Loại bỏ phần tử trùng lặp bằng Set
  const uniqueBrandNames = [...new Set(brandNames)];

  // Cập nhật state
  setBrandData(uniqueBrandNames);
      
    });
    fetchDataFromAPI(`/api/cart?userId=${user?.userId}`).then((res) => {
      setCartCount(res);
    })
  }, []);
  const getCartCount = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetchDataFromAPI(`/api/cart?userId=${user?.userId}`).then((res) => {
      setCartCount(res);
    })
  }
  const addToCart = (data) => {
    setAddingInCart(true);
    if(isLogin !== true) alert("You need login to add to Cart");
    postDataSign(`/api/cart/add`,data).then((res) => {
      if(res.status !==false) {
        setAlertBox({
          msg:"Product is added to the CART",
          error: false,
          open: true
        })
        setTimeout(() => {
          setAddingInCart(false);
        }, 2000);
        
      getCartCount();  
      } else {
        setAlertBox({
          msg:res.msg,
          error: true,
          open: true
        })
        setTimeout(() => {
          setAddingInCart(false)
        }, 1000);
      }
    })
        

  }

  const values = {
    productData,
    setProductData,

    alertBox,
    setAlertBox,
    isHeaderAFooterShow,
    setIsHeaderAFooterShow,
    brandData,
    setBrandData,
    isLogin,
    setIsLogin,
    user,
    setUser,
    addToCart,
    cartCount,
    setCartCount,
    getCartCount,
    addingInCart,
    setAddingInCart,
    searchData,
    setSearchData,
  };
  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Snackbar
          open={alertBox.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            autoHideDuration={6000}
            severity={alertBox.error === false ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>
        {isHeaderAFooterShow === true && <Header />}
        <Routes>
          {/* <Route path='/login' element={<Signup/>}/> */}
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
          
          <Route path="/cart" element={<CartProductPage />} />
          <Route path="/order" element={<OrderProduct />} />
          <Route path="/sign-in" element={<Login />}></Route>
          

          <Route path="/category/:id" element={<Listing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/my-list" element={<WhishList />} />
          <Route path="/my-order" element={<Orders />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/checkout-success" exact={true} element={<CheckoutSuccess />}></Route>
          
        </Routes>
        {isHeaderAFooterShow === true && <Footer />}
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
