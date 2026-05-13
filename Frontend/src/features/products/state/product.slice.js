// import {  createSlice } from "@reduxjs/toolkit";

//  const productSlice = createSlice({
//     name:"product",
//     initialState:{
//         sellerProducts:[],
//         products:[]
//     },

//     reducers:{
//         setSellerProducts:(state,action)=>{
//             state.sellerProducts = action.payload
//         },
//         setProducts:(state,action)=>{
//             state.products =  action.payload
//         }
//     }
// })


// export const {setSellerProducts, setProducts} = productSlice.actions;

// export default productSlice.reducer





//////////////////////
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  /*
  ==========================================
  SELLER PRODUCTS
  ==========================================
  */

  sellerProducts: [],

  /*
  ==========================================
  ALL PRODUCTS
  ==========================================
  */

  products: [],

  /*
  ==========================================
  SINGLE PRODUCT
  ==========================================
  */

  singleProduct: null,

  /*
  ==========================================
  PRODUCT VARIANTS
  ==========================================
  */

  variants: [],

  /*
  ==========================================
  LOADING
  ==========================================
  */

  loading: false,

  /*
  ==========================================
  ERROR
  ==========================================
  */

  error: null,

};

const productSlice = createSlice({

  name: "product",

  initialState,

  reducers: {

    /*
    ==========================================
    SELLER PRODUCTS
    ==========================================
    */

    setSellerProducts: (state, action) => {

      state.sellerProducts = action.payload;

    },

    /*
    ==========================================
    ALL PRODUCTS
    ==========================================
    */

    setProducts: (state, action) => {

      state.products = action.payload;

    },

    /*
    ==========================================
    SINGLE PRODUCT
    ==========================================
    */

    setSingleProduct: (state, action) => {

      state.singleProduct = action.payload;

    },

    /*
    ==========================================
    VARIANTS
    ==========================================
    */

    setVariants: (state, action) => {

      state.variants = action.payload;

    },

    /*
    ==========================================
    ADD VARIANT
    ==========================================
    */

    addVariant: (state, action) => {

      state.variants.push(action.payload);

    },

    /*
    ==========================================
    REMOVE VARIANT
    ==========================================
    */

    removeVariant: (state, action) => {

      state.variants =
        state.variants.filter(
          (variant) =>
            variant._id !== action.payload
        );

    },

    /*
    ==========================================
    LOADING
    ==========================================
    */

    setLoading: (state, action) => {

      state.loading = action.payload;

    },

    /*
    ==========================================
    ERROR
    ==========================================
    */

    setError: (state, action) => {

      state.error = action.payload;

    },

    /*
    ==========================================
    RESET
    ==========================================
    */

    resetProductState: (state) => {

      state.singleProduct = null;

      state.variants = [];

      state.loading = false;

      state.error = null;

    },

  },

});

export const {

  setSellerProducts,

  setProducts,

  setSingleProduct,

  setVariants,

  addVariant,

  removeVariant,

  setLoading,

  setError,

  resetProductState,

} = productSlice.actions;

export default productSlice.reducer;