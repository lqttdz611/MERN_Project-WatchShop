import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaStar } from 'react-icons/fa';
import Header from "../../components/Layout/Header";
import bannerImage from "../../images/donghonubanner.jpg";
import Listing from '../Listing';

const WomensWatches = () => {
  // Sample product data - replace with your actual data
  const products = [
    {
      id: 1,
      name: "Rolex Geneve",
      brand: "Rolex",
      rating: 5,
      reviews: 156,
      image: "https://bossluxurywatch.vn/uploads/tin-tuc/0-anh-bai-tin-tuc-vuacontent/ngay-1-12/3-dong-ho-rolex-geneve-nu-10.jpg",
      price: 530.000,
      discount: 15
    },
    {
      id: 2,
      name: "Rolex Datejust 31 278240-0007 Mặt Số Hồng Dây Đeo Oyster",
      brand: "Rolex",
      image: "https://empireluxury.vn/wp-content/uploads/2022/04/dong-ho-rolex-datejust-31-278240-0007-mat-so-hong-day-deo-oyster-1.jpg",
      rating: 4.8,
      price: 600.20
    },
    {
      id: 3,
      name: "Omega Sapphire OM03",
      brand: "Omega",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtOuPmzENCWVyMWUvJmVLPzOTnfrmmjyIxFQ&s",
      rating: 4.7,
      reviews: 120,
      price: 249.99
    },
    {
      id: 4,
      name: "Omega Aqua Terra 150m Master Co‑Axial Ladies",
      brand: "Omega",
      image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/418/162/products/omega-seamaster-aqua-terra-150m-23158392155002-l.png?v=1651999254043",
      rating: 5,
      price: 590.2
    },
    
    {
      id: 5,
      name: "Tag Heuer Aquaracer",
      brand: "Tag Heuer",
      image: "https://www.giadongho.vn/images/users/images/dong-ho-tag-heuer-nu-4-mau-dong-ho-quy-phai-sang-trong%20(14).png",
      rating: 4.9,
      price: 100.20
    },
    {
      id: 6,
      name: "Tag Heuer Carrera Date",
      brand: "Tag Heuer",
      image: "https://www.giadongho.vn/images/users/images/dong-ho-tag-heuer-nu-4-mau-dong-ho-quy-phai-sang-trong%20(1).png",
      rating: 4.9,
      price: 300.20
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
          <h1 className="display-4">Women's Watches</h1>
          <p className="lead">Discover our collection of premium timepieces for men</p>
        </div>
        
      </div> */}

      <img src={bannerImage} className="img-fluid h-48 w-full object-cover" alt="Women's Watches" />
      
      <Listing />
      
    </div>
    </>
  );
  
};

export default WomensWatches;