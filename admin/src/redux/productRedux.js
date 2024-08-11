import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.products = action.payload;
    },
    getProductsFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //Delete
    deleteProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    deleteProductsFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //update
    updateProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateProductsFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //Add New Product
    addProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.products.push(action.payload);
    },
    addProductsFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailed,
  deleteProductsStart,
  deleteProductsFailed,
  deleteProductsSuccess,
  updateProductsStart,
  updateProductsFailed,
  updateProductsSuccess,
  addProductsStart,
  addProductsFailed,
  addProductsSuccess,
} = productSlice.actions;
export default productSlice.reducer;
