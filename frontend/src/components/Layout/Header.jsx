import React, { useState, useEffect, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaMicrophone, FaShoppingBag } from "react-icons/fa";
import { navItems, productData } from "../../static/data";
import { MyContext } from "../../App";
import { fetchAllDataFromAPI, fetchDataFromAPI } from "../../utils/api";
import { FaRegUser } from "react-icons/fa";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { PiListHeartBold } from "react-icons/pi";
import Tooltip from "@mui/material/Tooltip";
import { FaCartArrowDown } from "react-icons/fa6";
import Settings from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";

import CircularProgress from "@mui/material/CircularProgress";


const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const context = useContext(MyContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.clear();

    context.setIsLogin(false);
    setAnchorEl(null);
    context.setAlertBox({
      open: true,
      error: false,
      msg: "Logout successfully",
    });
    setTimeout(() => {
      history("/sign-in");
    }, 2000);
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    fetchDataFromAPI("/api/category/all").then((res) => {
      console.log("data header :", res);
      setCategoryData(res);
    });
  }, []);

  // Handle scroll event to toggle background color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up scroll listener when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [searchField, setSearchField] = useState("");
  const onChangeValue = (e) => {
    setSearchField(e.target.value)
  }
  
  const searchProducts =() => {
    setIsLoading(true);
    fetchAllDataFromAPI(`/api/search?q=${searchField}`).then((res) => {
      context.setSearchData(res);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      history("/search");
      // setSearchField("");
    })
  }
  return (
    <>
      <div>
        <div className="w-11/12 flex items-center justify-end">
          {/* Search Bar */}
          <div className="relative w-[40%]">
            <input
              type="text"
              placeholder="Tìm sản phẩm hoặc thương hiệu ..."
              className="h-[40px] w-full pl-10 pr-10 border-[2px] rounded-md border-[#3957db]"
              onChange={onChangeValue}
            />
            <button className="absolute left-2 top-1/2 transform -translate-y-1/2" onClick={searchProducts}>
            {
              isLoading===true ? <CircularProgress size="30px"/> :<AiOutlineSearch size={20} />
            }
              
            </button>
            <FaMicrophone
              size={30}
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
            />
          </div>

          {/* Cart Icon */}
          <div className="relative p-3">
            <Link to="/cart">
              <FaShoppingBag size={25} className="ml-3" />
            </Link>
            <span className="absolute bg-red-700 rounded-full h-5 w-5 flex items-center justify-center text-white font-medium right-2 top-[30px]">
              {context.cartCount?.length}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Header with background change */}
      <div
        className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? "bg-white shadow-md" : "bg-[#3321c8]"
        } w-full`}
      >
        <div className="flex py-4 justify-center items-center mx-auto w-full">
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Navigation Items */}
          {categoryData?.length !== 0 &&
            categoryData?.map((item, index) => (
              <div className="relative flex px-6 group" key={index}>
                <Link
                  to={`/category/${item.id}`}
                  className="text-[#fff] font-[500] px-6 cursor-pointer text-lg"
                >
                  {item.name}
                </Link>
              </div>
            ))}

          {/* Sign-in Button */}
          {context.isLogin !== true ? (
            <Link to="/sign-in">
              <button className="w-[150px] bg-[#FFBB38] h-[50px] flex items-center justify-center rounded-xl cursor-pointer font-medium text-black text-lg">
                Đăng Nhập
              </button>
            </Link>
          ) : (
            <>
              <Tooltip title="Account settings">
                <Button className="circleButton mr-3" onClick={handleClick}>
                  <FaRegUser />
                </Button>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="accountDrop"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <Link to="/my-account">
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Avatar />
                  </ListItemIcon>
                  My Account
                </MenuItem>
                </Link>
                <Link to="/my-list">
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PiListHeartBold />
                    </ListItemIcon>
                    My Whishlist
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>
                  <Link to={"/my-order"}>
                    <ListItemIcon>
                      <FaCartArrowDown />
                    </ListItemIcon>
                    My Orders
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
