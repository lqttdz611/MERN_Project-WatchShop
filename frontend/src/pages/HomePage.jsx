import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header';
import Product from '../components/Product/Product';
import Hero from '../components/Hero/Hero';
import Footer from '../components/Layout/Footer';
import { Button } from "@mui/material";
import { IoMdArrowRoundForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation }from "swiper/modules";
import ProductItem from '../components/ProductItem';
import banner1 from "../Assets/images/verticalBanner1.webp"
import banner2 from "../Assets/images/verticalBanner1.2.webp"
import banner3 from "../Assets/images/verticalBanner2.png"
import banner4 from "../Assets/images/verticalBanner3.webp"
import { fetchDataFromAPI } from '../utils/api';
const HomePage = () => {
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    fetchDataFromAPI(`/api/products/featured`).then((res) => {
      setFeaturedProduct(res);
      console.log(res);
    });

    fetchDataFromAPI("/api/products?perPage=8").then((res) => {
      setProductData(res);
      console.log("new product",res);
    });
  }, [])
  
  return (

    <div className='bg-gray-50'>
      {/* <Header/> */}
      <Hero/>

      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sticky">
              <div className="banner">
                <img
                  src={banner1}
                  className="cursor w-100"
                  alt="products for sale"
                ></img>
              </div>
              <div className="banner mt-3">
                <img
                  src={banner2}
                  className="cursor w-100"
                  alt="products for sale"
                ></img>
              </div>
              </div>
            </div>
            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center">
                <div className="info w-75 ">
                  <h3 className="mb-0 hd">BEST SELLERS</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>

                <Button className="viewAllBtn ml-auto">
                  View All <IoMdArrowRoundForward />
                </Button>
              </div>

              <div className="product_row w-100 mt-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  navigation={true}
                  slidesPerGroup={3}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {
                    featuredProduct?.length!== 0 && featuredProduct?.map((item,index) => {
                      return (
                        <SwiperSlide  key={index}>
                    <ProductItem dataProduct={item} />
                  </SwiperSlide>
                      )
                    })
                  }
                  
                </Swiper>
              </div>



              <div className="d-flex align-items-center mt-5">
                <div className="info w-75 ">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-light text-sml mb-0">
                    New products with updated stocks.
                  </p>
                </div>

                <Button className="viewAllBtn ml-auto">
                  View All <IoMdArrowRoundForward />
                </Button>
              </div>

              <div className="product_row productRow2 w-100 mt-4 d-flex ">
                {productData?.productList?.length !== 0 &&
                  productData?.productList?.map((item, index) => {
                    return <ProductItem key={index} dataProduct={item} />;
                  })}
              </div>

              <div className="d-flex mt-4 mb-5 bannerSec">
              <div className="banner mr-2">
                <img
                  src={banner3}
                  className="cursor w-100"
                  alt="products banner"
                ></img>
              </div>
              <div className="banner ml-2">
                <img
                  src={banner4}
                  className="cursor w-100"
                  alt="products banner"
                ></img>
              </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default HomePage;
