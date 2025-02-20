import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import React, { useContext, useRef, useState } from "react";

const ProductZoom = (props) => {
  
  const [slideIndex, setSlideIndex] = useState();
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();


  const goto = (index) => {
    zoomSlider.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };


  return (
    <>
      <div className="productZoom">
        <div className="productZoom productZoomBig position-relative mb-2">
          <div className="badge badge-primary">{props.discount}%</div>
          
          <Swiper
          slidesPerView={1}
          spaceBetween={0}
          navigation={false} slidesPerGroup={1} modules={[Navigation]} className="zoomSliderBig" ref={zoomSliderBig}>
            {
              props.images?.map((item,index) => {
                return( 
                  <SwiperSlide key={index}>
                  <div className="item">
                    <InnerImageZoom
                    zoomType="hover" 
                    zoomScale={1}
                    src={item} >
                    </InnerImageZoom>
                  </div>
                  </SwiperSlide>
                )
              })
            }

          </Swiper>
        </div>

        <Swiper slidesPerView={5} spaceBetween={0} navigation={true}
        slidesPerGroup={1}  modules={[Navigation]} className="zoomSlider" ref={zoomSlider}
        >
           {
              props.images?.map((item,index) => {
                return( 
                  <SwiperSlide>
                  <div className={`item ${slideIndex === index && 'item_active'}`} key={index}>
                    <img src={item} className="w-100"
                    onClick={() => goto(index)} />
                  </div>
                  </SwiperSlide>
                )
              })
            }

        </Swiper>
      </div>
    </>
  );
};
export default ProductZoom;
