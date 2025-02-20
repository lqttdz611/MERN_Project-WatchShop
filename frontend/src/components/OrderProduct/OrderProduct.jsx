import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineGift } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa6";

const OrderProduct = () => {
  return (
    <div>
      <Header />
      <div className="m-10">
        <div className="mb-3 ml-16">
          <Link
            to="/"
            className="text-blue-600 text-lg font-semibold underline"
          >
            Trang chủ / Đặt hàng
          </Link>
        </div>
        <div className="flex bg-white px-16 py-6 border-b border-gray-400">
          <div className="w-[40%]">
            <div className="flex items-center justify-start mb-5">
              <img
                alt=""
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/w/a/watch_se_44.png"
                width={250}
              />
            </div>
          </div>
          <div className="w-[70%]">
            <h1 className="text-2xl font-medium text-[#0a263c]">
              Đồng hồ thông minh Apple Watch Series 9 GPS 41mm viền nhôm dây thể
              thao
            </h1>

            <div className="flex items-center mt-5">
              <div className="flex items-center justify-start mt-5 mb-5 mr-5">
                <span className="px-4 py-1 rounded-sm text-lg bg-black text-white flex items-center justify-center cursor-pointer">
                  -
                </span>
                <p className="px-4 py-1.5 border">1</p>
                <span className="px-4 py-1 rounded-sm text-xl bg-black text-white flex items-center justify-center cursor-pointer">
                  +
                </span>
              </div>

              <span className="text-xl text-gray-600">12.000.000 ₫</span>
            </div>

            <div className="flex bg-red-600 w-[100px] py-2 rounded-md text-white mt-5">
              <MdOutlineDelete size={25} className="ml-2 mr-1" />
              <button className="font-medium text-lg">Xóa</button>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex text-[#ed1010]">
            <AiOutlineGift size={25} className="mr-2" />
            <p className="font-medium text-xl">Phiếu ưu đãi</p>
          </div>
          <div className="flex justify-between pr-20 pl-20 mt-5">
            <span className="w-[400px] py-2 border text-xl text-center font-medium outline">
              Mã ưu đãi
            </span>
            <button className="w-[200px] text-xl py-2 bg-red-600 text-white rounded-md">
              Áp dụng
            </button>
          </div>

          <div className="flex gap-4 p-2">
          <div className="mt-4 w-[50%] border-[2px] px-4 py-6  shadow-md">
        <form>
          <input placeholder="Nhập địa chỉ của bạn"/>
        </form>
      </div>

      <div className="mt-4 w-[50%] border-[2px] px-4 py-6  shadow-md flex flex-col items-center justify-center">
        <h2 className="text-2xl font-medium mb-2  ">Vận Chuyển</h2>
        <p className="text-lg mb-4">Vui lòng nhập thông tin giao hàng</p>
        <div className="flex items-center justify-center mb-4">
        <FaMoneyCheck size={25}/>
          <span className="font-medium ml-2 text-xl">Phương thức thanh toán</span>
        </div>

        <div class="inline-flex items-center">
    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="ripple-on"
      data-ripple-dark="true">
      <input id="ripple-on" type="checkbox"
        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-00 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10" />
      <span
        class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
          stroke="currentColor" stroke-width="1">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"></path>
        </svg>
      </span>
    </label>
    <label class="mt-px text-lg font-medium cursor-pointer select-none" htmlFor="ripple-on">
      Chuyển khoản ngân hàng
    </label>
  </div>
  <div class="flex items-center">
    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="ripple-off">
      <input id="ripple-off" type="checkbox"
        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10" />
      <span
        class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
          stroke="currentColor" stroke-width="1">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"></path>
        </svg>
      </span>
    </label>
    <label class="mt-px text-lg font-medium cursor-pointer select-none" htmlFor="ripple-off">
      Thanh toán khi giao hàng
    </label>
  </div>

        
      </div>
          </div>
       

          <div className="p-2 mb-5">
            <div className="flex justify-between border-b mt-2 border-gray-400">
              <p className="font-medium text-lg">Tạm tính</p>
              <span className="font-medium text-lg py-2">12.000.000 ₫</span>
            </div>
            <div className="flex justify-between border-b mt-2 border-gray-400">
              <p className="font-medium text-lg">Tổng</p>
              <span span className="font-medium text-lg py-2">
                12.000.000 ₫
              </span>
            </div>
          </div>
          <button className="mx-auto w-[200px] text-xl py-2 bg-blue-600 text-white rounded-md flex justify-center items-center">
            Đặt hàng
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderProduct;
