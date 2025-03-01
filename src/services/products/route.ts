import {
  CREATE_PRODUCT_URL,
  GET_PRODUCTS_URL,
  TOGGLE_PRODUCTS_URL,
} from "@/types/urlPath";
import { API } from "../auth/route";
import { IProdAddRoot } from "@/types/add_Prod_Types";

// * 1. Create a new Product ====
export const add_Product_Api = (data: Partial<IProdAddRoot>) =>
  API.post(CREATE_PRODUCT_URL, data, { withCredentials: true });

// 2. get all product in Dashboard ==========
export const get_Products_Api = (
  filters?: { key: string; value: string }[]
) => {
  const params: Record<string, string> = {};

  if (filters) {
    filters.forEach((filter) => {
      params[filter.key] = filter.value; // ✅ Convert array to query parameters
    });
  }

  return API.get(GET_PRODUCTS_URL, {
    withCredentials: true,
    params, // ✅ Send dynamic query params
  });
};

export const toggle_Product_Api = (data: {
  productId: string;
  fieldName: string;
}) =>
  API.put(
    `${TOGGLE_PRODUCTS_URL}/${data.productId}/${data.fieldName}`,
    {},
    { withCredentials: true }
  );
