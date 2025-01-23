import { DataTableStore } from "@/components/tasks/task_components/store/data-table-store";

import { useSearchParams } from "react-router-dom";
import StoreCreationPage from "./store-creation/store-creation-page";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchSellerOrStoreDetails } from "@/redux/actions/storeSellerSlice";
import { useEffect } from "react";



export default function StoreManagementPage() {
  const dispatch = useAppDispatch();
  const {isLogged} = useAppSelector((state)=> state.admin);
  const {storeSeller} = useAppSelector((state)=> state.storeSeller);

// console.log(storeSeller,'storeSeller');


  const [searchParams] = useSearchParams();
  const urlType = searchParams.get("type");

  useEffect(() => {
    if (!isLogged) {
      dispatch(fetchSellerOrStoreDetails("store"));
    }
  }, [ isLogged, dispatch]);
  return (
    <div>
      <div className="p-4 select-none">
        <h1 className="font-bold text-textGray text-sm">Store Management</h1>
      </div>
      {/*  */}
      <div className="page-outer">
        {/* <DataTableStore data={storeData} /> */}
        {urlType === "create" ? (
          <div className="">
            <StoreCreationPage />
          </div>
        ) : (
          <DataTableStore data={storeSeller} url="/store/all?type=create" title="+ Add New Store"  />
        )}
      </div>
    </div>
  );
}
