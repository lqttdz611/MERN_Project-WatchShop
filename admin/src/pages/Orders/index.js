import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import { IoClose } from "react-icons/io5";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "@mui/material/Pagination";
import Dialog from "@mui/material/Dialog";
import { makeStyles } from '@mui/styles';
import { MyContext } from "../../App";
import { editData, fetchDataFromAPI } from "../../utils/api";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
//breadcrumb code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});
// for background select
const useStyles = makeStyles((theme) => ({
  select: {
    '&.pending': {
      backgroundColor: 'yellow',
    },
    '&.confirm': {
      backgroundColor: 'green',
    },
    '&.delivery': {
      backgroundColor: 'red',
    },
  },
}));
const Orders = () => {
  const classes = useStyles();
  const context = useContext(MyContext);
  const [ordersData, setOrdersData] = useState([]);
  const [page, setPage] = useState(1);
  const [productOrder, setProductOrder] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFromAPI(`/api/orders`).then((res) => {
      setOrdersData(res);
    });
  }, []);
  const [age, setAge] = React.useState("");
  const handleStatusChange = (event) => {
    setAge(event.target.value);
  };
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
  const showProductModal = (orderId) => {
    // alert(orderId);
    fetchDataFromAPI(`/api/orders/${orderId}`).then((res) => {
      console.log("product order", res.products);
      setProductOrder(res.products);
    });
    setIsOpenModal(true);
  };
  // handle change status orders
  const [statusVal, setStatusVal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [singleOrder, setSingleOrder] = useState();
  const handleChangeStatus = (e, orderId) => {
    setStatusVal(e.target.value);
    setIsLoading(true);
    context.setProgress(40);
    fetchDataFromAPI(`/api/orders/${orderId}`).then((res) => {
      const order = {
        name: res.name,
        phoneNumber: res.phoneNumber,
        address: res.address,
        pincode: res.pincode,
        amount: parseInt(res.amount),
        paymentId: res.paymentId,
        email: res.email,
        userId: res.userId,
        products: res.products,
        status: e.target.value,
      };
      editData(`/api/orders/${orderId}`, order).then((res) => {
        fetchDataFromAPI(`/api/orders`).then((res) => {
          setOrdersData(res);
        });
        context.setProgress(100);
        setIsLoading(false);
      });
      setSingleOrder(res.products);
    });
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
          <h5 className="mb-0">Orders List</h5>
          <div className="ml-auto d-flex align-items-center">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="ml-auto breadcrumbs_"
            >
              <StyledBreadcrumb
                component="a"
                href="/"
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />
              <StyledBreadcrumb
                label="Orders"
                deleteIcon={<ExpandMoreIcon />}
              />
            </Breadcrumbs>
          </div>
        </div>
        <div className="card shadow border-0 p-3 mt-4">
          <div className="table-responsive  orderTable">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
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
                          <Select
                            value={order?.status !== null ? order?.status : statusVal} //statusVal
                            onChange={(e) => handleChangeStatus(e, order?._id)}
                            displayEmpty
                            size="small"
                            // className="w-100"
                            className={`${classes.select} ${order?.status} w-100`}
                            inputProps={{ "aria-label": "Without label" }}
                            
                          >
                            <MenuItem value={"pending"} >Pending</MenuItem>
                            <MenuItem value={"confirm"}>Confirm</MenuItem>
                            <MenuItem value={"delivery"}>Delivery</MenuItem>
                          </Select>
                        </td>
                        <td>{moment(order?.date).format("MM/DD/YYYY")}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex tableFooter">
          {/* <p>
                Showing <b>{page}</b> of <b>{cateData?.length}</b> results
              </p> */}
          <Pagination
            count={ordersData?.totalPages}
            color="primary"
            className="pagination"
            showFirstButton
            showLastButton
            onChange={handleChangePagination}
          />
        </div>
      </div>
      <Dialog
        className="productModal"
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
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