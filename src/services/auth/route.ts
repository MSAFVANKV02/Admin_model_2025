import {
  ADMIN_SEND_OTP,
  CREATE_SUB_ADMIN_URL,
  DELETE_ADMIN_URL,
  GET_ADMIN_URL,
  UPDATE_SUB_ADMIN_URL,
} from "@/types/urlPath";
import axios from "axios";

const API = axios.create({
  baseURL: `${
    import.meta.env.MODE == "development"
      ? "http://localhost:4000"
      : "https://gateway.ayaboo.com"
  }`,
});

export const SendOtp_Login_Api = async (data: {
  email: string;
  password: string;
}) => await API.post(ADMIN_SEND_OTP, data, { withCredentials: true });
// -------------------------Send Otp For Registration---------------------------------------

// -------- create sub admins ----------------
export const Create_Sub_Admins_Api = async (data: {
  email: string;
  password: string;
  name: string;
  role: string;
  pages: string[];
  mobile: string;
}) => await API.post(CREATE_SUB_ADMIN_URL, data, { withCredentials: true });

// -------- update sub admins ----------------
export const Update_Sub_Admins_Api = async (data: {
  email: string;
  password: string;
  name: string;
  role: string;
  pages: string[];
  mobile: string;
},id:string) => await API.put(`${UPDATE_SUB_ADMIN_URL}/${id}`, data, { withCredentials: true });

// -------- get sub admins ----------------
export const Get_Admins_Api = async () =>
  await API.get(GET_ADMIN_URL, { withCredentials: true });

// ---------------- delete sub admins ---------------- ----------------
export const Delete_Admins_Api = async (id:string) =>
  await API.delete(`${DELETE_ADMIN_URL}/${id}`, { withCredentials: true });