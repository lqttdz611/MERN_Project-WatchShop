import Sidebar from "../../components/Sidebar";
import Pagination from "@mui/material/Pagination";

import { IoIosArrowDown } from "react-icons/io";
import Button from "@mui/material/Button";
import { IoMenuOutline } from "react-icons/io5";

import { PiDotsNineBold } from "react-icons/pi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem";
import { fetchDataFromAPI } from "../../utils/api";
import { useParams } from "react-router-dom";
import { MyContext } from "../../App";

const SearchPage = () => {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [productItemView, setProductItemView] = useState("four");
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropDown = Boolean(anchorEl);

  const [productData, setProductData] = useState([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    window.scrollTo(0,0)
    setIsLoading(true);
    setTimeout(() => {
      setProductData(context.searchData);
      setIsLoading(false);
    }, 3000);

  }, [context.searchData]);
  const filterBrand = (brand) => {
    setIsLoading(true);
    fetchDataFromAPI(`/api/products?brand=${brand}`).then((res) => {
      setProductData(res?.productList);
      setIsLoading(false);
    });
  };
  const filterByPrice = (price, brand) => {
    setIsLoading(true);
    fetchDataFromAPI(
      `/api/products?minPrice=${price[0]}&maxPrice=${+price[1]}&brand=${brand}`
    ).then((res) => {
      setProductData(res?.productList);
      setIsLoading(false);
    });
  };
  const filterRating = (rating, brand) => {
    setIsLoading(true);
    fetchDataFromAPI(`/api/products?rating=${rating}&brand=${brand}`).then(
      (res) => {
        setProductData(res?.productList);
        setIsLoading(false);
      }
    );
  };

  return (
    <>
      <div className="product_Listing_Page">
        <div className="container">
          <div className="productListing d-flex">
            <Sidebar
              filterData={filterBrand}
              filterByPrice={filterByPrice}
              filterByRating={filterRating}
            />

            <div className="content_right">
              <div className="showBy mt-3 mb-3 d-flex align-items-center">
                <div className="d-flex align-items-center btnWrapper">
                  <Button
                    className={productItemView === "one" && "act"}
                    onClick={() => setProductItemView("one")}
                  >
                    <IoMenuOutline />
                  </Button>

                  <Button
                    className={productItemView === "three" && "act"}
                    onClick={() => setProductItemView("three")}
                  >
                    <PiDotsNineBold />
                  </Button>
                  <Button
                    className={productItemView === "four" && "act"}
                    onClick={() => setProductItemView("four")}
                  >
                    <TfiLayoutGrid4Alt />
                  </Button>
                </div>

                <div className="ml-auto showByFilter">
                  <Button onClick={handleClick}>
                    Show 9 <IoIosArrowDown />
                  </Button>
                  <Menu
                    className="w-100 showPerPageDropDown"
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openDropDown}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>10</MenuItem>
                    <MenuItem onClick={handleClose}>20</MenuItem>
                    <MenuItem onClick={handleClose}>30</MenuItem>
                    <MenuItem onClick={handleClose}>40</MenuItem>
                    <MenuItem onClick={handleClose}>50</MenuItem>
                    <MenuItem onClick={handleClose}>60</MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="productListing">
                {productData?.length!==0 && productData?.map((item, index) => {
                  return (
                    <ProductItem
                      itemView={productItemView}
                      dataProduct={item}
                      key={index}
                    />
                  );
                })}
              </div>

              <div className="d-flex align-items-center justify-content-center mt-5">
                <Pagination count={10} color="secondary" size="large" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchPage;
