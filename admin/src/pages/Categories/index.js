import { Breadcrumbs, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import Pagination from "@mui/material/Pagination";

import {
  deleteData,
  editData,
  fetchAllDataFromAPI,
  fetchDataFromAPI,
} from "../../utils/api";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

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

const Categories = () => {
  const [page, setPage] = useState(1);

  const [cateData, setCateData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    context.setProgress(20);
    fetchDataFromAPI("/api/category").then((res) => {
      console.log(res);
      setCateData(res);
      context.setProgress(100);
    });
  }, []);

  // change input in form (edit category)
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
    description: "",
  });

  // change value by using from API

  const deleteCate = (id) => {
    deleteData(`/api/category/${id}`).then((res) => {
      fetchDataFromAPI("/api/category").then((res) => {
        setCateData(res);
      });
    });
  };

  // for pagination part
  const handleChange = (event, value) => {
    setPage(value);
    fetchDataFromAPI(`/api/category?page=${value}`).then((res) => {
      if (res?.categoryList) {
        setCateData(res);
        console.log(res);
      } else {
        console.log("No data to show");
      }
    });
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow bordoer-0 w-100 flex-row p-4">
          <h5 className="mb-0">Category List</h5>
          <div className="d-flex align-items-center ml-auto">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="ml-auto breadcrumbs_"
            >
              <StyledBreadcrumb
                component="a"
                href="#"
                label="Dashboard"
                icon={<FaHome fontSize="small" />}
              />
              <StyledBreadcrumb
                label="Categories"
                deleteIcon={<MdExpandMore />}
              />
            </Breadcrumbs>

            <Link to="/category/upload">
              <Button className="btn-blue ml-3 pl-3 pr-3">Add Category</Button>
            </Link>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th style={{ width: "100px" }}>IMAGE</th>
                  <th>CATEGORY</th>
                  <th>DESCRIPTION</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {cateData?.categoryList?.length !== 0 &&
                  cateData?.categoryList?.map((value, index) => {
                    return (
                      <tr>
                        <td>#{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center productBox">
                            <div className="imgWrapper">
                              <div className="img card shadow m-0">
                                <img
                                  src={value.images[0]}
                                  alt="product test"
                                  className="w-100"
                                ></img>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>{value.name} </td>
                        <td>{value.description}</td>

                        <td>
                          <div className="actions d-flex align-items-center">
                            <Link to={`/categories/edit/${value.id}`}>
                              <Button className="edit ">
                                <FaEdit />
                              </Button>
                            </Link>
                            <Button
                              className="delete"
                              onClick={() => deleteCate(value.id)}
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
              {/* <p>
                  Showing <b>{page}</b> of <b>{cateData?.length}</b> results
                </p> */}

              <Pagination
                count={cateData?.totalPages}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
