import PagesLayout, {
  PageLayoutHeader,
  PagesLayoutContent,
} from "@/layouts/Pages_Layout";
import { Field, Form, Formik } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IRegistrationTypes, StoreTypes } from "@/types/storeTypes";
import { useState } from "react";
import LLPForm from "./Registartion_Forms/LLP_Form";
import PvtLtdForm from "./Registartion_Forms/Pvt_Ltd_Form";
import SoleProprietorshipForm from "./Registartion_Forms/Sole_Proprietorship_Form";
import PartnershipForm from "./Registartion_Forms/Partnerships_Form";
import { Create_Store_Api } from "@/services/store/route";
import { makeToast, makeToastError } from "@/utils/toaster";
import { FormField } from "@/components/myUi/FormField";
import { Input } from "@/components/ui/input";
import AyButton from "@/components/myUi/AyButton";
import { useModal } from "@/providers/context/context";
import GoogleMap from "@/components/google/GoogleMap";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getValidationSchema } from "./Store_Validation_Schema";

export default function StoreCreationPage() {
  const [selectedRegistration, setSelectedRegistration] =
    useState<IRegistrationTypes>("Sole Proprietorship");

  const [googleAddress, setGoogleAddress] = useState<string>("");
  // const location = useLocation();

  const { setIsOpen } = useModal();

  const handleSetGoogleLocation = () => {
    setIsOpen(true);
  };

  const registrationTypes: { value: IRegistrationTypes; name: string }[] = [
    { value: "Sole Proprietorship", name: "Sole Proprietorship Registration" },
    { value: "Partnerships", name: "Partnerships Firm Registration" },
    {
      value: "LLP",
      name: "Limited Liability Partnership (LLP) Company Registration",
    },
    { value: "PVT LTD", name: "Private Limited Company Registration" },
  ];

  //   ======== initialValues =================================
  const initialValues: StoreTypes = {
    registrationType: "Sole Proprietorship",
    AadhaarCard: null,
    PanCard: null,
    LocalBodyLicense: null,
    RoomRentAgreement: null,
    GstFile: null,
    partnershipAgreement: null,
    companyPanCard: null,
    companyIncorporationCertificate:null,
    storeName: "",
    gstNumber: "",
    storeAddress: "",
    storeCapacity: null,
    state: "",
    country: "",
    pinCode: "",
    googleLocation: { latitude: null, longitude: null },
    storeManager: "",
    emailId: "",
    phoneNumber: "",
    userName: "",
    password: "",
    inHouseProduct: false,
    bankDetails: {
      accountName: "",
      accountNumber: "",
      ifscCode: "",
      shiftCode: "",
      upiId: "",
    },
    capacity: null,
  };

  const renderForms = (values: StoreTypes, setFieldValue: any) => {
    switch (selectedRegistration) {
      case "Sole Proprietorship":
        return (
          <SoleProprietorshipForm
            values={values}
            setFieldValue={setFieldValue}
          />
        );
      case "Partnerships":
        return (
          <PartnershipForm values={values} setFieldValue={setFieldValue} />
        );
      case "LLP":
        return <LLPForm values={values} setFieldValue={setFieldValue} />;
      case "PVT LTD":
        return <PvtLtdForm values={values} setFieldValue={setFieldValue} />;
      default:
        return (
          <SoleProprietorshipForm
            values={values}
            setFieldValue={setFieldValue}
          />
        );
    }
  };

  return (
    <PagesLayout className="">
      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(selectedRegistration)}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          try {
            const response = await Create_Store_Api(values);
            if (response.status === 201) {
              makeToast("Store created successfully!");
              resetForm();
              // handleClick("/store/all");
            }
          } catch (error: any) {
            console.error(error);
            if (error.response.data) {
              makeToastError(error.response.data.message);
            }
            // handle form error
          }
        }}
      >
        {({ values, setFieldValue, resetForm, isSubmitting }) => (
          <Form>
            <PageLayoutHeader className="fixed top-14  right-0  shadow-[0px_2px_9px_0px_#00000024] left-0 bg-white z-50">
              <div className="flex justify-between w-full px-16 items-center">
                <h1 className="sm:text-lg text-sm font-bold text-textGray select-none">
                  Store Creation
                </h1>

                <Select
                  onValueChange={(value) => {
                    setSelectedRegistration(value as IRegistrationTypes);
                    setFieldValue("registrationType", value);
                    // console.log(value);
                  }}
                  value={values.registrationType}
                  name="registrationType"
                >
                  <SelectTrigger className="min-w-[180px] max-w-[400px]">
                    <SelectValue placeholder="Select Registration Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {registrationTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        disabled={values.registrationType === type.value}
                      >
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </PageLayoutHeader>
            {/* ======================== */}
            <PagesLayoutContent className="space-y-4 max-w-screen-md mx-auto md:p-5 p-2 md:border shadow md:mt-14 mt-16">
              {/* 1. store name */}
              <FormField
                id="storeName"
                name="storeName"
                title="Store Name"
                classnamewrapper=" "
                //   title="Store Name"
                placeholder="Enter store name"
                value={values.storeName || ""}
                fieldAs={Input}
              />

              {/* -- 2. gst number ---- */}
              <FormField
                id="gstNumber"
                name="gstNumber"
                classnamewrapper=""
                title="GST Number"
                placeholder="Enter GST number"
                value={values.gstNumber || ""}
                fieldAs={Input}
              />
              {/* ----- 3. store Address ---- */}
              <FormField
                id="storeAddress"
                name="storeAddress"
                classnamewrapper=""
                title="Store Address"
                placeholder="Enter store address"
                value={values.storeAddress || ""}
                fieldAs={Input}
              />
              {/*  4. store Capacity ---- */}
              <FormField
                id="storeCapacity"
                name="storeCapacity"
                classnamewrapper=""
                type="number"
                title="Store Capacity in Cubic"
                placeholder="Store Capacity in cubic (e.g., 100.5)"
                value={values.storeCapacity || "" || ""}
                fieldAs={Input}
              />

              {/*=========== #Location ============ */}
              {/* 5. state ------- */}
              <FormField
                id="state"
                name="state"
                classnamewrapper=""
                title="State"
                placeholder="Enter state"
                value={values.state || ""}
                fieldAs={Input}
              />

              {/* 6. country ----- */}
              <FormField
                id="country"
                name="country"
                classnamewrapper=""
                title="Country"
                placeholder="Enter country"
                value={values.country || ""}
                fieldAs={Input}
              />

              {/*  7. PicCode ---- */}
              <FormField
                id="pinCode"
                name="pinCode"
                classnamewrapper=""
                title="Pincode"
                placeholder="Enter pinCode"
                value={values.pinCode || ""}
                fieldAs={Input}
              />

              {/* 8. Google Location */}
              <div className="flex gap-3 items-center justify-between">
                <Label>
                  <Icon icon="openmoji:location-indicator-red" fontSize={25} />
                </Label>
                <div className="lg:w-3/4 space-x-3">
                  <AyButton
                    title="Set google location"
                    iconSize={23}
                    onClick={() => {
                      handleSetGoogleLocation();
                    }}
                    icon="fluent:my-location-16-regular"
                    sx={{
                      width: "fit-content",
                      px: "15px",
                      bgcolor: "#F8E5FF",
                      border: "1px solid #C9C9C9",
                      borderRadius: "10px",
                      color: "black",
                      cursor: "pointer",
                      "&:hover": {
                        bg: "blue.600",
                      },
                    }}
                  />
                  {/* {values.googleLocation} */}
                  {values.googleLocation && values.googleLocation.longitude ? (
                    <span className="text-xs">
                      {`Lat: ${values.googleLocation.latitude}, Lng: ${values.googleLocation.longitude}`}
                    </span>
                  ) : (
                    <span className="text-xs">No location set</span>
                  )}
                </div>
              </div>
              <GoogleMap
                setGoogleAddress={setGoogleAddress}
                googleAddress={googleAddress}
                setFieldValue={setFieldValue}
              />

              {/* Upload documents ========= */}
              <div className="">
                <span className="text-sm font-bold">Upload Documents :</span>
              </div>

              {renderForms(values, setFieldValue)}

              {/* User & Store Manager Details */}
              <div className="">
                <span className="text-sm font-bold">User Details :</span>
              </div>

              <div className=" grid md:grid-cols-3 gap-2 w-full">
                {/* 9. store manager */}
                <FormField
                  id="storeManager"
                  name="storeManager"
                  classnamewrapper="w-full lg:w-full"
                  placeholder="Select store manager"
                  value={values.storeManager || ""}
                  fieldAs={Input}
                />

                {/* 10. email ---- */}
                <FormField
                  id="emailId"
                  name="emailId"
                  type="email"
                  classnamewrapper="w-full lg:w-full"
                  placeholder="Enter email"
                  value={values.emailId || ""}
                  fieldAs={Input}
                />

                {/* 11. mobile ---- */}
                <FormField
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  classnamewrapper="w-full lg:w-full"
                  placeholder="Enter phone number"
                  value={values.phoneNumber || ""}
                  fieldAs={Input}
                />
              </div>

              {/* manager email phone name password  */}
              <div className=" grid sm:grid-cols-2 gap-2 w-full ">
                {/* 12. user name */}
                <FormField
                  id="userName"
                  name="userName"
                  classnamewrapper="w-full lg:w-full"
                  //   title="User Name"
                  fieldClassName="w-full"
                  placeholder="Enter user name"
                  value={values.userName || ""}
                  fieldAs={Input}
                />

                {/* 13. password ---- */}
                <FormField
                  id="password"
                  name="password"
                  fieldClassName="w-full"
                  classnamewrapper="w-full lg:w-full"
                  //   title="Password"
                  placeholder="Enter password"
                  type="password"
                  value={values.password || ""}
                  fieldAs={Input}
                />
              </div>

              {/* 14 . In-House Product ----- */}
              <div className="flex items-center gap-2">
                <label htmlFor="inHouseProduct" className="text-xs">
                  In-House Product
                </label>
                <Field
                  type="checkbox"
                  id="inHouseProduct"
                  name="inHouseProduct"
                  classnamewrapper=""
                  checked={values.inHouseProduct}
                />
              </div>

              {/* Bank Details starts here
               -----------------------------*/}
              <div className="">
                <span className="text-sm font-bold">Bank Details :</span>
              </div>
              {/* 15. account name ---- */}
              <FormField
                id="bankDetails.accountName"
                name="bankDetails.accountName"
                classnamewrapper=""
                title="Account Name"
                placeholder="Enter account name"
                value={values.bankDetails.accountName || ""}
                fieldAs={Input}
              />

              {/* 15. account number ---- */}
              <FormField
                id="bankDetails.accountNumber"
                name="bankDetails.accountNumber"
                classnamewrapper=""
                title="Account Number"
                placeholder="Enter account number"
                value={values.bankDetails.accountNumber || ""}
                fieldAs={Input}
              />

              {/* 16. isfce */}
              <FormField
                id="bankDetails.ifscCode"
                name="bankDetails.ifscCode"
                classnamewrapper=""
                title="IFSC"
                placeholder="Enter IFSC code"
                value={values.bankDetails.ifscCode || ""}
                fieldAs={Input}
              />

              {/* 17. shift code */}
              <FormField
                id="bankDetails.shiftCode"
                name="bankDetails.shiftCode"
                classnamewrapper=""
                title="Shift Code"
                placeholder="Enter shift code"
                value={values.bankDetails.shiftCode || ""}
                fieldAs={Input}
              />

              {/* 18. upi id */}
              <FormField
                id="bankDetails.upiId"
                name="bankDetails.upiId"
                classnamewrapper=""
                title="UPI ID"
                placeholder="Enter UPI ID"
                value={values.bankDetails.upiId || ""}
                fieldAs={Input}
              />

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-2">
                <AyButton
                  title="Cancel"
                  variant="cancel"
                  sx={{
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    resetForm();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
                <AyButton
                  title={`${isSubmitting ? "Loading..." : "Save"}`}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  type="submit"
                  sx={{
                    borderRadius: "8px",
                  }}
                />
              </div>
            </PagesLayoutContent>
          </Form>
        )}
      </Formik>
    </PagesLayout>
  );
}
