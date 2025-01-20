import { IRegistrationTypes } from "@/types/storeTypes";
import * as Yup from "yup";

export const mainValidationSchema = Yup.object({
  storeName: Yup.string().required("Store Name is required"),
  gstNumber: Yup.string()
    .matches(/^\d{15}$/, "GST number should be 15 digits")
    .required("GST Number is required"),
  storeAddress: Yup.string().required("Store Address is required"),
  storeCapacity: Yup.number()
    .positive("Capacity must be positive")
    .required("Store Capacity is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  pinCode: Yup.string()
    .matches(/^\d{6}$/, "Pincode should be 6 digits")
    .required("Pincode is required"),

  storeManager: Yup.string().required("Store Manager is required"),
  emailId: Yup.string()
    .email("Invalid email address")
    .required("Email ID is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number should be 10 digits")
    .required("Phone Number is required"),
  userName: Yup.string().required("User Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  inHouseProduct: Yup.boolean(),
  bankDetails: Yup.object({
    accountName: Yup.string().required("Account Name is required"),
    accountNumber: Yup.string()
      .matches(/^\d+$/, "Account Number must be numeric")
      .required("Account Number is required"),
    ifscCode: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format")
      .required("IFSC code is required"),
    shiftCode: Yup.string().required("Shift Code is required"),
    upiId: Yup.string().email("Invalid UPI ID").required("UPI ID is required"),
  }),
  capacity: Yup.number()
    .positive("Capacity must be positive")
    .required("Store Capacity is required"),
});

//   ============
export const soleProprietorshipValidationSchema = Yup.object({
  AadhaarCard: Yup.mixed()
    .test(
      "required",
      "Aadhaar Card is required",
      (value) => value instanceof File
    )
    .required("Aadhaar Card is required"),
  PanCard: Yup.mixed()
    .test("required", "PAN Card is required", (value) => value instanceof File)
    .required("PAN Card is required"),
  LocalBodyLicense: Yup.mixed()
    .test(
      "required",
      "Local Body License is required",
      (value) => value instanceof File
    )
    .required("Local Body License is required"),
  RoomRentAgreement: Yup.mixed()
    .test(
      "required",
      "Room Rent Agreement is required",
      (value) => value instanceof File
    )
    .required("Room Rent Agreement is required"),
  GstFile: Yup.mixed()
    .test("required", "GST File is required", (value) => value instanceof File)
    .required("GST File is required"),
});

// ========
export const PartnerShipFirm = Yup.object({
  partnershipAgreement: Yup.mixed()
    .test(
      "required",
      "Partnership Agreement is required",
      (value) => value instanceof File
    )
    .required("Partnership Agreement is required"),
    companyPanCard: Yup.mixed()
    .test(
      "required",
      "Company Pan Card is required",
      (value) => value instanceof File
    )
    .required("Company Pan Card is required"),
});

export const getValidationSchema = (registrationType: IRegistrationTypes) => {
  // if (registrationType === "Sole Proprietorship") {
  //   return mainValidationSchema.concat(soleProprietorshipValidationSchema);
  // }
  switch (registrationType) {
    case "Partnerships":
      return mainValidationSchema
        .concat(soleProprietorshipValidationSchema)
        .concat(PartnerShipFirm);
    case "LLP":
      return mainValidationSchema;
    case "PVT LTD":
      return mainValidationSchema;
    case "Sole Proprietorship":
      return mainValidationSchema.concat(soleProprietorshipValidationSchema);
    default:
      return mainValidationSchema;
  }
};
