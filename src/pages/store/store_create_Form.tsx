import GoogleMap from "@/components/google/GoogleMap";
import AyButton from "@/components/myUi/AyButton";
import { FormField } from "@/components/myUi/FormField";
import { Input } from "@/components/ui/input";
import useNavigateClicks from "@/hooks/useClicks";
import { useModal } from "@/providers/context/context";
import { Create_Store_Api } from "@/services/store/route";
import { StoreTypes } from "@/types/storeTypes";
import { makeToast, makeToastError } from "@/utils/toaster";
import { Form, Formik, Field } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
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
  googleLocation: Yup.string().required("Google Location is required"),
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

export default function StoreCreateForm() {
  const { handleClick } = useNavigateClicks();
  const [googleAddress, setGoogleAddress] = useState<string>("");
  // const location = useLocation();

  const { setIsOpen } = useModal();

  const initialValues: StoreTypes = {
    storeName: "sdasd",
    gstNumber: "123456789012345",
    storeAddress: "asdasd",
    storeCapacity: null,
    state: "asdas",
    country: "asdasd",
    pinCode: "3123",
    googleLocation: { latitude: null, longitude: null },
    storeManager: "sdasd",
    emailId: "asda@asdas.com",
    phoneNumber: "213456789",
    userName: "fsdf",
    password: "123456",
    inHouseProduct: false,
    bankDetails: {
      accountName: "asdasd",
      accountNumber: "1234578",
      ifscCode: "dsfsd4234",
      shiftCode: "dfsdf",
      upiId: "sdfs@sda",
    },
    capacity: null,
  };
  

  const handleSetGoogleLocation = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between py-4">
        <h2>Create Store</h2>
        <AyButton
          title="Store"
          onClick={() => {
            handleClick("/store/all");
          }}
          sx={{
             ml: {
             md:"auto",
            },
            borderRadius: "100px",
            py: "10px",
          }}
        />
      </div>

      {/* Form starts ==== */}
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={async(values,{resetForm}) => {
          console.log(values)
          try {
            const response = await Create_Store_Api(values);
            if(response.status === 201){
              makeToast("Store created successfully!");
              // resetForm();
              handleClick("/store/all");
            }
          } catch (error:any) {
            console.error(error);
            if(error.response.data){
              makeToastError(error.response.data.message);
            }
            // handle form error
            
          }
        }}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form className="space-y-4 max-w-screen-md mx-auto md:p-5 p-2 md:border shadow">
            {/* Store Details */}
            <FormField
              id="storeName"
              name="storeName"
              classnamewrapper="w-full lg:w-full "
              //   title="Store Name"
              placeholder="Enter store name"
              value={values.storeName || ""}
              fieldAs={Input}
            />
            <FormField
              id="gstNumber"
              name="gstNumber"
              classnamewrapper="w-full lg:w-full"
              //   title="GST Number"
              placeholder="Enter GST number"
              value={values.gstNumber || ""}
              fieldAs={Input}
            />
            <FormField
              id="storeAddress"
              name="storeAddress"
              classnamewrapper="w-full lg:w-full"
              //   title="Store Address"
              placeholder="Enter store address"
              value={values.storeAddress || ""}
              fieldAs={Input}
            />
            <FormField
              id="storeCapacity"
              name="storeCapacity"
              classnamewrapper="w-full lg:w-full"
              type="number"
              //   title="Store Capacity in Cubic"
              placeholder="Store Capacity in cubic (e.g., 100.5)"
              value={values.storeCapacity || "" || ""}
              fieldAs={Input}
            />

            {/* Location */}
            <FormField
              id="state"
              name="state"
              classnamewrapper="w-full lg:w-full"
              //   title="State"
              placeholder="Enter state"
              value={values.state || ""}
              fieldAs={Input}
            />
            <FormField
              id="country"
              name="country"
              classnamewrapper="w-full lg:w-full"
              //   title="Country"
              placeholder="Enter country"
              value={values.country || ""}
              fieldAs={Input}
            />
            <FormField
              id="pinCode"
              name="pinCode"
              classnamewrapper="w-full lg:w-full"
              //   title="Pincode"
              placeholder="Enter pinCode"
              value={values.pinCode || ""}
              fieldAs={Input}
            />

            {/* Google Location */}
            <div className="flex gap-3 items-center">
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
            {values.googleLocation && values.googleLocation.longitude    ? (
              <span className="text-xs">
                {`Lat: ${values.googleLocation.latitude}, Lng: ${values.googleLocation.longitude}`}
              </span>
            ) : (
              <span className="text-xs">No location set</span>
            )}
            </div>

            <GoogleMap
              setGoogleAddress={setGoogleAddress}
              googleAddress={googleAddress}
              setFieldValue={setFieldValue}
            />
            {/* <FormField
              id="googleLocation"
              name="googleLocation"
              classnamewrapper="w-full lg:w-full"
              //   title="Google Location"
              placeholder="Set google location"
              value={values.googleLocation || ""}
              fieldAs={Input}
            /> */}

            {/* User & Store Manager Details */}

            <div className=" grid md:grid-cols-3 gap-2 w-full">
              <FormField
                id="storeManager"
                name="storeManager"
                classnamewrapper="w-full lg:w-full"
                placeholder="Select store manager"
                value={values.storeManager || ""}
                fieldAs={Input}
              />
              <FormField
                id="emailId"
                name="emailId"
                type="email"
                classnamewrapper="w-full lg:w-full"
                placeholder="Enter email"
                value={values.emailId || ""}
                fieldAs={Input}
              />
              <FormField
                id="phoneNumber"
                name="phoneNumber"
                classnamewrapper="w-full lg:w-full"
                placeholder="Enter phone number"
                value={values.phoneNumber || ""}
                fieldAs={Input}
              />
            </div>

            {/* user name password */}
            <div className=" grid sm:grid-cols-2 gap-2 w-full ">
              <FormField
                id="userName"
                name="userName"
                classnamewrapper="w-full lg:w-full "
                //   title="User Name"
                fieldClassName="w-full"
                placeholder="Enter user name"
                value={values.userName || ""}
                fieldAs={Input}
              />
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
            {/* Checkbox for Boolean Field */}
            <div className="flex items-center gap-2">
              <label htmlFor="inHouseProduct">In-House Product</label>
              <Field
                type="checkbox"
                id="inHouseProduct"
                name="inHouseProduct"
                classnamewrapper="w-full lg:w-full"
                checked={values.inHouseProduct}
              />
            </div>

            {/* Bank Details */}
            <h3 className="font-bold">Bank Details</h3>
            <FormField
              id="bankDetails.accountName"
              name="bankDetails.accountName"
              classnamewrapper="w-full lg:w-full"
              //   title="Account Name"
              placeholder="Enter account name"
              value={values.bankDetails.accountName || ""}
              fieldAs={Input}
            />
            <FormField
              id="bankDetails.accountNumber"
              name="bankDetails.accountNumber"
              classnamewrapper="w-full lg:w-full"
              //   title="Account Number"
              placeholder="Enter account number"
              value={values.bankDetails.accountNumber || ""}
              fieldAs={Input}
            />
            <FormField
              id="bankDetails.ifscCode"
              name="bankDetails.ifscCode"
              classnamewrapper="w-full lg:w-full"
              //   title="IFSC"
              placeholder="Enter IFSC code"
              value={values.bankDetails.ifscCode || ""}
              fieldAs={Input}
            />
            <FormField
              id="bankDetails.shiftCode"
              name="bankDetails.shiftCode"
              classnamewrapper="w-full lg:w-full"
              //   title="Shift Code"
              placeholder="Enter shift code"
              value={values.bankDetails.shiftCode || ""}
              fieldAs={Input}
            />
            <FormField
              id="bankDetails.upiId"
              name="bankDetails.upiId"
              classnamewrapper="w-full lg:w-full"
              //   title="UPI ID"
              placeholder="Enter UPI ID"
              value={values.bankDetails.upiId || ""}
              fieldAs={Input}
            />

            {/* Store Capacity */}
            <FormField
              id="capacity"
              type="number"
              name="capacity"
              classnamewrapper="w-full lg:w-full"
              //   title="Store Capacity in Cubic Meter"
              placeholder="Enter capacity"
              value={values.capacity || "" || ""}
              fieldAs={Input}
            />

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-2">
              <AyButton
                title="Cancel"
                sx={{
                  borderRadius: "8px",
                }}
                onClick={()=>{
                  resetForm();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
              <AyButton
                title="Save"
                type="submit"
                sx={{
                  borderRadius: "8px",
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
