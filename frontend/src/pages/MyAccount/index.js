import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FcUpload } from "react-icons/fc";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  deleteData,
  deleteImages,
  editData,
  fetchDataFromAPI,
  uploadImage,
} from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyAccount = () => {
  const context = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== "" && token !== undefined) {
      setIsLogin(true);
    } else {
      history("/login");
    }

    fetchDataFromAPI(`/api/imageUpload`).then((res) => {
      res?.map((item) => {
        item?.images?.map((img) => {
          // deleteImages(`/api/user/deleteImage?img=${img}`).then((res) => {
          //   deleteData("/api/imageUpload/deleteAllImages");
          // });
        });
      });
    });

    fetchDataFromAPI(`/api/user/${user?.userId}`).then((res) => {
      setUserData(res);
      setPreview(res.image);
      setFormField({
        name: res.name,
        email: res.email,
        phone: res.phone,
      });
    });
  }, []);

  // for Tabs component

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState([]);
  const formdata = new FormData();
  const [formField, setFormField] = useState({
    name: "",
    phone: "",
    image: [],
  });

  const changeInput = (e) => {
    e.preventDefault();
    setFormField(() => ({
      ...formField,
      [e.target.name]: e.target.value,
    }));
  };
  let img_arr = [];
  let uniqueArray = [];
  let selectedImages = [];
  const onChangeFile = async (e, apiEndPoint) => {
    try {
      const files = e.target.files;

      setUploading(true);

      //const fd = new FormData();
      for (var i = 0; i < files.length; i++) {
        // Validate file type
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png")
        ) {
          const file = files[i];

          formdata.append(`image`, file);
        } else {
          context.setAlertBox({
            open: true,
            error: true,
            msg: "Please select a valid JPG or PNG image file.",
          });

          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }

    uploadImage(apiEndPoint, formdata).then((res) => {
      fetchDataFromAPI("/api/imageUpload").then((response) => {
        if (
          response !== undefined &&
          response !== null &&
          response !== "" &&
          response.length !== 0
        ) {
          response.length !== 0 &&
            response.map((item) => {
              item?.images.length !== 0 &&
                item?.images?.map((img) => {
                  img_arr.push(img);

                  //console.log(img)
                });
            });

          uniqueArray = img_arr.filter(
            (item, index) => img_arr.indexOf(item) === index
          );
          const appendedArray = [...preview, ...uniqueArray];

          setPreview(appendedArray);

          setTimeout(() => {
            setUploading(false);
            img_arr = [];
            uniqueArray = [];
            fetchDataFromAPI("/api/imageUpload").then((res) => {
              res?.map((item) => {
                item?.images?.map((img) => {
                  // deleteImages(`/api/user/deleteImage?img=${img}`).then(
                  //   (res) => {
                  //     deleteData("/api/imageUpload/deleteAllImages");
                  //   }
                  // );
                });
              });
            });
            context.setAlertBox({
              open: true,
              error: false,
              msg: "Images Uploaded!",
            });
          }, 500);
        }
      });
    });
  };

  const editUser = (e) => {
    e.preventDefault();
    const appendedArray = [...preview, ...uniqueArray];
    console.log(appendedArray);

    img_arr = [];
    formdata.append("name", formField.name);
    formdata.append("description", formField.phone);

    formdata.append("image", appendedArray);

    formField.image = appendedArray;

    console.log(formField);
    if (
      formField.name !== "" &&
      formField.phone !== "" &&
      preview.length !== 0
    ) {
      setIsLoading(true);

      editData(`/api/user/${user?.userId}`, formField).then((res) => {
        // console.log(res);
        
        deleteData("/api/imageUpload/deleteAllImages");
        
        setTimeout(() => {
          
          setIsLoading(false);
          context.setAlertBox({
            open: true,
          error: false,
          msg: "Update Success",
          })
        }, 2000);
      });
    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill all the details",
      });
      return false;
    }
  };

  const [field,setField] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const changeInput2 = (e) => {
    e.preventDefault();
    setField(() => ({
      ...field,
      [e.target.name]: e.target.value,
    }));
  };
  const changePassword = (e) => {
    e.preventDefault();
    console.log("data formfield", field);
    if (
      field.oldPassword !== "" &&
      field.newPassword !== "" &&
      field.confirmPassword !== 0
    ) {
      setIsLoading(true);

      editData(`/api/user/${user?.userId}`, field).then((res) => {
        // console.log(res);
        
        
        setTimeout(() => {
          
          setIsLoading(false);
          context.setAlertBox({
            open: true,
          error: false,
          msg: "Update Success",
          })
        }, 2000);
      });
    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill all the details",
      });
      return false;
    }
  }

  return (
    <section className="section myAccountPage">
      <div className="container">
        <h2 className="hd">My Account</h2>

        <Box sx={{ width: "100%" }} className="myAccBox card border-0">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Edit Profile" {...a11yProps(0)} />
              <Tab label="Change Password" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <p>
              <form onSubmit={editUser}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="userImage d-flex align-items-center justify-content-center">
                      {preview?.length !== 0 &&
                        preview?.map((img, index) => {
                          return <img src={img} alt="avatar user" />;
                        })}

                      <div className="overlay d-flex align-items-center justify-content-center">
                        <FcUpload />
                        <input
                          type="file"
                          name="image"
                          onChange={(e) => onChangeFile(e, "/api/user/upload")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            name="name"
                            id="outlined-basic"
                            label="Name"
                            value={formField.name}
                            variant="outlined"
                            className="w-100"
                            onChange={changeInput}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            id="filled-disabled"
                            disabled
                            value={formField.email}
                            // label="Email"
                            variant="outlined"
                            className="w-100"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            name="phone"
                            id="outlined-basic"
                            label="Phone"
                            value={formField.phone}
                            variant="outlined"
                            className="w-100"
                            onChange={changeInput}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <Button
                        type="submit"
                        className="btn-blue bg-red btn-lg btn-big"
                      >
                        {
                          isLoading === true ?  <CircularProgress /> : "Save"
                        }
                        
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </p>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <p>
              <form onSubmit={changePassword}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <TextField
                            name="oldPassword"
                            id="outlined-basic"
                            label="Old Password"
                            variant="outlined"
                            className="w-100"
                            onChange={changeInput2}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <TextField
                            name="newPassword"
                            id="outlined-basic"
                            label="New Password"
                            variant="outlined"
                            className="w-100"
                            onChange={changeInput2}

                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <TextField
                          name="confirmPassword"
                            id="outlined-basic"
                            label="Confirm Password"
                            variant="outlined"
                            className="w-100"
                            onChange={changeInput2}

                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <Button type="submit" className="btn-blue bg-red btn-lg btn-big">
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </p>
          </CustomTabPanel>
        </Box>
      </div>
    </section>
  );
};

export default MyAccount;
