import { CUSTOMER_DETAILS_URL } from "@/types/urlPath";
import { API } from "../auth/route";

// ------------------ logout ----------------------------------------------------
export const Get_Customer_Api = async () =>
    await API.get(`${CUSTOMER_DETAILS_URL}`, { withCredentials: true });