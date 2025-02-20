import React, { useContext, useEffect, useState } from "react";
import { fetchDataFromAPI, postDataSign } from "../../utils/api";
import Pagination from "@mui/material/Pagination";
import { MyContext } from "../../App";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoClose } from "react-icons/io5";
const Orders = () => {
  const context = useContext(MyContext);
  const [ordersData, setOrdersData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user?.userId);
    window.scrollTo(0, 0);
    fetchDataFromAPI(`/api/orders?userId=${user?.userId}`).then((res) => {
      setOrdersData(res);
    });
    
  }, []);
  const [page, setPage] = useState(1);
  const handleChangePagination = (event, value) => {
    setPage(value);
    fetchDataFromAPI(`/api/orders/?page=${value}`).then((res) => {
      if (res?.orderList) {
        setOrdersData(res);
        console.log(res);
      } else {
        console.log("No data to show");
      }
    });
  };
  const [productOrder, setProductOrder] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const showProductModal = (orderId) => {
    // alert(orderId);
    fetchDataFromAPI(`/api/orders/${orderId}`).then((res) => {
      console.log("product order", res.products);
      setProductOrder(res.products);
    });
    setIsOpenModal(true);
  };
  return (
    <>
      <section className="section">
        <div className="container">
          <h2 className="hd">Orders</h2>
          <p className="subtitle">View your order history</p>
          <div className="table-responsive  orderTable">
            <table className="table table-striped table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>Order Id</th>
                  <th>Payment Id</th>
                  <th>Products</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Pincode</th>
                  <th>Total Amount</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {ordersData?.orderList?.map((order, index) => {
                  return (
                    <>
                      <tr>
                        <td>{order?._id}</td>
                        <td>{order?.paymentId}</td>
                        <td>
                          <span
                            className="text-blue font-weight-bold cursor"
                            onClick={() => {
                              showProductModal(order?._id);
                            }}
                          >
                            Click here to view
                          </span>
                        </td>
                        <td>{order?.name}</td>
                        <td>{order?.phoneNumber}</td>
                        <td>{order?.address}</td>
                        <td>{order?.pincode}</td>
                        <td>${order?.amount}</td>
                        <td>{order?.email}</td>
                        <td>
                          {order?.status === "pending" ? (
                            <span className="badge badge-danger">
                              {order?.status}
                            </span>
                          ) : (
                            <span className="badge badge-success">
                              {order?.status}
                            </span>
                          )}
                        </td>
                        <td>{moment(order?.date).format("MM/DD/YYYY")}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="d-flex tableFooter">
          {/* <p>
                Showing <b>{page}</b> of <b>{cateData?.length}</b> results
              </p> */}
          <Pagination
            count={ordersData?.totalPages}
            color="primary"
            className="pagination mt-4"
            showFirstButton
            showLastButton
            onChange={handleChangePagination}
          />
        </div>
        </div>
      </section>
      <Dialog className="productModal" open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <Button className="close_" onClick={() => setIsOpenModal(false)}>
          <IoClose />
        </Button>
        <h4 className="mb-4 font-weight-bold pr-5">Product</h4>
        <div className="table-responsive  orderTable">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Product Title</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {productOrder?.length !== 0 &&
                productOrder?.map((item, index) => {
                  return (
                    <tr>
                      <td>{item?.productName}</td>
                      <td>
                        <div className="img">
                          <img src={item?.productImage} alt="product ordered" />
                        </div>
                      </td>
                      <td>{item?.quantity}</td>
                      <td>{item?.price}</td>
                      <td>{item?.total}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Dialog>
    </>
  );
};
export default Orders;