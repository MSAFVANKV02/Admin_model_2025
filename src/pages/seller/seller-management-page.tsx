import { DataTableStore } from "@/components/tasks/task_components/store/data-table-store";

import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchSellerOrStoreDetails, resetStoreData } from "@/redux/actions/storeSellerSlice";
import { useEffect } from "react";
import SellerCreationPage from "./seller-creation/seller-creation-page";



export default function SellerManagementPage() {
  const dispatch = useAppDispatch();
  const {isLogged} = useAppSelector((state)=> state.admin);
  const {storeSeller} = useAppSelector((state)=> state.storeSeller);

// console.log(isLogged,'isLogged');


  const [searchParams] = useSearchParams();
  const urlType = searchParams.get("type");

  useEffect(() => {
    dispatch(resetStoreData()); // Clear previous data
    dispatch(fetchSellerOrStoreDetails("seller"));
  }, [isLogged, dispatch]);
  
  return (
    <div>
      <div className="p-4 select-none">
        <h1 className="font-bold text-textGray text-sm">Seller Management</h1>
      </div>
      {/*  */}
      <div className="page-outer">
        {/* <DataTableStore data={storeData} /> */}
        {urlType === "create" ? (
          <div className="">
            <SellerCreationPage />
          </div>
        ) : (
          <DataTableStore data={storeSeller} url="/seller/all?type=create" title="+ Add New Seller" />
        )}
      </div>
    </div>
  );
}
