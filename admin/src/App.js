import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import { createContext, useEffect, useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import ProductUpload from "./pages/ProductUpload";
import CategoryUpload from "./pages/CategoryUpload";
import Categories from "./pages/Categories";
import LoadingBar from "react-top-loading-bar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SnackbarProvider, useSnackbar } from "notistack";
import { fetchDataFromAPI } from "./utils/api";

// import EditProduct from "./pages/Products/editProduct";
import CategoryEdit from "./pages/Categories/editCategory";
import EditProduct from "./pages/Products/editProduct";
import Orders from "./pages/Orders";
const MyContext = createContext();
function App() {
  // for notification bottom left corner
  const { enqueueSnackbar } = useSnackbar();
  const [cateData, setCateData] = useState([]);
  const [progress, setProgress] = useState(0);
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

  useEffect(() => {
    setProgress(20);
    fetchCategory();
  }, []);
  const fetchCategory = () => {
    fetchDataFromAPI("/api/category").then((res) => {
      setCateData(res);
      setProgress(100);
    });
  };
  const [isOpenNav, setIsOpenNav] = useState(false);
  const openNav = () => {
    setIsOpenNav(true);
  };
  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("This is a success message!", { variant });
  };
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isHideSidebar, setIsHideSidebar] = useState(false);
  const [baseUrl, setBaseUrl] = useState("http://localhost:5000");
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") === "dark" ? false : true;
  });

  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    }
  }, [themeMode]);

  const values = {
    setIsToggleSidebar,
    isToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebar,
    setIsHideSidebar,
    themeMode,
    setThemeMode,
    handleClickVariant,
    alertBox,
    setAlertBox,
    setProgress,
    cateData,
    baseUrl,
    fetchCategory,
  };

  useEffect(() => {}, []);
  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            className="topLoadingBar"
          />

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

          {isHideSidebar !== true && <Header />}

          <div className="main d-flex">
            {isHideSidebar !== true && (
              <div
                className={`sidebarWrapper ${
                  isToggleSidebar === true ? "toggle" : ""
                }`}
              >
                <SideBar />
              </div>
            )}

            <div
              className={`content ${isHideSidebar === true ? "full" : ""} ${
                isToggleSidebar === true ? "toggle" : ""
              }`}
            >
              <Routes>
                <Route path={"/"} exact={true} element={<Dashboard />} />
                <Route
                  path={"/dashboard"}
                  exact={true}
                  element={<Dashboard />}
                />
                <Route path={"/login"} exact={true} element={<Login />} />
                <Route path={"/sign-up"} exact={true} element={<SignUp />} />
                <Route path={"/products"} exact={true} element={<Products />} />
                <Route
                  path={"/product/upload"}
                  exact={true}
                  element={<ProductUpload />}
                />
                <Route
                  path={"/category/upload"}
                  exact={true}
                  element={<CategoryUpload />}
                />
                <Route
                  path={"/categories"}
                  exact={true}
                  element={<Categories />}
                />
                <Route
                  path={"/categories"}
                  exact={true}
                  element={<Categories />}
                />
                <Route
                  path={"/product/details"}
                  exact={true}
                  element={<ProductDetails />}
                />
                <Route
                  path={"/categories/edit/:id"}
                  exact={true}
                  element={<CategoryEdit />}
                />
                <Route
                  path={"/product/edit/:id"}
                  exact={true}
                  element={<EditProduct />}
                />
                 <Route
                  path={"/orders"}
                  exact={true}
                  element={<Orders />}
                />

                {/* <Route
                  path={"/product/edit/:id"}
                  exact={true}
                  element={<EditProduct />}
                /> */}
              </Routes>
            </div>
          </div>
        </MyContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
export { MyContext };
