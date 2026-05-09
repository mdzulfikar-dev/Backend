import React from 'react'
import { useProduct } from '../hook/useProduct'
import { useEffect } from 'react'

import { useSelector } from 'react-redux'



const Dashboard = () => {
    const {handleGetSellerProduct}= useProduct()
    const SellerProducts = useSelector(state=>state.product.sellerProducts)
    console.log(SellerProducts)
    useEffect(()=>{
        handleGetSellerProduct()
    

    },[])
    
    
  return (
    <div className='h-screen bg-gray-950 text-black flex gap-1 items-center justify-center flex-wrap'>
      
      {SellerProducts.map((elem,idx)=>{
        console.log(elem)
        return <div key={idx}
        className='w-70 h-100 bg-white p-5'
        >
            <div className='h-full '>
                <img className='w-full h-60 '
                //elem.images[idx].url
                src={elem?.images?.[0]?.url} alt="" />

                <div className='w-full h-auto  '>
                    <h1 className='text-center mt-1 font-semibold'>{elem.title}</h1>
                    <p className='text-center'>{elem.description}</p>

                    <div className=' flex items-center gap-2 px-5 mt-3'>
                        <h2>{elem.price.currency}</h2>
                        <h2>{elem.price.amount}</h2>
                    </div>

                </div>

            </div>
         


        </div>

      })}
    </div>
  )
}

export default Dashboard
