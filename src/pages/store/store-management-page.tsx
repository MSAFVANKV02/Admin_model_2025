import { DataTableStore } from "@/components/tasks/task_components/store/data-table-store";
import { StoreTypes } from "@/types/storeTypes";
import { useSearchParams } from "react-router-dom";
import StoreCreateForm from "./store_create_Form";

const storeData: StoreTypes[] = [
  {
    store_name: "Green Mart",
    gst_number: "27AABCU9603R1ZV",
    store_address: "123 Main Street, Springfield",
    store_capacity_in_cubic: 1500,
    state: "Maharashtra",
    country: "India",
    pincode: "400001",
    google_location: {lat:"",lng:""},
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
  },
  {
    store_name: "ABC Supermart",
    gst_number: "29AABCU9603R1Z1",
    store_address: "123 Main Street, Sector 4, Cityville",
    store_capacity_in_cubic: 1500,
    state: "Karnataka",
    country: "India",
    pincode: "560001",
    google_location: {lat:"12.9715987",lng:"77.594566"},
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
  },
];

export default function StoreManagementPage() {
  const [searchParams] = useSearchParams();
  const urlType = searchParams.get("type");
  return (
    <div>
      <div className="p-4 select-none">
        <h1 className="font-bold text-textGray text-sm">Store Management</h1>
      </div>
      {/*  */}
      <div className="page-outer">
        {urlType === "create" ? (
          <div className="">
            <StoreCreateForm />
          </div>
        ) : (
          <DataTableStore data={storeData} />
        )}
      </div>
    </div>
  );
}
