import { Formik, Form, Field, ErrorMessage } from "formik";

import TaskModal, {
  TaskModalContent,
  TaskModalHeader,
} from "../../../modals/TaskModal";
import MyCloseIcon from "@/components/icons/My_CloseIcon";

import { Input } from "@/components/ui/input";
import AyButton from "@/components/myUi/AyButton";
import { Label } from "@/components/ui/label";
import { UseModal } from "@/providers/context/context";
import { IUserProps } from "@/types/adminUserTypes";
import Checkbox from "@/components/myUi/checkBox";
import * as Yup from "yup";
import Loader from "@/components/global/loader";
import { Update_Customer_User_Api } from "@/services/customer/route";
import { makeToast, makeToastError } from "@/utils/toaster";

type Props = {
  onClose: () => void;
};

interface CustomerDetailsFormValues {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gstNumber: string;
  pincode: string;
  kycApproved: boolean;
  isWhatsappApproved: boolean;
  isBlocked: boolean;
  state: string;
  country: string;
  shopName: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  phone: Yup.string().required("Mobile number Required"),
  gstNumber: Yup.string().required("gst Required"),
  pincode: Yup.string().required("Pin code Required"),
  // kycApproved: Yup.boolean().required("Required"),
  state: Yup.string().required("State is Required"),
  country: Yup.string().required("Country is Required"),
});

export default function CustomerDetailsModal({ onClose }: Props) {
  const { dynamicSelectedTask } = UseModal<IUserProps>();

  const initialValues: CustomerDetailsFormValues = {
    _id: dynamicSelectedTask?.user._id || "",
    name: dynamicSelectedTask?.user.name || "",
    email: dynamicSelectedTask?.user.email || "",
    phone: dynamicSelectedTask?.user.mobile || "",
    gstNumber: dynamicSelectedTask?.kyc.gstNumber || "",
    pincode: dynamicSelectedTask?.user.pinCode || "",
    kycApproved: dynamicSelectedTask?.user.kycApproved ?? false,
    isWhatsappApproved: dynamicSelectedTask?.user.isWhatsappApproved ?? false,
    isBlocked: dynamicSelectedTask?.user.isBlocked ?? false,
    shopName: dynamicSelectedTask?.user.shopName || "",
    state: dynamicSelectedTask?.kyc.state || "",
    country: dynamicSelectedTask?.kyc.country || "",
  };

  return (
    <div>
      <TaskModal className="xl:w-[50%] sm:w-3/4 w-full">
        <TaskModalHeader>
          <div className="md:w-[70%] w-full"></div>
          <MyCloseIcon
            onClick={() => {
              onClose();
            }}
          />
        </TaskModalHeader>
        <TaskModalContent>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              // console.log(values);
              try {
                const response = await Update_Customer_User_Api(
                  values,
                  values._id
                );
                if (response.status === 200 || response.status === 201) {
                  makeToast(response.data.message);
                }
              } catch (error: any) {
                if (error) {
                  makeToastError(error.response.data.message);
                  console.log(error);
                }
              }
            }}
          >
            {({ setFieldValue, values, isSubmitting }) => (
              <Form>
                {/* Name */}
                {/* {<pre>{JSON.stringify(values.kycApproved, null, 4)}</pre>} */}
                <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label>Name</Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    <Field
                      name="name"
                      type="text"
                      as={Input}
                      placeholder="Full name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label>Email</Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    <Field
                      name="email"
                      type="email"
                      as={Input}
                      placeholder="Email address"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label>Phone</Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    <Field
                      name="phone"
                      type="text"
                      as={Input}
                      placeholder="Phone number"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* GST Number */}
                <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label>GST Number</Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    <Field
                      name="gstNumber"
                      type="text"
                      as={Input}
                      placeholder="GST number"
                    />
                    <ErrorMessage
                      name="gstNumber"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* Pincode */}
                <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label>Pincode</Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    <Field
                      name="pincode"
                      type="text"
                      as={Input}
                      placeholder="Pin code"
                    />
                    <ErrorMessage
                      name="pincode"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* KYC Approved (Switch) */}

                <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label htmlFor="kycApprovedSwitch">KYC Status</Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    {/* <MySwitch
                      isOn={values.kycApproved}
                      handleToggle={() => {
                        setFieldValue("kycApproved", !values.kycApproved);
                      }}
                      id="kycApprovedSwitch"
                    /> */}
                    <Checkbox
                      checked={values.kycApproved}
                      disabled={!dynamicSelectedTask?.user.kycsubmitted}
                      onChange={() => {
                        if (!dynamicSelectedTask?.user.kycsubmitted) {
                          return makeToastError(
                            "The User has not submitted the Kyc yet.."
                          );
                        }
                        setFieldValue("kycApproved", !values.kycApproved);
                      }}
                    />

                    {/* <input
                      type="checkbox"
                      checked={values.kycApproved}
                      onChange={() => {
                        setFieldValue("kycApproved", !values.kycApproved);
                      }}
                    /> */}

                    <ErrorMessage
                      name="kycApproved"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* KYC Approved (Switch) */}
                <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label>Whatsapp Access Status</Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    <Checkbox
                      checked={values.isWhatsappApproved}
                      onChange={() => {
                        setFieldValue(
                          "isWhatsappApproved",
                          !values.isWhatsappApproved
                        );
                      }}
                    />

                    <ErrorMessage
                      name="isWhatsappApproved"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* use is blocked (Switch) */}
                <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label>
                    User Account{" "}
                    <span className="text-textGray text-xs">
                      ( Block/Unblock )
                    </span>{" "}
                  </Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    <Checkbox
                      checked={values.isBlocked}
                      onChange={() => {
                        setFieldValue("isBlocked", !values.isBlocked);
                      }}
                    />

                    <ErrorMessage
                      name="isBlocked"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* State */}
                <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label>State</Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    <Field
                      name="state"
                      type="text"
                      as={Input}
                      placeholder="State"
                    />
                    <ErrorMessage
                      name="state"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label>Country</Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    <Field
                      name="country"
                      type="text"
                      as={Input}
                      placeholder="Country"
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* Uploaded Document */}
                {/* <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label>Uploaded Document</Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    <MyPdf
                      value="/Invoice_INV1482989614215502 (16).pdf"
                      className="w-10 h-10"
                    />
                    <ErrorMessage
                      name="uploadedDocument"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div> */}

                {/* Status */}
                {/* <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label>Status</Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    <Field
                      name="status"
                      type="text"
                      as={Input}
                      disabled
                      placeholder="Status"
                    />
                  </div>
                </div> */}

                {/* Comment */}
                {/* <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                  <Label>Comment</Label>
                  <div className="flex flex-col md:w-[70%] w-full text-sm">
                    <Field
                      name="comment"
                      as="textarea"
                      placeholder="Add comments"
                      className="h-20 border p-2 rounded-md resize-none"
                    />
                    <ErrorMessage
                      name="comment"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div> */}

                {/* Actions */}
                <div className="flex justify-end mt-6">
                  {/* <AyButton
                    title="Cancel"
                    type="button"
                    outLineColor=""
                    variant="outlined"
                  /> */}
                  <AyButton type="submit">
                    <Loader state={isSubmitting}>Save</Loader>
                  </AyButton>
                </div>
              </Form>
            )}
          </Formik>
        </TaskModalContent>
      </TaskModal>
    </div>
  );
}
