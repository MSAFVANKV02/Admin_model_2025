export type StoreTypes = {
  storeName?: string | null;
  gstNumber?: string | null;
  storeAddress?: string | null;
  storeCapacity?: number | null;
  state?: string | null;
  country?: string | null;
  pinCode?: string | null;
  googleLocation?: { latitude: number | null; longitude: number | null };
  storeManager: string | null;
  emailId: string | null;
  phoneNumber: string | null;
  userName: string | null;
  password: string | null;
  inHouseProduct: boolean;
  bankDetails: {
    accountName: string | null;
    accountNumber: string | null;
    ifscCode: string | null;
    shiftCode: string | null;
    upiId: string | null;
  };
  amount?: number | null;
  capacity: number | null;
  status?: "pending" | "paid";
  created_at?: string | number | Date;
};
