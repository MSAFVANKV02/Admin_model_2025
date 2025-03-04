// 1. get all products ===

import { fetchProducts } from "@/redux/actions/product_Slice";
import { dispatch } from "@/redux/hook";
import {
  change_Product_Status_Api,
  delete_Product_Api,
  get_Products_Api,
  restore_Deleted_Product_Api,
  toggle_Product_Api,
} from "@/services/products/route";
import { IProductStatus } from "@/types/productType";
import { makeToast } from "@/utils/toaster";

export const getAllProductsInAdmin = async (
  filter?: { key: string; value: string }[]
) => {
  try {
    const response = await get_Products_Api(filter);
    if (response.status === 200) {
      // return { status: 200, data: response.data.file };
      return {
        status: response.status,
        data: response.data.products,
        message: response.data.message,
      };
    }
    console.log(response, "response");
  } catch (error) {
    console.log(error, "error getAllProductsInAdmin");
    return { status: 403, data: [], error: error };
  }
};

// 2. change product status
export const changeProductStatus = async (
  productId: string,
  status: IProductStatus
) => {
  try {
    const response = await change_Product_Status_Api({ productId, status });
    if (response.status === 200) {
      // return { status: 200, data: response.data.file };
      return {
        status: response.status,
        data: response.data.product,
        message: response.data.message,
      };
    }
    console.log(response, "response");
  } catch (error) {
    console.log(error, "error changeProductStatus");
    return { status: 403, data: [], error: error };
  }
};

// 3. update product toggle
export const changeProductToggle = async (data: {
  productId: string;
  fieldName: string;
  storeIds: string[] ;
}) => {
  try {
    const response = await await toggle_Product_Api(data);
    if (response.status === 200) {
      // return { status: 200, data: response.data.file };
      return {
        status: response.status,
        data: response.data.product,
        message: response.data.message,
      };
    }
    console.log(response, "response");
  } catch (error) {
    console.log(error, "error changeProductStatus");
    return { status: 403, data: [], error: error };
  }
};


// 4. Delete product 
export const DeleteProductFn = () => {


  const softDeleteProductFn = async (data:{productId?: string}) => {
    try {
      const response = await delete_Product_Api(data);

      if (response.status === 200) {
        dispatch(fetchProducts());
        makeToast(response.data.message)

        return {
          status: response.status,
          data: response.data.data,
          message: response.data.message,
        };
      
      }
    } catch (error) {
      console.log(error, "error toggle");

      return { status: 403, data: [], error: error };
    }
  };

  // 2. hard delete all categories ======
  const hardDeleteAllProductsFn = async (data:{hardDelete?:boolean}) => {
    try {
      const response = await delete_Product_Api(data);

      if (response.status === 200) {
        dispatch(fetchProducts());
        makeToast(response.data.message)

        return {
          status: response.status,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.log(error, "error toggle");

      return { status: 403, data: [], error: error };
    }
  };


  // 5. hard delete single categories ======
 // 2. hard delete all categories ======
 const hardDeleteSingleProductFn = async (data:{productId?: string, hardDelete?:boolean}) => {
  try {
    const response = await delete_Product_Api(data);

    if (response.status === 200) {
      dispatch(fetchProducts());
      makeToast(response.data.message)

      return {
        status: response.status,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(error, "error toggle");

    return { status: 403, data: [], error: error };
  }
};

const restoreDeletedProductFn = async (id:string) => {
  try {
    const response = await restore_Deleted_Product_Api(id);

    if (response.status === 200) {
      dispatch(fetchProducts());
      makeToast(response.data.message)

      return {
        status: response.status,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(error, "error toggle");

    return { status: 403, data: [], error: error };
  }
};

  return {
    softDeleteProductFn,
    hardDeleteAllProductsFn,
    hardDeleteSingleProductFn,
    restoreDeletedProductFn
  };
};