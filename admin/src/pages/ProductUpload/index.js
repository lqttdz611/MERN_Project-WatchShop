import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Button } from "@mui/material";
import { FaHome } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IoMdRemove } from "react-icons/io";
import { PiImages } from "react-icons/pi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Rating from "@mui/material/Rating";
import {MyContext} from "../../App"
import { deleteData, deleteImages, fetchAllDataFromAPI, fetchDataFromAPI, postData, uploadImage } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
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

const ProductUpload = () => {
  const history = useNavigate();

  const context = useContext(MyContext);

  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // for rating controlled
  const [valueRating, setValueRating] = useState(2);

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: 0,
    oldPrice: 0,
    category: "",
    cateName: "",
    cateId: "",
    countInStock: 0,
    rating: 0,
    isFeatured: null,
    discount: 0,
  });
  const [cateData, setCateData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchAllDataFromAPI("/api/category/all").then((res) => {
      console.log(res);
      setCateData(res);
    });
  }, []);

  //
  const [categoryItem, setCategoryItem] = useState("");
  const [featuredSelect, setFeaturedSelect] = useState("");
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryItem(event.target.value);
    setFormFields({
      ...formFields,
      category:event.target.value,
      
    })
  };
  const handleFeatureChange = (event: SelectChangeEvent) => {
    setFeaturedSelect(event.target.value);
    setFormFields({
      ...formFields,
      [event.target.name]:event.target.value,
    })
  };



  let img_arr = [];

  let uniqueArray = [];
  const [previews, setPreviews] = useState([]);
  const addProduct = (e) => {
    e.preventDefault();
    const appendedArray = [...previews, ...uniqueArray];

    img_arr = [];
    formdata.append("name", formFields.name);
    formdata.append("description", formFields.description);
    formdata.append("brand", formFields.brand);
    formdata.append("price", formFields.price);
    formdata.append("oldPrice", formFields.oldPrice);
    formdata.append("category", formFields.category);
    formdata.append("cateName", formFields.catName);
    formdata.append("cateId", formFields.catId);
    formdata.append("countInStock", formFields.countInStock);
    formdata.append("rating", formFields.rating);
    formdata.append("isFeatured", formFields.isFeatured);
    formdata.append("discount", formFields.discount);

    formFields.images = appendedArray;
    appendedArray.forEach((image) => {
      formdata.append("images", image); // Ensure images are appended correctly
    });

    console.log("hereeeeeeee", formFields);

    if (formFields.name === "") {
      context.setAlertBox({
        open: true,
        msg: "please add product name",
        error: true,
      });
      return false;
      
    }
    if (formFields.description === "") {
      context.setAlertBox({
        open: true,
        msg: "please add product description",
        error: true,
      });
      return false;
      
    }
    if (formFields.brand === "") {
      context.setAlertBox({
        open: true,
        msg: "please add product brand",
        error: true,
      });
      return false;
      
    }
    if (formFields.discount === null) {
      context.setAlertBox({
        open: true,
        msg: "please select the product discount",
        error: true,
      });
      return false;
    }
    if (formFields.price === null) {
      context.setAlertBox({
        open: true,
        msg: "please add product price",
        error: true,
      });
      return false;
    }
    if (formFields.oldPrice === null) {
      context.setAlertBox({
        open: true,
        msg: "please add product oldPrice",
        error: true,
      });
      return false;
    }
    if (formFields.rating === 0) {

      context.setAlertBox({

        open: true,

        msg: "please select product rating",

        error: true,

      });

      return false;

    }
    if (formFields.category === "") {
      context.setAlertBox({
        open: true,
        msg: "please select a category",
        error: true,
      });
      return false;
    }
    if (previews.length === 0) {
      context.setAlertBox({
        open: true,
        msg: "please select images",
        error: true,
      });
      return false;
    }
    if (formFields.featured === null) {
      context.setAlertBox({
        open: true,
        msg: "please select the product is a featured or not",
        error: true,
      });
      return false;
    }
    

    setIsLoading(true);
    
    postData("/api/products/create", formFields).then((res) => {

      context.setAlertBox({

        open: true,

        msg: "The product is created!",

        error: false,

      });



      setIsLoading(false);

      deleteData("/api/imageUpload/deleteAllImages");



      history("/products");
      
    });
  };

  const inputChange = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const formdata = new FormData();

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
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];

          formdata.append(`images`, file);
        } else {
          context.setAlertBox({
            open: true,
            error: true,
            msg: "Please select a valid JPG or PNG image file.",
          });

          setUploading(false);
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
            uniqueArray = [];
            fetchDataFromAPI("/api/imageUpload").then((res) => {
              res?.map((item) => {
                item?.images?.map((img) => {
                  deleteImages(`/api/products/deleteImage?img=${img}`).then(
                    (res) => {
                      deleteData("/api/imageUpload/deleteAllImages");
                    }
                  );
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

  const removeImg = async (index, imgUrl) => {
    const imgIndex = previews.indexOf(imgUrl);

    deleteImages(`/api/category/deleteImage?img=${imgUrl}`).then((res) => {
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Image Deleted!",
      });
    });

    if (imgIndex > -1) {
      // only splice array when item is found
      previews.splice(index, 1); // 2nd parameter means remove one item only
    }
  };

  const selectCate = (cateName,id) => {
    formFields.cateName = cateName;
    formFields.cateId = id;
  }

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Product Upload</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<FaHome fontSize="small" />}
            />
            <StyledBreadcrumb
              label="Products"
              component="a"
              href="/products"
              deleteIcon={<MdExpandMore />}
            />
            <StyledBreadcrumb
              label="Product Upload"
              deleteIcon={<MdExpandMore />}
            />
          </Breadcrumbs>
        </div>

        <form className="form" onSubmit={addProduct}>
          <div className="row">
            <div className="col-md-12">
              <div className="card p-4 mt-0">
                <h5 className="mb-4">Basic Information</h5>
                <div className="form-group">
                  <h6>PRODUCT NAME</h6>
                  <input type="text" name="name" onChange={inputChange} />
                </div>

                <div className="form-group">
                  <h6>DESCRIPTION</h6>
                  <textarea
                    rows="5"
                    name="description"
                    onChange={inputChange}
                    cols="10"
                  ></textarea>
            
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>CATEGORY</h6>
                      <FormControl
                        // size="small"
                        className="w-100"
                        sx={{ m: 0, minWidth: 120 }}
                      >
                        <Select
                          name="category"
                          value={categoryItem}
                          onChange={handleCategoryChange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {cateData?.length !== 0 &&
                            cateData?.map((cate, index) => {
                              return (
                                <MenuItem
                                  className="text-capitalize" onClick={() => selectCate(cate.name,cate.id)}
                                  value={cate.id}
                                >
                                  {cate.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>PRICE</h6>
                      <input type="text" onChange={inputChange} name="price" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>OLD PRICE </h6>
                      <input type="text" name="oldPrice" onChange={inputChange} />
                    </div>
                  </div>
                  
                  <div className="col">
                    <div className="form-group">
                      <h6>PRODUCT STOCK </h6>
                      <input
                        type="text"
                        name="countInStock"
                        onChange={inputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>BRAND</h6>
                      <input type="text" name="brand" onChange={inputChange} />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>IS FEATURED?</h6>
                      <FormControl
                        className="w-100"
                        sx={{ m: 0, minWidth: 120 }}
                      >
                        <Select
                          name="isFeatured"
                          value={featuredSelect}
                          onChange={handleFeatureChange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={true}>True</MenuItem>
                          <MenuItem value={false}>False</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>

                <div className="row">
                <div class="col-md-4">
                    <div class="form-group">
                      <h6>DISCOUNT</h6>
                      <input
                        type="text"
                        // value={formFields.discount}
                        name="discount"
                        onChange={inputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>RATING</h6>
                      <Rating
                        name="rating"
                        value={valueRating}
                        onChange={(event, newValue) => {
                          setValueRating(newValue);
                          setFormFields({
                            ...formFields,
                            [event.target.name]: event.target.value,
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>

          <div className="card p-4 mt-0">
            <div className="imagesUploadSec">
              <h5 className="mb-4">Media and Published</h5>
              <div className="imgUploadBox d-flex align-items-center">
                {previews.length !== 0 &&
                  previews?.map((image, index) => {
                    return (
                      <div className="uploadBox" key={index}>
                        <span
                          className="remove"
                          onClick={() => removeImg(index, image)}
                        >
                          <IoMdRemove />
                        </span>
                        <div className="box">
                          <LazyLoadImage
                            alt={"image"}
                            effect="blur"
                            className="w-100"
                            src={image}
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
                          onChangeFile(e, "/api/products/upload")
                        }
                        name="images"
                      />
                      <div className="info">
                        <FaCloudUploadAlt />
                        <h5>image upload</h5>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <br />
              <Button type="submit" className="btn-blue btn-lg btn-big w-100">
                <FaCloudUploadAlt />
                &nbsp;PUBLISH AND VIEW{" "}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductUpload;
