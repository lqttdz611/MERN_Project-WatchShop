import React from 'react'
import { brandingData, productData } from '../../static/data'
import { Link } from 'react-router-dom'

const Product = () => {
  return (
    <div className='w-11/12 mx-auto mt-5'>
    
    <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>  
              </div>
            ))}
        </div>
        <h2 className="text-2xl font-medium mb-4">ĐỒNG HỒ BÁN CHẠY</h2>
         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
      {
        productData && productData.map((i,index) => (
         <div className='border shadow-lg flex flex-col items-center rounded-md p-3 hover:scale-110 duration-300 cursor-pointer'>
            <div>
               <img alt='' src={ i.image_Url[0]?.url} width={250} height={100}/>
            </div>
            <div className='mt-2'>
                <Link to="/details" className='text-sm font-[600] mb-4 block'>{i.name}</Link>
                <span className='text-gray-600'>{i.price} ₫</span>
            </div>
         </div>
        )
        )
      }
    </div>
    </div>
   
  )
}

export default Product
