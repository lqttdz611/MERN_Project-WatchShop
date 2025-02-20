import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaStar } from 'react-icons/fa';
import Header from "../../components/Layout/Header";
import bannerImage from "../../images/smartwatch-banner.jpg";
import Listing from '../Listing';





const SmartWatches = () => {
  // Sample product data - replace with your actual data
  const products = [
    {
      id: 1,
      name: "Apple Watch SE 2022 GPS + Cellular, 40mm - Silver",
      brand: "Apple", 
      price: 799.90,
      rating: 4.8,
      reviews: 156,
      image: "https://mobiviet.vn/upload/sanpham/large/dong-ho-thong-minh-apple-watch-se-2022-lte-44mm-1669348708-139aa4.jpg",
      discount: 15
    },
    {
      id: 2,
      name: "Apple Watch Series 8 41mm (GPS) Viền nhôm dây cao su - Chính hãng (VN/A)",
      brand: "Apple", 
      price: 599.90,
      rating: 5,
      reviews: 15,
      image: "https://cdn.xtmobile.vn/vnt_upload/product/10_2022/thumbs/600_apple_watch_series_8_41mm_gps_vien_nhom_day_cao_su_xtmobile.png",
      discount: 40
    },
    {
      id: 3,
      name: " Apple Watch Series 6 40mm (GPS) Viền Nhôm Bạc- Dây Cao Su Trắng",
      brand: "Apple", 
      price: 499.80,
      rating: 4.8,
      reviews: 390,
      image: "https://phucanhcdn.com/media/product/40880_watch_series_6_40mm_white_ha1.jpg",
      discount: 10
    },
    {
      id: 4,
      name: " SamSung Galaxy Watch4 Classic New Chính Hãng 46 mm - GPS - Trắng",
      brand: "SamSung", 
      price: 370.80,
      rating: 4.8,
      reviews: 500,
      image: "https://smartviets.com/upload/Galaxy%20Watch/Watch4%20Classic%2046mm%20trang.jpeg",
      discount: 10
    },
    {
      id: 5,
      name: " Galaxy Watch4 Classic",
      brand: "SamSung", 
      price: 599.80,
      rating: 4.9,
      reviews: 200,
      image: "https://images.samsung.com/vn/galaxy-watch4-classic/feature/galaxy-watch4-classic-silver-better-sleep.png",
      discount: 10
    },
    {
      id: 6,
      name: "  Samsung Galaxy Watch 4 Classic BT 46mm - (R890) - Chính hãng",
      brand: "SamSung", 
      price: 499.80,
      rating: 4.8,
      reviews: 390,
      image: "https://images.samsung.com/is/image/samsung/p6pim/vn/2108/gallery/vn-galaxy-watch4-classic-399161-sm-r890nzkaxxv-481166271?$650_519_PNG$",
      discount: 10
    },
    // Add more products...
  ];

  return (
    <>
      <Header />
    <div className="container-fluid py-4">
      {/* Hero Section */}
      {/* <div className="bg-primary text-white py-4 mb-4">
        <div className="container">
          <h1 className="display-4">Men's Watches</h1>
          <p className="lead">Discover our collection of premium timepieces for men</p>
        </div>
       
    </div> */}
      <img src={bannerImage} className="img-fluid h-48 w-full object-cover" alt="Smart_Watch" />


      <Listing />
    </div>
    </>
  );
  
};

export default SmartWatches;