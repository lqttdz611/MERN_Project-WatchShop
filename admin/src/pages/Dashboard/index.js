import React from "react";
import DashboardBox from "./components/dashboardBox";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import { TbStars } from "react-icons/tb";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import { IoTimerOutline } from "react-icons/io5";
import MenuItem from "@mui/material/MenuItem";
import { Chart } from "react-google-charts";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../App";
import {
  deleteData,
  fetchAllDataFromAPI,
  fetchDataFromAPI,
} from "../../utils/api";
import { useEffect } from "react";
const Dashboard = () => {
  const [productData, setProductData] = useState([]);
  const context = useContext(MyContext);
  // For Button MORE (3 dots)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [page, setPage] = useState(1);
  const handleChangePagination = (event, value) => {
    setPage(value);
    fetchDataFromAPI(`/api/products/?page=${value}`).then((res) => {
      if (res?.productList) {
        setProductData(res);
        console.log(res);
      } else {
        console.log("No data to show");
      }
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    context.setProgress(40);
    fetchAllDataFromAPI("/api/products").then((res) => {
      setProductData(res);
      context.setProgress(100);
    });
    // console.log(productData)
  }, []);
  // For GOOGLE CHART
  const data = [
    ["Task", "Hours per Day"],
    ["2013", 9],
    ["2014", 2],
    ["2015", 2],
    ["2016", 2],
  ];
  const options = {
    backgroundColor: "transparent",
    chartArea: { width: "100%", height: "80%" },
  };

  // For SELECT
  const [age, setAge] = React.useState("");
  const [category, setCategory] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleCateChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const deleteProduct = (id) => {
    context.setProgress(40);
    deleteData(`/api/products/${id}`).then((res) => {
      context.setProgress(100);
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Product Deleted!",
      });
      fetchDataFromAPI("/api/products").then((res) => {
        setProductData(res);
      });
    });
  };
  // For RATING
  return (
    <>
      <div className="right-content w-100">
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBox
                color={["#1da256", "#48d483"]}
                icon={<RxAvatar />}
                grows={true}
              />
              <DashboardBox
                color={["#c012e2", "#eb64fe"]}
                icon={<HiOutlineShoppingCart />}
              />
              <DashboardBox
                color={["#2c75e5", "#60aff5"]}
                icon={<IoBagHandleOutline />}
              />
              <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<TbStars />} />
            </div>
          </div>

          <div className="col-md-4 pl-0 topPart2">
            <div className="box graphBox">
              <div className="d-flex align-items-center w-100 bottomEle">
                <h6 class="text-white mb-0 mt-0">Total Sales</h6>
                <div className="ml-auto">
                  <Button onClick={handleClick} className="toggleIcon ml-auto">
                    <IoMdMore />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <IoTimerOutline />
                      &nbsp;Last Day
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoTimerOutline />
                      &nbsp;Last Week
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoTimerOutline />
                      &nbsp;Last Month
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoTimerOutline />
                      &nbsp;Last Year
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <h3 class="text-white font-weight-bold">$3,787,681.00</h3>
              <p>$3,578.90 in last month</p>

              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height="170px"
              />
            </div>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Best Selling Products</h3>
          <div className="row cardFilters mt-3">
            <div className="col-md-3">
              <h4>SHOW BY</h4>
              <FormControl
                size="small"
                className="w-100"
                sx={{ m: 1, minWidth: 120 }}
              >
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>CATEGORY BY</h4>
              <FormControl
                size="small"
                className="w-100"
                sx={{ m: 1, minWidth: 120 }}
              >
                <Select
                  value={category}
                  onChange={handleCateChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th style={{ width: "300px" }}>PRODUCT</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>PRICE</th>

                  <th>RATING</th>

                  <th>ACTION</th>
                </tr>
              </thead>

              {/* <tbody>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img card shadow m-0">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            alt="product test"
                            className="w-100"
                          ></img>
                        </div>
                      </div>

                      <div className="info pl-3">
                        <h6>Tops and skirt set for Female...</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>Womans </td>
                  <td>Richman</td>
                  <td style={{ width: "70px" }}>
                    <del class="old">$21.00</del>
                    <span class="new text-danger">$21.00</span>
                  </td>
                  <td>
                    <Rating name="read-only" size="small" value={4} readOnly />
                  </td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Link to="/product/details">
                      <Button className="view ">
                        <FaEye />
                      </Button>
                      </Link>
                      <Button className="edit ">
                        <FaEdit />
                      </Button>
                      <Button className="delete">
                        <MdDeleteForever />
                      </Button>
                    </div>
                  </td>
                </tr>
              
                <tr>
                  <td>#2</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img card shadow m-0">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            alt="product test"
                            className="w-100"
                          ></img>
                        </div>
                      </div>

                      <div className="info pl-3">
                        <h6>Tops and skirt set for Female...</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>Womans </td>
                  <td>Richman</td>
                  <td style={{ width: "70px" }}>
                    <del class="old">$21.00</del>
                    <span class="new text-danger">$21.00</span>
                  </td>
                  <td>
                    <Rating name="read-only" size="small" value={4} readOnly />
                  </td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="view ">
                        <FaEye />
                      </Button>
                      <Button className="edit ">
                        <FaEdit />
                      </Button>
                      <Button className="delete">
                        <MdDeleteForever />
                      </Button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>#3</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img card shadow m-0">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            alt="product test"
                            className="w-100"
                          ></img>
                        </div>
                      </div>

                      <div className="info pl-3">
                        <h6>Tops and skirt set for Female...</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>Womans </td>
                  <td>Richman</td>
                  <td style={{ width: "70px" }}>
                    <del class="old">$21.00</del>
                    <span class="new text-danger">$21.00</span>
                  </td>
                  <td>
                    <Rating name="read-only" size="small" value={4} readOnly />
                  </td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="view ">
                        <FaEye />
                      </Button>
                      <Button className="edit ">
                        <FaEdit />
                      </Button>
                      <Button className="delete">
                        <MdDeleteForever />
                      </Button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>#4</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img card shadow m-0">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            alt="product test"
                            className="w-100"
                          ></img>
                        </div>
                      </div>

                      <div className="info pl-3">
                        <h6>Tops and skirt set for Female...</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>Womans </td>
                  <td>Richman</td>
                  <td style={{ width: "70px" }}>
                    <del class="old">$21.00</del>
                    <span class="new text-danger">$21.00</span>
                  </td>
                  <td>
                    <Rating name="read-only" size="small" value={4} readOnly />
                  </td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="view ">
                        <FaEye />
                      </Button>
                      <Button className="edit ">
                        <FaEdit />
                      </Button>
                      <Button className="delete">
                        <MdDeleteForever />
                      </Button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>#5</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img card shadow m-0">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            alt="product test"
                            className="w-100"
                          ></img>
                        </div>
                      </div>

                      <div className="info pl-3">
                        <h6>Tops and skirt set for Female...</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>Womans </td>
                  <td>Richman</td>
                  <td style={{ width: "70px" }}>
                    <del class="old">$21.00</del>
                    <span class="new text-danger">$21.00</span>
                  </td>
                  <td>
                    <Rating name="read-only" size="small" value={4} readOnly />
                  </td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="view ">
                        <FaEye />
                      </Button>
                      <Button className="edit ">
                        <FaEdit />
                      </Button>
                      <Button className="delete">
                        <MdDeleteForever />
                      </Button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>#6</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img card shadow m-0">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            alt="product test"
                            className="w-100"
                          ></img>
                        </div>
                      </div>

                      <div className="info pl-3">
                        <h6>Tops and skirt set for Female...</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>Womans </td>
                  <td>Richman</td>
                  <td style={{ width: "70px" }}>
                    <del class="old">$21.00</del>
                    <span class="new text-danger">$21.00</span>
                  </td>
                  <td>
                    <Rating name="read-only" size="small" value={4} readOnly />
                  </td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="view ">
                        <FaEye />
                      </Button>
                      <Button className="edit ">
                        <FaEdit />
                      </Button>
                      <Button className="delete">
                        <MdDeleteForever />
                      </Button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>#7</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img card shadow m-0">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            alt="product test"
                            className="w-100"
                          ></img>
                        </div>
                      </div>

                      <div className="info pl-3">
                        <h6>Tops and skirt set for Female...</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>Womans </td>
                  <td>Richman</td>
                  <td style={{ width: "70px" }}>
                    <del class="old">$21.00</del>
                    <span class="new text-danger">$21.00</span>
                  </td>
                  <td>
                    <Rating name="read-only" size="small" value={4} readOnly />
                  </td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="view ">
                        <FaEye />
                      </Button>
                      <Button className="edit ">
                        <FaEdit />
                      </Button>
                      <Button className="delete">
                        <MdDeleteForever />
                      </Button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>#8</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img card shadow m-0">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            alt="product test"
                            className="w-100"
                          ></img>
                        </div>
                      </div>

                      <div className="info pl-3">
                        <h6>Tops and skirt set for Female...</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>Womans </td>
                  <td>Richman</td>
                  <td style={{ width: "70px" }}>
                    <del class="old">$21.00</del>
                    <span class="new text-danger">$21.00</span>
                  </td>
                  <td>
                    <Rating name="read-only" size="small" value={4} readOnly />
                  </td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="view ">
                        <FaEye />
                      </Button>
                      <Button className="edit ">
                        <FaEdit />
                      </Button>
                      <Button className="delete">
                        <MdDeleteForever />
                      </Button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>#9</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img card shadow m-0">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            alt="product test"
                            className="w-100"
                          ></img>
                        </div>
                      </div>

                      <div className="info pl-3">
                        <h6>Tops and skirt set for Female...</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>Womans </td>
                  <td>Richman</td>
                  <td style={{ width: "70px" }}>
                    <del class="old">$21.00</del>
                    <span class="new text-danger">$21.00</span>
                  </td>
                  <td>
                    <Rating name="read-only" size="small" value={4} readOnly />
                  </td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="view ">
                        <FaEye />
                      </Button>
                      <Button className="edit ">
                        <FaEdit />
                      </Button>
                      <Button className="delete">
                        <MdDeleteForever />
                      </Button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>#10</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img card shadow m-0">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            alt="product test"
                            className="w-100"
                          ></img>
                        </div>
                      </div>

                      <div className="info pl-3">
                        <h6>Tops and skirt set for Female...</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>Womans </td>
                  <td>Richman</td>
                  <td style={{ width: "70px" }}>
                    <del class="old">$21.00</del>
                    <span class="new text-danger">$21.00</span>
                  </td>
                  <td>
                    <Rating name="read-only" size="small" value={4} readOnly />
                  </td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="view ">
                        <FaEye />
                      </Button>
                      <Button className="edit ">
                        <FaEdit />
                      </Button>
                      <Button className="delete">
                        <MdDeleteForever />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody> */}
              <tbody>
                {productData?.productList?.length !== 0 &&
                  productData?.productList?.map((item, index) => {
                    return (
                      <tr>
                        <td>#{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center productBox">
                            <div className="imgWrapper">
                              <div className="img card shadow m-0">
                                <img
                                  src={item.images[0]}
                                  alt="product test"
                                  className="w-100"
                                ></img>
                              </div>
                            </div>

                            <div className="info pl-3">
                              <h6>{item.name}</h6>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td>{item.category?.name} </td>
                        <td>{item.brand}</td>
                        <td style={{ width: "70px" }}>
                          <del class="old">${item.price}</del>
                          <span class="new text-danger">${item.oldPrice}</span>
                        </td>
                        <td>
                          <Rating
                            name="read-only"
                            size="small"
                            value={item.rating}
                            readOnly
                          />
                        </td>

                        <td>
                          <div className="actions d-flex align-items-center">
                            <Link to="/product/details">
                              <Button className="view ">
                                <FaEye />
                              </Button>
                            </Link>

                            <Link to={`/product/edit/${item._id}`}>
                              <Button className="edit ">
                                <FaEdit />
                              </Button>
                            </Link>
                            <Button
                              className="delete"
                              onClick={() => deleteProduct(item._id)}
                            >
                              <MdDeleteForever />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <div className="d-flex tableFooter">
              <p>
                Showing <b>10</b> of <b>60</b> results
              </p>

              <Pagination
                count={productData?.totalPages}
                color="primary"
                className="pagination "
                showFirstButton
                showLastButton
                onChange={handleChangePagination}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
