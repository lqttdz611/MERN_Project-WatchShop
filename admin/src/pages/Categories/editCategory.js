import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Breadcrumbs, Button, colors } from "@mui/material";
import { FaHome } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  deleteData,
  deleteImages,
  editData,
  fetchAllDataFromAPI,
  fetchDataFromAPI,
  postData,
  uploadImage,
} from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { MyContext } from "../../App";

import { SnackbarProvider, useSnackbar } from "notistack";
import { IoCloseSharp } from "react-icons/io5";
import { PiImages } from "react-icons/pi";
import { LazyLoadImage } from "react-lazy-load-image-component";

// for breadcrumbs
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

const CategoryEdit = () => {
  const [files, setFiles] = useState([]);
  const [imgFiles, setImgFiles] = useState();
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [category, setCategory] = useState([]);
  const [isSelectedFiles, setIsSelectedFiles] = useState(false);
  let img_arr = [];
  let uniqueArray = [];
  let selectedImages = [];
  let { id } = useParams();
  const formdata = new FormData();

  const removeImg = async (index, imgUrl) => {
    const imgIndex = previews.indexOf(imgUrl);

    await deleteImages(`/api/category/deleteImage?img=${imgUrl}`).then(
      (res) => {
        context.setAlertBox({
          open: true,

          error: false,

          msg: "Image Deleted!",
        });
      }
    );

    if (imgIndex > -1) {
      // only splice array when item is found

      previews.splice(index, 1); // 2nd parameter means remove one item only
    }
  };

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

          formdata.append(`images`, file);
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
          const appendedArray = [...previews, ...uniqueArray];

          setPreviews(appendedArray);

          setTimeout(() => {
            setUploading(false);
            img_arr = [];
            uniqueArray=[];
            fetchDataFromAPI("/api/imageUpload").then((res) => {
              res?.map((item) => {
                item?.images?.map((img) => {
                  deleteImages(`/api/category/deleteImage?img=${img}`).then((res) => {
                    deleteData("/api/imageUpload/deleteAllImages");
                  });
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

  // for notification bottom left corner
  const { enqueueSnackbar } = useSnackbar();

  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
    description: "",
  });

  useEffect(() => {
    context.setProgress(20);
    fetchAllDataFromAPI("/api/imageUpload").then((res) => {
      res?.map((item) => {
        item?.images?.map((img) => {
          deleteImages(`/api/category/deleteImage?img=${img}`).then((res) => {
            deleteData("/api/imageUpload/deleteAllImages");
          });
        });
      });
    });

    fetchDataFromAPI(`/api/category/${id}`).then((res) => {
      setCategory(res);
      setPreviews(res?.images);
      setFormFields({
        name: res?.name,
        description: res?.description,
      });
    console.log("upload:" ,category);

      context.setProgress(100);
    });
  }, []);

  // submit form
  const editCategory = (e) => {
    e.preventDefault();
    const appendedArray = [...previews, ...uniqueArray];
    console.log(appendedArray);

    img_arr = [];
    formdata.append("name", formFields.name);
    formdata.append("description", formFields.description);

    formdata.append("images", appendedArray);

    formFields.images = appendedArray;

    console.log(formFields);
    if (
      formFields.name !== "" &&
      formFields.description !== "" &&
      previews.length !== 0
    ) {
      setIsLoading(true);

      editData(`/api/category/${id}`, formFields).then((res) => {
        // console.log(res);
        setIsLoading(false);
        context.fetchCategory();

        deleteData("/api/imageUpload/deleteAllImages");

        history("/categories");
      });
    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill all the details",
      });
      return false;
    }

    // fetchDataFromAPI("/api/category").then(res => {
    //   console.log(res)
    // })
  };

  const changeInput = (e) => {
    e.preventDefault();
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <div className="right-content w-100">
          <div className="card shadow border-0 w-100 flex-row p-4">
            <h5 className="mb-0">Category Edit</h5>
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
                component="a"
                href="/products"
                deleteIcon={<MdExpandMore />}
              />
              <StyledBreadcrumb
                label="Category Upload"
                deleteIcon={<MdExpandMore />}
              />
            </Breadcrumbs>
          </div>

          <form className="form cateForm" onSubmit={editCategory}>
            <div className="row">
              <div className="col-md-9">
                <div className="card p-4 mt-0">
                  <h5 class="mb-4">Basic Information</h5>

                  <div class="form-group">
                    <h6>CATEGORY NAME</h6>
                    <input
                      type="text"
                      name="name"
                      value={formFields.name}
                      onChange={changeInput}
                    />
                  </div>

                  <div class="form-group">
                    <h6>CATEGORY DESCRIPTION</h6>
                    <input
                      type="text"
                      name="description"
                      value={formFields.description}
                      onChange={changeInput}
                    />
                  </div>
                  <br />

                  <div className="imagesUploadSec">
                    <h5 className="mb-4">Media and Published</h5>


                    <div className="imgUploadBox d-flex align-items-center">
                    {previews?.length !== 0 &&
                      previews?.map((img, index) => {
                        return (
                          <div className="uploadBox" key={index}>
                            
                              <span
                              className="remove"
                              onClick={() => removeImg(index, img)}
                            >
                              <IoCloseSharp />
                            </span>
                          <div className="box">
                              <LazyLoadImage
                                alt={"image"}
                                effect="blur"
                                className="w-100"
                                src={img}
                              />
                            </div>
                          
                          
                          </div>
                        );
                      })}

                    <div className="uploadBox">
                      {uploading === true ? (
                        <div className="progressBar text-center d-flex align-items-center justify-content-center flex-column">
                          <CircularProgress />
                          <span>Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            multiple
                            onChange={(e) =>
                              onChangeFile(e, "/api/category/upload")
                            }
                            name="images"
                          />
                          <div className="info">
                            <FaCloudUploadAlt/>
                            <h5>image upload</h5>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                    <br />
                    <Button
                      type="submit"
                      className="btn-blue btn-lg btn-big w-100"
                    >
                      <FaCloudUploadAlt />
                      &nbsp;
                      {isLoading === true ? (
                        <CircularProgress color="inherit" className="loader" />
                      ) : (
                        "PUBLISH AND VIEW"
                      )}{" "}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </SnackbarProvider>
    </>
  );
};

export default CategoryEdit;
