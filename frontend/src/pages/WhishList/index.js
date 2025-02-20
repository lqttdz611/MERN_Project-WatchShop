import { IoMdClose } from "react-icons/io";
import React, { useContext, useEffect } from "react";
import Rating from "@mui/material/Rating";
import QuantityBox from "../../components/QuantityBox";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { IoBagCheckOutline } from "react-icons/io5";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import { MyContext } from "../../App";
import { deleteData, editData, fetchDataFromAPI } from "../../utils/api";
import { FaHome } from "react-icons/fa";
const WhishList = () => {
  const context = useContext(MyContext);
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token !== null && token !== "" && token!==undefined) {
      setIsLogin(true);
    } else {
      history("/login")
    }
    const user = JSON.parse(localStorage.getItem("user"));

    
    fetchDataFromAPI(`/api/my-list?userId=${user?.userId}`).then((res) => {
      console.log("cart data + ", res);
      setListData(res);
    });
  }, []);
  const removeItem = (id) => {
    deleteData(`/api/my-list/${id}`).then((res) => {
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Item removed from WHISHLIST!",
      });

      const user = JSON.parse(localStorage.getItem("user"));
      fetchDataFromAPI(`/api/my-list?userId=${user?.userId}`).then(
        (response) => {
          setListData(response);
          setIsLoading(false);
        }
      );
      // context.getCartCount();
    });
  };

  return (
    <>
      <section className="section cartPage">
        <div className="container">
          <h2 className="hd mb-1">Your Cart</h2>
          <p>
            There are <b className="text-red">{listData?.length}</b> products in
            your card
          </p>
          {listData?.length !== 0 ? (
            <div className="row">
              <div className="col-md-9 ">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th width="35%">Product</th>
                        <th width="15%">Unit Price</th>

                        <th width="10%">Remove</th>
                      </tr>
                    </thead>
                    {listData?.length !== 0 &&
                      listData?.map((item, index) => {
                        return (
                          <tbody>
                            <tr>
                              <td width="35%">
                                <Link to={`/product/${item.productId}`}>
                                  <div className="d-flex align-items-center cartItemImgWrapper">
                                    <div className="imgWrapper">
                                      <img
                                        src={item?.image}
                                        className="w-100"
                                        alt="product pic"
                                      />
                                    </div>

                                    <div className="info px-3">
                                      <h6>
                                        {item.productTitle.substr(0, 30) +
                                          "..."}{" "}
                                      </h6>
                                      <Rating
                                        className="mt-2 mb-2"
                                        name="read-only"
                                        value={`${item?.rating}`}
                                        size="small"
                                        precision={0.5}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </Link>
                              </td>

                              <td width="15%">${item?.price}</td>

                              <td width="10%">
                                <span
                                  className="remove"
                                  onClick={() => {
                                    removeItem(item?._id);
                                  }}
                                >
                                  <IoMdClose />
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div class="empty d-flex align-items-center justify-content-center flex-column">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png?f=webp"
                width="150"
                alt="empty cart"
              />
              <h3>Your WhishList is currently empty </h3>
              <br />
              <Link to="/">
                <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                  <FaHome /> &nbsp; Continue Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      {isLoading === true && <div className="loadingInCart"></div>}
    </>
  );
};
export default WhishList;
