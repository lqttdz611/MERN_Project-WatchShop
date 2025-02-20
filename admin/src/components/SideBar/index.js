import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { Button } from "@mui/material";
import { FaProductHunt } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoList } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { MyContext } from "../../App";
import { FaClipboardCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const [isActive, setIsActive] = useState(null);
  const [showProduct, setShowProduct] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const location = useLocation(); // Lấy đường dẫn URL hiện tại

  useEffect(() => {
    if (
      location.pathname.startsWith("/products") ||
      location.pathname.startsWith("/product")
    ) {
      setShowProduct(true);
      setShowCategory(false);
      setIsActive(1);
    } else if (
      location.pathname.startsWith("/categories") ||
      location.pathname.startsWith("/category")
    ) {
      setShowCategory(true);
      setShowProduct(false);
      setIsActive(2);
    } else {
      setShowProduct(false);
      setShowCategory(false);
      setIsActive(null);
    }
  }, [location.pathname]);

  const handleActive = (index) => {
    setIsActive(index);
    setShowProduct(false);
    setShowCategory(false);
  };

  const handleProduct = () => {
    if (isActive === 1) {
      setShowProduct(!showProduct);
    } else {
      setShowProduct(true);
      setShowCategory(false);
      setIsActive(1);
    }
  };

  const handleCategory = () => {
    if (isActive === 2) {
      setShowCategory(!showCategory);
    } else {
      setShowCategory(true);
      setShowProduct(false);
      setIsActive(2);
    }
  };

  const history = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== "" && token !== undefined) {
      setIsLogin(true);
    } else {
      history("/login");
    }
  }, []);

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <Button
              className={isActive === 0 ? "w-100 active" : "w-100"}
              onClick={() => handleActive(0)}
            >
              <span className="icon">
                <RiDashboardHorizontalFill />
              </span>
              &nbsp;Dashboard
            </Button>
          </Link>
        </li>

        <li>
          <Button
            className={`w-100 ${showProduct ? "active" : ""}`}
            onClick={handleProduct}
          >
            <span className="icon">
              <FaProductHunt />
            </span>
            &nbsp;Product
            <span className="arrow">
              <IoIosArrowForward />
            </span>
          </Button>
          <div
            className={`submenuWrapper ${showProduct ? "colapse" : "colapsed"}`}
          >
            <ul className="submenu">
              <li>
                <Link to="/products">Product List</Link>
              </li>
              <li>
                <Link to="/product/details">Product View</Link>
              </li>
              <li>
                <Link to="/product/upload">Product Upload</Link>
              </li>
            </ul>
          </div>
        </li>

        <li>
          <Button
            className={`w-100 ${showCategory ? "active" : ""}`}
            onClick={handleCategory}
          >
            <span className="icon">
              <IoList />
            </span>
            &nbsp;Category
            <span className="arrow">
              <IoIosArrowForward />
            </span>
          </Button>
          <div
            className={`submenuWrapper ${
              showCategory ? "colapse" : "colapsed"
            }`}
          >
            <ul className="submenu">
              <li>
                <Link to="/categories">Category List</Link>
              </li>
              <li>
                <Link to="/category/upload">Category Upload</Link>
              </li>
              <li>
                <Link to="/subCategory/add">Sub Category Upload</Link>
              </li>
            </ul>
          </div>
        </li>

        <li>
          <Link to="/">
            <Button
              className={isActive === 3 ? "w-100 active" : "w-100"}
              onClick={() => handleActive(3)}
            >
              <span className="icon">
                <FaUserEdit />
              </span>
              &nbsp;Users
            </Button>
          </Link>
        </li>

        <li>
          <Link to="/orders">
            <Button
              className={isActive === 4 ? "w-100 active" : "w-100"}
              onClick={() => handleActive(4)}
            >
              <span className="icon">
                <FaClipboardCheck />
              </span>
              &nbsp;Orders
            </Button>
          </Link>
        </li>
      </ul>
      <br />

      <div className="logoutWrapper">
        <div className="logoutBox">
          <Link to="/login">
            <Button variant="contained">
              <IoLogOutOutline />
              LOGOUT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
