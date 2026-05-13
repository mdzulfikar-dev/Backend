// import { createProduct,getSellerProduct,getAllProducts, getProductById } from "../services/product.api";
// import { setSellerProducts, setProducts} from "../state/product.slice";
// import { useDispatch } from "react-redux";

// export const useProduct = ()=>{
//     const dispatch = useDispatch()

//     async function handleCreateProduct(formData){
//         const data = await createProduct(formData);
//         return data.product;
//     }
    

//     // for hadling the getproducts

//     async function handleGetSellerProduct(){

//         const data = await getSellerProduct()
//         dispatch(setSellerProducts(data.products))
//          return data.products

//     }
   

//     async function handleGetAllProducts(){
//         const data = await getAllProducts()
//         dispatch(setProducts(data.products))
//         return data.products
//     }
    
//     async function handleGetProductById(productId){
//         const data = await getProductById(productId)
//         return data.product
//     }

//     return {handleCreateProduct,handleGetSellerProduct,handleGetAllProducts, handleGetProductById}




// }



//////////////////
import {
  createProduct,
  getSellerProduct,
  getAllProducts,
  getProductById,
  createProductVariant,
} from "../services/product.api";

import {
  setSellerProducts,
  setProducts,
  setSingleProduct,
  setVariants,
  addVariant,
  setLoading,
  setError,
} from "../state/product.slice";

import { useDispatch } from "react-redux";

export const useProduct = () => {

  const dispatch = useDispatch();

  /*
  ========================================================
  CREATE PRODUCT
  ========================================================
  */

  async function handleCreateProduct(formData) {

    try {
        

      dispatch(setLoading(true));

      const data =
        await createProduct(formData);

      return data.product;

    } catch (error) {

      dispatch(
        setError(error.message)
      );

      console.log(error);

    } finally {

      dispatch(setLoading(false));

    }

  }

  /*
  ========================================================
  GET SELLER PRODUCTS
  ========================================================
  */

  async function handleGetSellerProduct() {

    try {

      dispatch(setLoading(true));

      const data =
        await getSellerProduct();

      dispatch(
        setSellerProducts(
          data.products
        )
      );

      return data.products;

    } catch (error) {

      dispatch(
        setError(error.message)
      );

      console.log(error);

    } finally {

      dispatch(setLoading(false));

    }

  }

  /*
  ========================================================
  GET ALL PRODUCTS
  ========================================================
  */

  async function handleGetAllProducts() {

    try {

      dispatch(setLoading(true));

      const data =
        await getAllProducts();

      dispatch(
        setProducts(data.products)
      );

      return data.products;

    } catch (error) {

      dispatch(
        setError(error.message)
      );

      console.log(error);

    } finally {

      dispatch(setLoading(false));

    }

  }

  /*
  ========================================================
  GET PRODUCT BY ID
  ========================================================
  */

  async function handleGetProductById(
    productId
  ) {

    try {

      dispatch(setLoading(true));

      const data =
        await getProductById(
          productId
        );

      /*
      STORE SINGLE PRODUCT
      */

      dispatch(
        setSingleProduct(
          data.product
        )
      );

      /*
      STORE EXISTING VARIANTS
      */

      dispatch(
        setVariants(
          data.product.variants || []
        )
      );

      return data.product;

    } catch (error) {

      dispatch(
        setError(error.message)
      );

      console.log(error);

    } finally {

      dispatch(setLoading(false));

    }

  }

  /*
  ========================================================
  CREATE PRODUCT VARIANT
  ========================================================
  */

  async function handleCreateVariant(
    productId,
    formData
  ) {

    try {
        

      dispatch(setLoading(true));

      const data =
        await createProductVariant(
          productId,
          formData
        );

      /*
      ADD VARIANT TO REDUX
      */

      dispatch(
        addVariant(
          data.variant
        )
      );

      return data.variant;

    } catch (error) {

      dispatch(
        setError(error.message)
      );

      console.log(error);

    } finally {

      dispatch(setLoading(false));

    }

  }

  return {

    handleCreateProduct,

    handleGetSellerProduct,

    handleGetAllProducts,

    handleGetProductById,

    handleCreateVariant,

  };

};