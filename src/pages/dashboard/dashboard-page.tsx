import { useEffect, useMemo } from "react";
import DashSec01 from "./Dash_Sec_01";
import DashSec02 from "./Dash_Sec_02";

import { kycColumn } from "@/components/tasks/table_columns/kyc_column";
import { columns } from "@/components/tasks/table_columns/dashboard-columns";
// import { TopStoresColumn } from "@/components/tasks/table_columns/top-stores-column";
// import { TopProductsColumn } from "@/components/tasks/table_columns/top-products-column";
// import { TopSellerColumn } from "@/components/tasks/table_columns/top-seller-column";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchCustomerDetails } from "@/redux/actions/customerSlice";
import ReChartBar from "@/components/recharts/reChart_Bar";
import ReChartPie from "@/components/recharts/reChart_Pie";
import { TopProductsColumn } from "@/components/tasks/table_columns/top-products-column";
import { TopStoresColumn } from "@/components/tasks/table_columns/top-stores-column";
import { TopSellerColumn } from "@/components/tasks/table_columns/top-seller-column";
import { fetchSellerOrStoreDetails } from "@/redux/actions/storeSellerSlice";
import { IUserProps } from "@/types/adminUserTypes";
import { StoreTypes } from "@/types/storeTypes";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((state) => state.customer);
  const { storeSeller } = useAppSelector((state) => state.storeSeller);

  const filteredCustomer = useMemo(() => {
    return customer.filter((item) => item.user.kycsubmitted);
  }, [customer]);

  const filteredStore = useMemo(() => {
    return storeSeller.filter((item) => item.role === "Store");
  }, [storeSeller]);

  const filteredSeller = useMemo(() => {
    return storeSeller.filter((item) => item.role === "Seller");
  }, [storeSeller]);

  useEffect(() => {
    // dispatch(resetStoreData()); // Clear previous data
    dispatch(fetchSellerOrStoreDetails("storeSeller"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomerDetails());
  }, []);

  // if (loading) return <div>Loading...</div>;

  return (
    <div className=" flex flex-col gap-6">
      <DashSec01 />

      <div className="flex lg:flex-row flex-col gap-3">
        <ReChartPie />
        <ReChartBar />
      </div>

      {/* tables starts =====
        ============== */}
      <DashSec02
        titleOne="Offline Payment "
        titleTwo="KYC verification "
        data1={filteredCustomer}
        data2={filteredCustomer}
        columns={columns}
        columnsTwo={kycColumn}
      />
      {/* <DashSec02
        titleOne="Top Products "
        titleTwo="Top Stores"
        data1={customer}
        data2={storeSeller}

        columns={TopProductsColumn}
        columnsTwo={TopStoresColumn}
      /> */}

      <DashSec02<
        IUserProps,
        unknown, // First table: Data type for data1
        StoreTypes,
        unknown // Second table: Data type for data2
      >
        titleOne="Top Products"
        titleTwo="Top Stores"
        data1={customer} // customer is IUserProps[]
        data2={filteredStore} // storeSeller is StoreTypes[]
        columns={TopProductsColumn} // Matches IUserProps
        columnsTwo={TopStoresColumn} // Matches StoreTypes
      />

      <DashSec02
        titleOne="Top Seller"
        tableTwo={false}
        columns={TopSellerColumn}
        columnsTwo={TopSellerColumn}
        data1={filteredSeller}
        data2={filteredSeller}
      />
    </div>
  );
}
