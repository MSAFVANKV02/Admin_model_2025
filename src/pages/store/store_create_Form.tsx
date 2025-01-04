import GoogleMap from "@/components/google/GoogleMap";
import AyButton from "@/components/myUi/AyButton";
import { FormField } from "@/components/myUi/FormField";
import { Input } from "@/components/ui/input";
import useNavigateClicks from "@/hooks/useClicks";
import { useModal } from "@/providers/context/context";
import { StoreTypes } from "@/types/storeTypes";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object({
  store_name: Yup.string().required("Store Name is required"),
  gst_number: Yup.string()
    .matches(/^\d{15}$/, "GST number should be 15 digits")
    .required("GST Number is required"),
  store_address: Yup.string().required("Store Address is required"),
  store_capacity_in_cubic: Yup.number()
    .positive("Capacity must be positive")
    .required("Store Capacity is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode should be 6 digits")
    .required("Pincode is required"),
  google_location: Yup.string().required("Google Location is required"),
  store_manager: Yup.string().required("Store Manager is required"),
  email_id: Yup.string()
    .email("Invalid email address")
    .required("Email ID is required"),
  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone number should be 10 digits")
    .required("Phone Number is required"),
  user_name: Yup.string().required("User Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  in_house_product: Yup.boolean(),
  bank_details: Yup.object({
    account_name: Yup.string().required("Account Name is required"),
    account_number: Yup.string()
      .matches(/^\d+$/, "Account Number must be numeric")
      .required("Account Number is required"),
      ifsc: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format")
      .required("IFSC code is required"),
    shift_code: Yup.string().required("Shift Code is required"),
    upi_id: Yup.string().email("Invalid UPI ID").required("UPI ID is required"),
  }),
  store_capacity_in_cubic_meter: Yup.number()
    .positive("Capacity must be positive")
    .required("Store Capacity is required"),
});

export default function StoreCreateForm() {
  const { handleClick } = useNavigateClicks();
  const {setIsOpen} =  useModal();

  const initialValues: StoreTypes = {
    store_name: "",
    gst_number: "",
    store_address: "",
    store_capacity_in_cubic: null,
    state: "",
    country: "",
    pincode: "",
    google_location: "",
    store_manager: "",
    email_id: "",
    phone_number: "",
    user_name: "",
    password: "",
    in_house_product: false,
    bank_details: {
      account_name: "",
      account_number: "",
      ifsc: "",
      shift_code: "",
      upi_id: "",
    },
    store_capacity_in_cubic_meter: null,
  };

  const handleSetGoogleLocation = () => {
    setIsOpen(true);
  }

  return (
    <div>
      <div className="flex justify-between py-4">
        <h2>Create Store</h2>
        <AyButton
          title="Store"
          onClick={() => {
            handleClick("/store");
          }}
          sx={{
            ml: "auto",
            borderRadius: "100px",
          }}
        />
      </div>

      {/* Form starts ==== */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4 max-w-screen-md mx-auto md:p-5 border shadow">
            {/* Store Details */}
            <FormField
              id="store_name"
              name="store_name"
              className2="w-full lg:w-full"
              //   title="Store Name"
              placeholder="Enter store name"
              value={values.store_name || ""}
              fieldAs={Input}
            />
            <FormField
              id="gst_number"
              name="gst_number"
              className2="w-full lg:w-full"
              //   title="GST Number"
              placeholder="Enter GST number"
              value={values.gst_number || ""}
              fieldAs={Input}
            />
            <FormField
              id="store_address"
              name="store_address"
              className2="w-full lg:w-full"
              //   title="Store Address"
              placeholder="Enter store address"
              value={values.store_address || ""}
              fieldAs={Input}
            />
            <FormField
              id="store_capacity_in_cubic"
              name="store_capacity_in_cubic"
              className2="w-full lg:w-full"
              //   title="Store Capacity in Cubic"
              placeholder="Enter capacity"
              value={values.store_capacity_in_cubic || "" || ""}
              fieldAs={Input}
            />

            {/* Location */}
            <FormField
              id="state"
              name="state"
              className2="w-full lg:w-full"
              //   title="State"
              placeholder="Enter state"
              value={values.state || ""}
              fieldAs={Input}
            />
            <FormField
              id="country"
              name="country"
              className2="w-full lg:w-full"
              //   title="Country"
              placeholder="Enter country"
              value={values.country || ""}
              fieldAs={Input}
            />
            <FormField
              id="pincode"
              name="pincode"
              className2="w-full lg:w-full"
              //   title="Pincode"
              placeholder="Enter pincode"
              value={values.pincode || ""}
              fieldAs={Input}
            />

            {/* Google Location */}
            <AyButton 
            title="Set google location"
            iconSize={23}
            onClick={()=>{
                handleSetGoogleLocation()
            }}
            icon="fluent:my-location-16-regular"
            
            sx={{
                width: "fit-content",
                px:"15px",
                bgcolor: "#F8E5FF",
                border:"1px solid #C9C9C9",
                borderRadius:"10px",
                color: "black",
                cursor: "pointer",
                "&:hover": {
                  bg: "blue.600",
                },
  
            }}
            />
            {values.google_location}
            <GoogleMap  
            setFieldValue={setFieldValue}
            />
            {/* <FormField
              id="google_location"
              name="google_location"
              className2="w-full lg:w-full"
              //   title="Google Location"
              placeholder="Set google location"
              value={values.google_location || ""}
              fieldAs={Input}
            /> */}

            {/* User & Store Manager Details */}

            <div className=" grid md:grid-cols-3 gap-2 w-full">
              <FormField
                id="store_manager"
                name="store_manager"
                className2="w-full lg:w-full"
                placeholder="Select store manager"
                value={values.store_manager || ""}
                fieldAs={Input}
              />
              <FormField
                id="email_id"
                name="email_id"
                className2="w-full lg:w-full"
                
                placeholder="Enter email"
                value={values.email_id || ""}
                fieldAs={Input}
              />
              <FormField
                id="phone_number"
                name="phone_number"
                className2="w-full lg:w-full"
               
                placeholder="Enter phone number"
                value={values.phone_number || ""}
                fieldAs={Input}
              />
            </div>


            {/* user name password */}
            <div className=" grid sm:grid-cols-2 gap-2 w-full ">
            <FormField
              id="user_name"
              name="user_name"
              className2="w-full lg:w-full "
              //   title="User Name"
              fieldClassName="w-full"
              placeholder="Enter user name"
              value={values.user_name || ""}
              fieldAs={Input}
            />
            <FormField
              id="password"
              name="password"
              fieldClassName="w-full"
              className2="w-full lg:w-full"
              //   title="Password"
              placeholder="Enter password"
              type="password"
              value={values.password || ""}
              fieldAs={Input}
            />

            </div>
            {/* Checkbox for Boolean Field */}
            <div className="flex items-center gap-2">
              <label htmlFor="in_house_product">In-House Product</label>
              <Field
                type="checkbox"
                id="in_house_product"
                name="in_house_product"
                className2="w-full lg:w-full"
                checked={values.in_house_product}
              />
            </div>

            {/* Bank Details */}
            <h3 className="font-bold">Bank Details</h3>
            <FormField
              id="bank_details.account_name"
              name="bank_details.account_name"
              className2="w-full lg:w-full"
              //   title="Account Name"
              placeholder="Enter account name"
              value={values.bank_details.account_name || ""}
              fieldAs={Input}
            />
            <FormField
              id="bank_details.account_number"
              name="bank_details.account_number"
              className2="w-full lg:w-full"
              //   title="Account Number"
              placeholder="Enter account number"
              value={values.bank_details.account_number || ""}
              fieldAs={Input}
            />
            <FormField
              id="bank_details.ifsc"
              name="bank_details.ifsc"
              className2="w-full lg:w-full"
              //   title="IFSC"
              placeholder="Enter IFSC code"
              value={values.bank_details.ifsc || ""}
              fieldAs={Input}
            />
            <FormField
              id="bank_details.shift_code"
              name="bank_details.shift_code"
              className2="w-full lg:w-full"
              //   title="Shift Code"
              placeholder="Enter shift code"
              value={values.bank_details.shift_code || ""}
              fieldAs={Input}
            />
            <FormField
              id="bank_details.upi_id"
              name="bank_details.upi_id"
              className2="w-full lg:w-full"
              //   title="UPI ID"
              placeholder="Enter UPI ID"
              value={values.bank_details.upi_id || ""}
              fieldAs={Input}
            />

            {/* Store Capacity */}
            <FormField
              id="store_capacity_in_cubic_meter"
              name="store_capacity_in_cubic_meter"
              className2="w-full lg:w-full"
              //   title="Store Capacity in Cubic Meter"
              placeholder="Enter capacity"
              value={values.store_capacity_in_cubic_meter || "" || ""}
              fieldAs={Input}
            />

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-2">
              <AyButton
                title="Cancel"
                sx={{
                  borderRadius: "8px",
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
