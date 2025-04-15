import { CUSTOMER_DETAILS_URL, DELETE_CUSTOMER_USER_URL, UPDATE_CUSTOMER_KYC_URL, UPDATE_CUSTOMER_USER_URL } from "@/services/api/urlPath";
import { API } from "../auth/route";


// type IApiData = {
//     businessName?: string;
//     emailId?: string;
//     buildingName?: string;
//     street?: string;
//     post?: string;
//     pinCode?: string;
//     state?: string;
//     country?: string;
//     gstNumber?: string;
//     proof?: string; // Optional
//     proofType?:
//       | "Udyam Aadhaar"
//       | "GST Certificate"
//       | "Current Account Cheque"
//       | "Shop & Establishment License"
//       | "Trade Certificate/License"
//       | "Other Shop Documents";
//     status: "pending" | "approved" | "rejected";
//     feedback?: string; // Optional
// }

// ------------------ logout ----------------------------------------------------
export const Get_Customer_Api = async () =>
    await API.get(`${CUSTOMER_DETAILS_URL}`, { withCredentials: true });

// ---- update kuy of users------------------------
export const Update_Customer_Kyc_Api = async (data: any, kycId: string) =>
    await API.post(`${UPDATE_CUSTOMER_KYC_URL}/${kycId}`, data, {
      withCredentials: true,
      // headers: {
      //   "Content-Type": "multipart/form-data", // Ensure Axios sets the correct headers
      // },
    });


    export const Update_Customer_User_Api = async (data: any, userId: string) =>
      await API.put(`${UPDATE_CUSTOMER_USER_URL}/${userId}`, data, {
        withCredentials: true,
        // headers: {
        //   "Content-Type": "multipart/form-data", // Ensure Axios sets the correct headers
        // },
      });
  

      export const delete_Customer_User_Api = async (userId: string, type: "soft" | "hard"|"restore"|"block") =>
        await API.delete(`${DELETE_CUSTOMER_USER_URL}/${userId}`, {
          data: { type }, // 👈 send body here
          withCredentials: true,
        });
      