export const LOCAL_URL = `http://localhost:4000`
export const ALLOWED_DOMAIN = "https://6qg6jmv3-5175.inc1.devtunnels.ms";

export const ADMIN_SEND_OTP = `/user_api/admin/sendOtp_AdminLogin`;
export const ADMIN_VERIFY_OTP = `/user_api/admin/verifyOtp_AdminLogin`;

// ==== sub admins =================
export const CREATE_SUB_ADMIN_URL = `/user_api/admin/createSubadmin`;
export const UPDATE_SUB_ADMIN_URL = `/user_api/admin/updateSubadmin`;
export const GET_ADMIN_URL = `/user_api/admin/getSubadmins`;

export const GET_CURRENT_ADMIN_URL = `/user_api/admin/getCurrentAdmin`;

export const DELETE_ADMIN_URL = `/user_api/admin/deleteSubadmin`;



// export const ADMIN_VERIFY_OTP = `https://www.user-service.ayaboo.com/admin/verifyOtp_AdminLogin`;
// export const ADMIN_VERIFY_OTP = `http://localhost:4001/admin/verifyOtp_AdminLogin`;
export const ADMIN_RESEND_OTP = `/user_api/admin/resendOtp_AdminLogin`;


// ------ logout --------------------
export const LOGOUT_ADMIN_URL = `/user_api/admin/logoutAdmin`;


// ------ customer --------------------
export const CUSTOMER_DETAILS_URL = `/user_api/admin/getUsersWithkyc`;
export const UPDATE_CUSTOMER_KYC_URL = `/user_api/admin/approveOrreject_Kyc`;





// update profiles --------------------
export const UPDATE_PROFILE_URL = `/user_api/admin/avatar`;
export const RESET_PASSWORD_URL = `/user_api/admin/change-password`;
export const DELETE_PROFILE_AVATAR_URL = `/user_api/seller/remove-avatar`;
