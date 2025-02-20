import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { BsCartPlus } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { BsCartCheck } from "react-icons/bs";
import { productDataDetails } from "../../static/data";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  return (
    <div>
      <Header />
      <div className="bg-[#ebebeb]">
        <div className="w-12/12 mx-auto p-14">
          <div className="flex bg-white justify-between px-16 py-14 border shadow-md rounded-md">
            <div className="w-[40%]">
              <div className="flex items-center justify-center mb-5">
                <img
                  alt=""
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/w/a/watch_se_44.png"
                  width={300}
                />
              </div>

              <div className="flex items-center justify-center">
                <img
                  alt=""
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-watch-ultra-2-49mm-4g_3_.jpg"
                  width={120}
                  className="border rounded-md mx-1 shadow-md"
                />
                <img
                  alt=""
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/3/_/3_231_2.jpg"
                  width={120}
                  className="border rounded-md mx-1 shadow-md"
                />
                <img
                  alt=""
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/3/_/3_231_7_1_1_1_1.jpg"
                  width={120}
                  className="border rounded-md mx-1 shadow-md"
                />
              </div>
            </div>
            <div className="w-[40%]">
              <h1 className="text-2xl font-medium text-[#0a263c]">
                Đồng hồ thông minh Apple Watch Series 9 GPS 41mm viền nhôm dây
                thể thao
              </h1>

              <select className="p-2 border outline-blue-600 focus:border-blue-600 mt-5">
                <option>Size</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
              </select>

              <div className="flex items-center justify-start mt-5 mb-5">
                <span className="px-4 py-1 rounded-sm text-lg bg-black text-white flex items-center justify-center cursor-pointer">
                  -
                </span>
                <p className="px-4 py-1.5 border">1</p>
                <span className="px-4 py-1 rounded-sm text-xl bg-black text-white flex items-center justify-center cursor-pointer">
                  +
                </span>
              </div>

          
              <span className="text-2xl text-gray-600">12.000.000 ₫</span>

              <div className="border cursor-pointer rounded-md py-3 text-center w-full flex items-center justify-center bg-blue-600 text-white mt-5 mb-5">
                <BsCartCheck size={25} className="mr-2" />
                <button className="font-medium text-xl">Mua ngay</button>
              </div>

              <div className="flex justify-between gap-3">
                <div className="bg-white border cursor-pointer rounded-md py-3 text-center shadow-sm w-[50%] flex items-center justify-center hover:bg-blue-600 hover:text-white duration-300 hover:scale-105">
                  <BsCartPlus size={25} className="mr-2" />
                  <button className="font-medium text-lg">
                    Thêm vào giỏ hàng
                  </button>
                </div>
                <div className="bg-white border cursor-pointer shadow-sm rounded-md py-3 text-center w-[50%] flex items-center justify-center  hover:bg-blue-600 hover:text-white duration-300 hover:scale-105">
                  <FaRegHeart size={25} className="mr-2" />
                  <button className="font-medium text-lg">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white mt-5 rounded-md py-4 px-6">
            <h2 className="text-2xl font-medium mb-4">Các sản phẩm liên quan</h2>
            <div className="grid grid-cols-5 gap-6">
              {productDataDetails &&
                productDataDetails.map((i, index) => (
                  <div className="border px-5 shadow-md py-5">
                    <img alt="" src={i.image_Url[0].url} />
                    <div>
                      <Link className="font-medium">{i.name}</Link>

                      <button className=" bg-[#E90628] text-white border cursor-pointer font-medium  rounded-2xl py-2 px-2 text-center shadow-sm w-full flex items-center justify-center hover:bg-blue-600 hover:text-white duration-300 hover:scale-105font-medium text-md mt-5">
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
