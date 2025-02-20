
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Autoplay, Navigation } from "swiper/modules";
// import banner1 from "../../Assets/images/banner1.jpg";
// import banner2 from "../../Assets/images/banner2.jpg";
// import banner3 from "../../Assets/images/banner3.jpg";
// import banner4 from "../../Assets/images/banner4.jpg";

// const Hero = () => {
//   return (
//     <>
//       <div className="container mt-3 pl-0">
//         <div className="homeBannerSection">
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={0}  /* Set space between slides to 0 */
//             navigation={true}
//             autoplay={{
//               delay: 2500,
//               disableOnInteraction: false,
//             }}
//             modules={[Navigation, Autoplay]}
//             loop={false}
//             className="mySwiper"
//           >
//             {[banner1, banner2, banner3, banner4].map((banner, index) => (
//               <SwiperSlide key={index}>
//                 <div className="item">
//                   <img src={banner} className="banner-img w-100" alt={`Banner ${index + 1}`} />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hero;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import banner1 from "../../Assets/images/banner1.jpg";
import banner2 from "../../Assets/images/banner2.jpg";
import banner3 from "../../Assets/images/banner3.jpg";
import banner4 from "../../Assets/images/banner4.jpg";

const Hero = () => {
  return (
    // 
    <div className="container-fluid mt-3 "> {/* Đổi sang container-fluid nếu cần */}
  <div className="homeBannerSection">
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay]}
      loop={false}
      className="mySwiper"
    >
      {[banner1, banner2, banner3, banner4].map((banner, index) => (
        <SwiperSlide key={index}>
          <div className="item">
            <img src={banner} className="banner-img" alt={`Banner ${index + 1}`} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>

  );
};

export default Hero;
