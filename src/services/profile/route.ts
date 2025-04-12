import { StoreTypes } from "@/types/storeTypes";
import {  RESET_PASSWORD_URL, UPDATE_PROFILE_URL, UPDATE_STORE_OR_SELLER_URL } from "../api/urlPath";
import { API } from "../auth/route";


// user data updates delete avatar also works --------------------------------
export const update_profile_Api = async (data:any) =>
    await API.put(`${UPDATE_PROFILE_URL}`,{avatar:data}, { withCredentials: true });

//2. user password updates --------------------------------
export const reset_store_password_Api = async (data:{
    oldPassword:string;
    newPassword:string;
}) =>
    await API.put(`${RESET_PASSWORD_URL}`,data, { withCredentials: true });

//2. user password updates --------------------------------
export const update_storeOrSeller_Api = async (data:Partial<StoreTypes>) =>
    await API.put(`${UPDATE_STORE_OR_SELLER_URL}/${data._id}`,data, { withCredentials: true });

// DELETE ADMIN SELLER AVATAR --------------------------------
// export const delete_Profile_Avatar_Api = async (id:string) =>
//     await API.delete(`${DELETE_PROFILE_AVATAR_URL}/${id}`, { withCredentials: true });