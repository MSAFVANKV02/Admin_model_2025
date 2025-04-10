import { CREATE_NEW_COUPONS, GET_ALL_COUPONS } from "../api/coupon-urlPath";
import { API } from "../auth/route";

import { ICouponType } from "@/types/ICouponTypes";

export const create_Coupons_Api = async (data: Partial<ICouponType>) =>
  await API.post(CREATE_NEW_COUPONS, data, { withCredentials: true });


export const get_Coupons_Api = async () =>
    await API.get(GET_ALL_COUPONS,{ withCredentials: true });