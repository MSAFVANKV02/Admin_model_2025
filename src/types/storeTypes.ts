export type StoreTypes = {
    store_name: string | null;
    gst_number: string | null;
    store_address: string | null;
    store_capacity_in_cubic: number | null;
    state: string | null;
    country: string | null;
    pincode: string | null;
    google_location: { lat: string | null; lng: string | null };
    store_manager: string | null;
    email_id: string | null;
    phone_number: string | null;
    user_name: string | null;
    password: string | null;
    in_house_product: boolean;
    bank_details: {
      account_name: string | null;
      account_number: string | null;
      ifsc: string | null;
      shift_code: string | null;
      upi_id: string | null;
    };
    amount?: number | null;
    store_capacity_in_cubic_meter: number | null;
    status?:"pending"|"paid";
    created_at?: string | number | Date;
  };
  