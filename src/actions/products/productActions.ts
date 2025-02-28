


// 1. get all products ===

import { get_Products_Api } from "@/services/products/route";

export const getAllProductsInAdmin = async (filter?: {key:string,value:string}[]) => {
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
      console.log(response,'response');
    } catch (error) {
        console.log(error, "error getAllProductsInAdmin");
      return { status: 403, data: [], error: error };
    }
  };


  