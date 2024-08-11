import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
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
} from "./productRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductsStart());
  try {
    const res = await publicRequest.get("/products/?new=true");
    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailed());
  }
};
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductsStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    if (res.data.success) {
      dispatch(deleteProductsSuccess(id));
    } else {
      dispatch(deleteProductsFailed());
    }
  } catch (error) {
    dispatch(deleteProductsFailed());
  }
};

export const upadateProduct = async (id,product, dispatch) => {
  dispatch(updateProductsStart());
  try {
    const res = await userRequest.put(`/products/${id}`,product);
    if (res.data.success) {
      dispatch(updateProductsSuccess({id:id,product:res.data.product}));
    } else {
      dispatch(updateProductsFailed());
    }
  } catch (error) {
    dispatch(updateProductsFailed());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductsStart());
  try {
    const res = await userRequest.post(`/products/`,product);
    if (res.data.success) {
      dispatch(addProductsSuccess(res.data.product));
    } else {
      dispatch(addProductsFailed());
    }
  } catch (error) {
    dispatch(addProductsFailed());
  }
};
