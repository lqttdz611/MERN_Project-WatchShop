import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaStar } from 'react-icons/fa';
import Header from "../../components/Layout/Header";
import bannerImage from "../../images/wallclock_banner.jpg";
import Listing from '../Listing';





const WallClock = () => {
  // Sample product data - replace with your actual data
  const products = [
    {
      id: 1,
      name: "Rolex Daytona to WLR122",
      brand: "Rolex",
      price: 999.99,
      rating: 4.8,
      reviews: 156,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBXbCnAhYzweQesGS-Xz7ZJqFD-khPQyzxkA&s",
      discount: 15
    },
    {
      id: 2,
      name: "Rolex Daytona Silver RL11",
      brand: "Rolex",
      price: 1099.99,
      rating: 4.9,
      reviews: 126,
      image: "https://decorandmore.vn/wp-content/uploads/2023/08/Daytona-Rolex-RL11_01.jpg",
      discount: 10
    },
    {
      id: 3,
      name: "Omega Silver RL11",
      brand: "Omega",
      price: 499.99,
      rating: 4.9,
      reviews: 166,
      image: "https://product.hstatic.net/1000093649/product/5_c95bb33c946547fd833e609c977093c4_medium.jpg",
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
      <img src={bannerImage} className="img-fluid h-48 w-full object-cover" alt="Wall Clock" />


      <Listing />
    </div>
    </>
  );
  
};

export default WallClock;