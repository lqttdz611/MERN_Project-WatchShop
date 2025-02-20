import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaStar } from 'react-icons/fa';
import Header from "../../components/Layout/Header";
import bannerImage from "../../images/donghonambanner.jpg";
import Listing from '../Listing';
import { fetchDataFromAPI } from '../../utils/api';





const MensWatches = () => {
  // Sample product data - replace with your actual data
  const [brandName, setBrandName] = useState([]);
  useEffect(() => {
    fetchDataFromAPI("/api/products?cateName=MEN").then((res)=> {
      console.log("data men", res);
      const brandNames = res?.productList?.map((item) => item.brand);
      const uniqueBrandNames = [...new Set(brandNames)];
      setBrandName(uniqueBrandNames);
      console.log("data brand: " ,brandName);
    })
  },[])

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
      <img src={bannerImage} className="img-fluid h-48 w-full object-cover" alt="Men's Watches" />


      <Listing />
    </div>
    </>
  );
  
};

export default MensWatches;