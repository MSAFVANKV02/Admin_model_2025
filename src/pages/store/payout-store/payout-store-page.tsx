import { StoreTypes } from "@/types/storeTypes";
import { useSearchParams } from "react-router-dom";
import StorePaymentForm from "./store_payment_form";
import { DataTableStorePayout } from "@/components/tasks/task_components/store/data-table-store-payout";

import PayoutStoreDue from "./payout-store-due";

const storeData: StoreTypes[] = [
  {
    store_name: "Green Mart",
    gst_number: "27AABCU9603R1ZV",
    store_address: "123 Main Street, Springfield",
    store_capacity_in_cubic: 1500,
    state: "Maharashtra",
    country: "India",
    pincode: "400001",
    google_location: { lat: "", lng: "" },
    store_manager: "John Doe",
    email_id: "john.doe@greenmart.com",
    phone_number: "+91-9876543210",
    user_name: "john_doe",
    password: "password123",
    in_house_product: true,
    bank_details: {
      account_name: "Green Mart Pvt. Ltd.",
      account_number: "123456789012",
      ifsc: "HDFC0000123",
      shift_code: "HDFCINBBXXX",
      upi_id: "greenmart@hdfc",
    },
    store_capacity_in_cubic_meter: 1500,
    created_at: Date.now() - 24 * 60 * 60 * 1000,
    status: "paid",
    amount: 1000,
  },
  {
    store_name: "ABC Supermart",
    gst_number: "29AABCU9603R1Z1",
    store_address: "123 Main Street, Sector 4, Cityville",
    store_capacity_in_cubic: 1500,
    state: "Karnataka",
    country: "India",
    pincode: "560001",
    google_location: { lat: "12.9715987", lng: "77.594566" },
    store_manager: "John Doe",
    email_id: "manager@abcsupermart.com",
    phone_number: "+91 9876543210",
    user_name: "john_doe",
    password: "secureP@ss123",
    in_house_product: true,
    bank_details: {
      account_name: "ABC Supermart Pvt Ltd",
      account_number: "123456789012",
      ifsc: "HDFC0001234",
      shift_code: "HDFCINBBXXX",
      upi_id: "abcsupermart@hdfcbank",
    },
    store_capacity_in_cubic_meter: 2000,
    created_at: Date.now(),
    status: "paid",
    amount: 1000,
  },
];

export default function PayoutStorePage() {
  const [searchParams] = useSearchParams();
  const urlType = searchParams.get("type");
  return (
    <div>
      <div className="p-4 select-none">
        <h1 className="font-bold text-textGray text-sm">Store Payout</h1>
      </div>
      {/*  */}
      <div className="sm:p-5 rounded-md shadow-sm scrollbar-none min-h-[80vh] w-full bg-transparent">
        {urlType === "create" ? (
          <div className="">
            <StorePaymentForm />
          </div>
        ) : (
          <div className="flex xl:flex-row flex-col gap-4">
            <div className="xl:w-[60%] w-full  bg-white overflow-y-auto h-[80vh]  p-2 rounded-md">
              <DataTableStorePayout data={storeData} />
            </div>

            <div className="xl:flex-grow bg-white p-2 rounded-md overflow-y-auto h-[80vh]">
              <PayoutStoreDue />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
