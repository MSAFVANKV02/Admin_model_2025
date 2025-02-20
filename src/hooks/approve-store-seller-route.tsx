import { setLoadingState } from "@/redux/actions/loadingSlice";
import { fetchSellerOrStoreDetails } from "@/redux/actions/storeSellerSlice";
import { useAppDispatch } from "@/redux/hook";
import { Approve_Seller_Api, Approve_Store_Api } from "@/services/store/route";
import { IAdminStatus } from "@/types/storeTypes";
import { makeToast, makeToastError } from "@/utils/toaster";

export default function ApproveStoreSeller() {
  const dispatch = useAppDispatch();

  const switchAdminApprovalRoute = async (
    role: "Seller" | "Store" | undefined,
    adminStatus: IAdminStatus,
    storeId: any
  ) => {
    // if (!storeId) {
    //     throw new Error("Store ID is missing.");
    //   }
    // console.log('ddasdasdasdasdasdas');
    console.log();

    try {
        dispatch(setLoadingState(true));
      if (role === "Seller") {
        const response = await Approve_Seller_Api(adminStatus, storeId);
        if (response.status === 200) {
          makeToast(response.data.message);
          dispatch(fetchSellerOrStoreDetails("seller"));
          
        }
      } else {
        const response = await Approve_Store_Api(adminStatus, storeId);
        if (response.status === 200) {
          makeToast(response.data.message);
          dispatch(fetchSellerOrStoreDetails("store"));
          
        }
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.data) {
        makeToastError(error.response.data.message);
      }
      dispatch(setLoadingState(false));
    } finally {
      dispatch(setLoadingState(false));
    }
  };
  return {
    switchAdminApprovalRoute,
  };
}
