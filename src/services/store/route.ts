import {
  APPROVE_SELLER_URL,
  APPROVE_STORE_URL,
  CREATE_STORE_URL,
  GET_STORE_URL,
} from "@/types/urlPath";
import { API } from "../auth/route";
import { IAdminStatus } from "@/types/storeTypes";

type DataGet = "seller" | "store" | "storeSeller";

// 1. Create a new store =================================================================

export const Create_Store_Api = async (data: any) =>
  await API.post(`${CREATE_STORE_URL}`, data, { withCredentials: true });

// 2. Get Store Or Seller or Completed users information

export const Get_Store_Api = async (data: DataGet) => {
  // console.log('Data sent:', data); // Log data here
  return await API.post(
    `${GET_STORE_URL}`,
    { role: data },
    { withCredentials: true }
  );
};

//3.   approve seller or store =============================================================
export const Approve_Seller_Api = async (
  adminStatus: IAdminStatus,
  storeId: string
) => {
  // console.log('Data sent:', data); // Log data here
  return await API.patch(`${APPROVE_SELLER_URL}/${storeId}`, {adminStatus}, {
    withCredentials: true,
  });
};

export const Approve_Store_Api = async (
  adminStatus: IAdminStatus,
  storeId: string
) => {
  // console.log('Data sent:', data); // Log data here
  return await API.patch(`${APPROVE_STORE_URL}/${storeId}`, {adminStatus}, {
    withCredentials: true,
  });
};
