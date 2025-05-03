import { IAdsBannerTypes } from "@/types/ads.bannerTypes";
import { API } from "../auth/route";
import {
  CREATE_BANNER_IMAGES_URL,
  DELETE_BANNER_IMAGES_URL,
  UPDATE_BANNER_IMAGES_URL,
  GET_ALL_BANNER_IMAGES_URL,
  REARRANGE_BANNER_IMAGES_URL,
} from "../api/banners-urlPath";

export interface RootBannerImageApi{
  bannerImages: IBannerImageApi[]
}

export interface IBannerImageApi {
  banner_type: IAdsBannerTypes
  banner: string
  redirectUrl: string
  context: string
  priority: number
  isEnable: boolean
}

// 1. create cover images
export const create_Banner_Image_Api = async (bannerImages: RootBannerImageApi) =>
  await API.post(`${CREATE_BANNER_IMAGES_URL}`, bannerImages, {
    withCredentials: true,
  });

export const get_All_Banner_Image_Api = async (banner_type: IAdsBannerTypes) =>
  await API.get(`${GET_ALL_BANNER_IMAGES_URL}`, {
    withCredentials: true,
    params: {
      banner_type,
    },
  });

export const reArrange_Cover_Image_Api = async (
  reorderData: { _id: string; priority: number }[]
) =>
  await API.put(
    `${REARRANGE_BANNER_IMAGES_URL}`,
    { reorderData },
    { withCredentials: true }
  );

// delete single cover image
export const delete_Cover_Image_Api = async (_id: string) =>
  await API.delete(`${DELETE_BANNER_IMAGES_URL}/${_id}`, {
    withCredentials: true,
  });

// enable banner
export const enable_Banner_Image_Api = async (id: string, isEnable: boolean) =>
  await API.put(
    `${UPDATE_BANNER_IMAGES_URL}/${id}`,
    { isEnable },
    {
      withCredentials: true,
    }
  );
