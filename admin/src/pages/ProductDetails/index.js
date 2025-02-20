import Rating from "@mui/material/Rating";
import { Breadcrumbs, Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import Chip from "@mui/material/Chip";
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { emphasize, styled } from "@mui/material/styles";
import Slider from "react-slick";
import { IoColorPaletteSharp } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { LuFolderCheck } from "react-icons/lu";
import { TfiHandPointLeft } from "react-icons/tfi";
import { MyContext } from "../../App";
import AvatarUser from "../../components/userAvatarImg";
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

const ProductDetails = () => {
  const productSliderBig = useRef();
  const productSliderSml = useRef();

  const goToSlide = (index) => {
    if (productSliderBig.current) {
      productSliderBig.current.slickGoTo(index);
    }
  };
  var productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  var productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Product List</h5>
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
              label="Product View"
              deleteIcon={<MdExpandMore />}
            />
          </Breadcrumbs>
        </div>

        <div className="card productDetailsSection">
          <div className="row">
            <div className="col-md-5">
              <div className="slideWrapper pt-3 pb-3 pl-4 pr-4">
                <h6 class="mb-4">Product Gallery</h6>

                <Slider className="sliderBig mb-2" {...productSliderOptions} ref={productSliderBig}>
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/02.webp"
                      className="w-100"
                    ></img>
                  </div>

                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                      className="w-100"
                    ></img>
                  </div>

                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/05.webp"
                      className="w-100"
                    ></img>
                  </div>

                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/03.webp"
                      className="w-100"
                    ></img>
                  </div>

                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/04.webp"
                      className="w-100"
                    ></img>
                  </div>
                </Slider>


                <Slider className="sliderSml" {...productSliderSmlOptions} ref={productSliderSml}>
                  <div className="item" onClick={() => 
                    goToSlide(1)
                  }>
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                      className="w-100"
                    ></img>
                  </div>
                  <div className="item" onClick={() => 
                    goToSlide(2)
                  }>
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/05.webp"
                      className="w-100"
                    ></img>
                  </div>
                  <div className="item" onClick={() => 
                    goToSlide(3)
                  }>
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/03.webp"
                      className="w-100"
                    ></img>
                  </div>
                  <div className="item" onClick={() => 
                    goToSlide(4)
                  }>
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/04.webp"
                      className="w-100"
                    ></img>
                  </div>
                </Slider>
              </div>
            </div>

            <div className="col-md-7">
              <div className="pt-3 pb-3 pl-4 pr-4">
                <h6 class="mb-4">Product Details</h6>
                <h4>
                  Formal suits for men wedding slim fit 3 piece dress business
                  party jacket
                </h4>
                <div className="productInfo mt-4">
                  <div className="row mb-2">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <MdOutlineBrandingWatermark />
                      </span>
                      <span className="name">Brand</span>
                    </div>
                    <div class="col-sm-9">
                      <span>Ecstasy</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <BiCategoryAlt />
                      </span>
                      <span className="name">Category</span>
                    </div>
                    <div class="col-sm-9">
                      <span>Man's</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <BiCategoryAlt />
                      </span>
                      <span className="name">Category</span>
                    </div>
                    <div className="col-sm-9">
                      <span>
                        <div className="row">
                          <ul className="list list-inline tags sml">
                            <li class="list-inline-item">
                              <span>SUITE</span>
                            </li>
                            <li class="list-inline-item">
                              <span>PARTY</span>
                            </li>
                            <li class="list-inline-item">
                              <span>DRESS</span>
                            </li>
                            <li class="list-inline-item">
                              <span>SMART</span>
                            </li>
                            <li class="list-inline-item">
                              <span>MAN</span>
                            </li>
                          </ul>
                        </div>
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <IoColorPaletteSharp />
                      </span>
                      <span className="name">Color</span>
                    </div>
                    <div className="col-sm-9">
                      <span>
                        <div className="row">
                          <ul className="list list-inline tags sml">
                            <li class="list-inline-item">
                              <span>RED</span>
                            </li>
                            <li class="list-inline-item">
                              <span>BLUE</span>
                            </li>
                            <li class="list-inline-item">
                              <span>WHITE</span>
                            </li>
                          </ul>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <BiCategoryAlt />
                      </span>
                      <span className="name">Size</span>
                    </div>
                    <div class="col-sm-9">
                      <span>(68) Piece</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <MdOutlineRateReview />
                      </span>
                      <span className="name">Review</span>
                    </div>
                    <div class="col-sm-9">
                      <span>(03) Reviews</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <LuFolderCheck />
                      </span>
                      <span className="name">Published</span>
                    </div>
                    <div class="col-sm-9">
                      <span>Nov 02 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h6 class="mt-4 mb-3">Product Description</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Tom
              lai la 2 chai coca nhu moi khi trong tuan! Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Tom lai la 2 chai
              coca nhu moi khi trong tuan!
            </p>
            <br />
            <h6 class="mt-4 mb-4">Rating Analytics</h6>
            <div className="ratingSection">
              <div class="ratingrow d-flex align-items-center">
                <span class="col1">5 Star</span>
                <div class="col2">
                  <div class="progress">
                    <div class="progress-bar" style={{ width: "70%" }}></div>
                  </div>
                </div>
                <span class="col3">(22)</span>
              </div>
              <div class="ratingrow d-flex align-items-center">
                <span class="col1">4 Star</span>
                <div class="col2">
                  <div class="progress">
                    <div class="progress-bar" style={{ width: "70%" }}></div>
                  </div>
                </div>
                <span class="col3">(12)</span>
              </div>
              <div class="ratingrow d-flex align-items-center">
                <span class="col1">3 Star</span>
                <div class="col2">
                  <div class="progress">
                    <div class="progress-bar" style={{ width: "50%" }}></div>
                  </div>
                </div>
                <span class="col3">(3)</span>
              </div>
              <div class="ratingrow d-flex align-items-center">
                <span class="col1">2 Star</span>
                <div class="col2">
                  <div class="progress">
                    <div class="progress-bar" style={{ width: "10%" }}></div>
                  </div>
                </div>
                <span class="col3">(1)</span>
              </div>
              <div class="ratingrow d-flex align-items-center">
                <span class="col1">1 Star</span>
                <div class="col2">
                  <div class="progress">
                    <div class="progress-bar" style={{ width: "0%" }}></div>
                  </div>
                </div>
                <span class="col3">(0)</span>
              </div>
            </div>
            <br />
            <h6 class="mt-4 mb-4">Customer_reviews</h6>
            <div className="reviewsSection">
              <div className="reviewsRow">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                      <AvatarUser lg={true} image="https://pbs.twimg.com/media/FoUoGo3XsAMEPFr?format=jpg&name=4096x4096"/>
                        <div className="info pl-3">
                          <h6>Cristiano Siuuu</h6>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>
                      <Rating name="read-only" value={4} readOnly />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center">
                    <div className="ml-auto">
                      <Button className="btn-blue btn-big btn-lg ml-auto">
                        <TfiHandPointLeft /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>

                  <p class="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis quo nostrum dolore fugiat ducimus labore debitis unde
                    autem recusandae? Eius harum tempora quis minima, adipisci
                    natus quod magni omnis quas.
                  </p>
                </div>
              </div>

              <div className="reviewsRow reply">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                      <AvatarUser lg={true} image="https://image.dienthoaivui.com.vn/x,webp,q90/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/editor_upload/hinh-nen-messi-4k-19.jpg"/>
                        <div className="info pl-3">
                          <h6>Cristiano Siuuu</h6>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>
                      <Rating name="read-only" value={4} readOnly />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center">
                    <div className="ml-auto">
                      <Button className="btn-blue btn-big btn-lg ml-auto">
                        <TfiHandPointLeft /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>

                  <p class="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis quo nostrum dolore fugiat ducimus labore debitis unde
                    autem recusandae? Eius harum tempora quis minima, adipisci
                    natus quod magni omnis quas.
                  </p>
                </div>
              </div>
              <div className="reviewsRow reply">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                      <AvatarUser lg={true} image="https://afamilycdn.com/150157425591193600/2022/12/19/worldcupmessi-16714134707591286548462-1671414492850-1671414494903186357457-1671464902187-1671464903696996029140.jpeg"/>
                        <div className="info pl-3">
                          <h6>Cristiano Siuuu</h6>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>
                      <Rating name="read-only" value={4} readOnly />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center">
                    <div className="ml-auto">
                      <Button className="btn-blue btn-big btn-lg ml-auto">
                        <TfiHandPointLeft /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>

                  <p class="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis quo nostrum dolore fugiat ducimus labore debitis unde
                    autem recusandae? Eius harum tempora quis minima, adipisci
                    natus quod magni omnis quas.
                  </p>
                </div>
              </div>
              <div className="reviewsRow">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                      <AvatarUser lg={true} image="https://i.etsystatic.com/18270108/r/il/edb706/6096084304/il_570xN.6096084304_j6fw.jpg"/>
                        <div className="info pl-3">
                          <h6>Cristiano Siuuu</h6>
                          <span>30 minutes ago!</span>
                        </div>
                      </div>
                      <Rating name="read-only" value={4} readOnly />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center">
                    <div className="ml-auto">
                      <Button className="btn-blue btn-big btn-lg ml-auto">
                        <TfiHandPointLeft /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>

                  <p class="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis quo nostrum dolore fugiat ducimus labore debitis unde
                    autem recusandae? Eius harum tempora quis minima, adipisci
                    natus quod magni omnis quas.
                  </p>
                </div>
              </div>
            </div>

            <h6 className="mt-4 mb-4">Review Reply Form</h6>
            <form className="reviewForm">
              <textarea placeholder="Write your comment... "></textarea>
              <Button className="btn-blue btn-big btn-lg w-100 mt-4">
                Drop Your Replies
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
