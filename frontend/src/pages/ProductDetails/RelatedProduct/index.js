import React from 'react'
import { Button } from "@mui/material";
import { IoMdArrowRoundForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation }from "swiper/modules";
import ProductItem from '../../../components/ProductItem';

const RelatedProduct = (props) => {

  return (
    <>
    <div className="d-flex align-items-center mt-3 mb-4">
                <div className="info w-75 ">
                  <h3 className="mb-0 hd">{props.title}</h3>
                  
                </div>

                {/* <Button className="viewAllBtn ml-auto">
                  View All <IoMdArrowRoundForward />
                </Button> */}
              </div>

              <div className="product_row w-100 mt-0 mb-5" >
                <Swiper
                  slidesPerView={5}
                  spaceBetween={10}
                  navigation={true}
                  slidesPerGroup={3}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                   {props?.relatedProduct?.length !== 0 &&
            props?.relatedProduct?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <ProductItem dataProduct={item} itemView={props.itemView} />
                </SwiperSlide>
              );
            })}
                </Swiper>
              </div></>
  )
}

export default RelatedProduct