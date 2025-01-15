import { DataTableStoreEarnings } from "@/components/tasks/task_components/store/data-table-store-earnings"
import { StoreTypes } from "@/types/storeTypes";
import StoreEarningRent from "./payout-store-rent";



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
    }
  ];

export default function StoreEarningsPage() {

  return (
    <div>
        <div className="">
        <h1 className="font-bold text-textGray text-sm p-4">Store Earnings</h1>
        </div>
        <div className=" rounded-md shadow-sm scrollbar-none min-h-[80vh] w-full bg-transparent">
            <div className="flex lg:flex-row flex-col gap-3">
              <div className="lg:w-[60%] bg-white overflow-y-auto h-[80vh]  p-2 rounded-md">
              <DataTableStoreEarnings
                data={storeData}
                />
              </div>
              <div className="flex-grow bg-white overflow-y-auto h-[80vh]  p-2 rounded-md">
    <StoreEarningRent />
              </div>
            </div>
        </div>
    </div>
  )
}