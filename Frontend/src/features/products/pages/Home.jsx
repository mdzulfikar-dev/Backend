import React from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/useProduct'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
    const navigate = useNavigate();
    const products = useSelector(state=>state.product.products)
    const {handleGetAllProducts} = useProduct()
    console.log(products)
    useEffect(()=>{
        handleGetAllProducts()

    },[])
    
  return (
   


     <div className='min-h-screen bg-gray-900 flex flex-wrap gap-5 p-5 justify-center'>

      {products.map((product) => {

        return (
          <div onClick={()=>navigate(`/product/${product._id}`)}
            key={product._id}
            className='w-[280px] bg-white rounded-lg overflow-hidden shadow-lg'
          >

            {/* Product Image */}
            <img
              src={product.images[0]?.url}
              alt={product.title}
              className='w-full h-60 object-cover'
            />

            {/* Product Details */}
            <div className='p-4'>

              <h1 className='text-xl font-bold'>
                {product.title}
              </h1>

              <p className='text-gray-600 mt-2'>
                {product.description}
              </p>

              <div className='flex items-center gap-2 mt-3'>
                <span className='font-semibold'>
                  {product.price.currency}
                </span>

                <span className='text-lg font-bold'>
                  {product.price.amount}
                </span>
              </div>

            </div>

          </div>
        )
      })}

    </div>


    
  )
}

export default Home
