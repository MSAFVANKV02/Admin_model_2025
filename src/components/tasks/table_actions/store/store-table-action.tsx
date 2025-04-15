// =================================================================
import Loader from "@/components/global/loader";
import MyCloseIcon from "@/components/icons/My_CloseIcon";
import MyEyeIcon from "@/components/icons/My_EyeIcon";
import MyIcon from "@/components/icons/My_Icon";
import TaskModal, {
  TaskModalContent,
  TaskModalHeader,
} from "@/components/modals/TaskModal";
import AyButton from "@/components/myUi/AyButton";
import MyPdf from "@/components/myUi/MyPdf";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ApproveStoreSeller from "@/hooks/approve-store-seller-route";
import { registrationTypes } from "@/pages/store/store-creation/store_input_filds";
import { UseModal } from "@/providers/context/context";
import { fetchSellerOrStoreDetails } from "@/redux/actions/storeSellerSlice";
import { dispatch, useAppSelector } from "@/redux/hook";
import { update_storeOrSeller_Api } from "@/services/profile/route";
import { IRegistrationTypes, StoreTypes } from "@/types/storeTypes";
import { makeToast, makeToastError } from "@/utils/toaster";
import { Field, Form, Formik } from "formik";
import { ReactNode, useState } from "react";

type Props = {
  data: StoreTypes;
};

export default function StoreTableAction({ data }: Props) {
  const { setIsOpen } = UseModal();
  const [selectedData, setSelectedData] = useState<StoreTypes | null>(null);

  const isLoading = useAppSelector((state) => state.loading.loadingState);
  // console.log("Loading State:", isLoading);

  // const [loading, setL]
  const { switchAdminApprovalRoute } = ApproveStoreSeller();
  // console.log(selectedData);

  const handleViewClick = () => {
    setSelectedData(data); // Set the selected row's data
    setIsOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setSelectedData(null); // Clear selected data
    setIsOpen(false); // Close the modal
  };

  const getRegistrationTypeName = (type: IRegistrationTypes): string => {
    const foundType = registrationTypes.find((item) => item.value === type);
    return foundType?.name || "N/A"; // Return "N/A" if not found
  };

  const openGoogleMap = (latitude: number, longitude: number) => {
    // Open Google Maps with the provided latitude and longitude
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank"); // Open in a new tab
  };

  // Define fields to display
  const fields: {
    label: string;
    key: keyof StoreTypes;
    // render?: (data: any) => string;
    render?: (data: any) => ReactNode;
    isEditable?: boolean;
  }[] = [
    { label: "Account Type", key: "role", isEditable: false },
    {
      label: "Register Type",
      key: "registrationType",
      render: (data: IRegistrationTypes) => getRegistrationTypeName(data),
    },
    ...(selectedData?.role === "Seller"
      ? ([{ label: "Seller Name", key: "name", isEditable: true }] as const)
      : []),
    ...(selectedData?.role === "Store"
      ? ([{ label: "Store Name", key: "name", isEditable: true }] as const)
      : []),
    { label: "GST Number", key: "gstNumber", isEditable: true },
    { label: "Store Address", key: "Address", isEditable: true },
    {
      label: "Store Capacity (in cubic)",
      key: "storeCapacity",
      isEditable: true,
    },
    { label: "State", key: "state", isEditable: true },
    { label: "Country", key: "country", isEditable: true },
    { label: "Pincode", key: "pinCode", isEditable: true },
    // {
    //   label: "Google Location",
    //   key: "googleLocation",
    //   render: (data: any) =>
    //     `lat: ${data?.latitude || "N/A"}, lng: ${data?.longitude || "N/A"}`,
    // },
    {
      label: "Google Location",
      key: "googleLocation",
      render: (data: any) => {
        const latitude = data?.latitude;
        const longitude = data?.longitude;
        if (latitude && longitude) {
          return (
            <button
              onClick={() => openGoogleMap(latitude, longitude)}
              className="text-blue-500 underline"
            >
              lat: {latitude}, lng: {longitude}
            </button>
          );
        }
        return "N/A";
      },
    },
    { label: "Store Manager", key: "manager", isEditable: true },
    { label: "Email ID", key: "emailId", isEditable: true },
    { label: "Phone Number", key: "phoneNumber", isEditable: true },
    { label: "User Name", key: "userName", isEditable: true },
    { label: "Password", key: "password",isEditable:true },
    {
      label: "In-House Product",
      key: "inHouseProduct",
      render: (data: boolean) => (data ? "Yes" : "No"),
    },
  ];

  const documentFields: { label: string; key: keyof StoreTypes }[] = [
    { label: "Aadhaar Card", key: "aadhaarCard" },
    { label: "Company Certificate", key: "companyIncorporationCertificate" },
    { label: "Local Body License", key: "localBodyLicense" },
    { label: "Company Pan Card", key: "companyPanCard" },
    { label: "Pan Card", key: "panCard" },
    { label: "Gst Certificate", key: "gstCertificate" },
    { label: "Partnership Agreement", key: "partnershipAgreement" },
    { label: "Room Rent Agreement", key: "roomRentAgreement" },
  ];

  // Bank Details Fields
  const bankFields: { label: string; key: keyof StoreTypes["bankDetails"] }[] =
    [
      { label: "Account Name", key: "accountName" },
      { label: "Account Number", key: "accountNumber" },
      { label: "IFSC", key: "ifscCode" },
      { label: "Shift Code", key: "shiftCode" },
      { label: "UPI ID", key: "upiId" },
    ];

  // if (!selectedData) return

  return (
    <div>
      <div className="flex items-center">
        <MyEyeIcon onClick={handleViewClick} />

        {data?.adminStatus === "approved" ? (
          <MyIcon
            tooltipTitle={data?.adminStatus}
            icon={`${
              isLoading
                ? "line-md:loading-twotone-loop"
                : "flat-color-icons:approval"
            }`}
            onClick={() => {
              setSelectedData(data);

              switchAdminApprovalRoute(data?.role, "rejected", data?._id);
            }}
          />
        ) : (
          <MyIcon
            tooltipTitle={data?.adminStatus}
            color={`${data?.adminStatus === "rejected" ? "red" : ""}`}
            icon={`${
              isLoading ? "line-md:loading-twotone-loop" : "wpf:approval"
            }`}
            onClick={() => {
              setSelectedData(data);
              switchAdminApprovalRoute(data?.role, "approved", data?._id);
            }}
          />
        )}

        {/* flat-color-icons:approval */}
        {/* <MyEditIcon onClick={() => {}} /> */}
      </div>

      {/* Modal specifically tied to the selected data */}
      {selectedData && (
        <TaskModal
          className="xl:w-[50%] md:w-[70%] w-full md:h-[90%] h-full"
          onClick={() => {
            handleCloseModal();
          }}
        >
          <TaskModalHeader>
            <h5 className="font-bold capitalize">
              {selectedData?.role === "Seller"
                ? " Seller Details"
                : " Store Details"}
            </h5>
            <div className="">
              <MyCloseIcon onClick={handleCloseModal} isTooltip={false} />
            </div>
          </TaskModalHeader>

          <Formik<Partial<StoreTypes>>
            initialValues={{
              _id: selectedData._id,
              registrationType:
                selectedData?.registrationType || "Sole Proprietorship",
              role: selectedData?.role || "Seller",
              avatar: selectedData?.avatar || "",
              isRegistered: selectedData?.isRegistered || false,
              isBlocked: selectedData?.isBlocked || false,
              mobileVerified: selectedData?.mobileVerified || false,
              subscription: selectedData?.subscription || false,
              adminStatus: selectedData?.adminStatus || "pending",
              name: selectedData?.name || "",
              gstNumber: selectedData?.gstNumber || "",
              Address: selectedData?.Address || "",
              storeCapacity: selectedData?.storeCapacity || null,
              state: selectedData?.state || "",
              country: selectedData?.country || "",
              pinCode: selectedData?.pinCode || "",
              googleLocation: selectedData?.googleLocation || {
                latitude: null,
                longitude: null,
              },
              manager: selectedData?.manager || "",
              emailId: selectedData?.emailId || "",
              phoneNumber: selectedData?.phoneNumber || "",
              userName: selectedData?.userName || "",
              password: selectedData?.password || "",
              inHouseProduct: selectedData?.inHouseProduct || false,
              bankDetails: {
                accountName: selectedData?.bankDetails?.accountName || "",
                accountNumber: selectedData?.bankDetails?.accountNumber || "",
                ifscCode: selectedData?.bankDetails?.ifscCode || "",
                shiftCode: selectedData?.bankDetails?.shiftCode || "",
                upiId: selectedData?.bankDetails?.upiId || "",
              },
              amount: selectedData?.amount || null,
              capacity: selectedData?.capacity || null,
              status: selectedData?.status || "pending",
              created_at: selectedData?.created_at || new Date(),

              // Documents
              aadhaarCard: selectedData?.aadhaarCard || null,
              panCard: selectedData?.panCard || null,
              localBodyLicense: selectedData?.localBodyLicense || null,
              roomRentAgreement: selectedData?.roomRentAgreement || null,
              gstCertificate: selectedData?.gstCertificate || null,
              partnershipAgreement: selectedData?.partnershipAgreement || null,
              companyPanCard: selectedData?.companyPanCard || null,
              companyIncorporationCertificate:
                selectedData?.companyIncorporationCertificate || null,
              cinNumber: selectedData?.cinNumber || "",
              llpNumber: selectedData?.llpNumber || "",
            }}
            enableReinitialize
            onSubmit={async (values) => {
              // Your code to update the data goes here
              try {
                const { data, status } = await update_storeOrSeller_Api(values);
                if (status === 200) {
                  makeToast(data.message);
                  setSelectedData(data.data);
                  dispatch(fetchSellerOrStoreDetails("store"));
                }
              } catch (error:any) {
                console.error("Error updating data:");
                if(error){
                  makeToastError(error.response.data.message);
                }
              }
              // console.log(values);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <TaskModalContent className="space-y-3 sm:px-7 pt-5 relative flex flex-col h-full">
                  {/* Dynamic Fields */}
                  {fields.map((field, index) => (
                    <div
                      key={index}
                      className="flex justify-between lg:flex-row flex-col gap-3"
                    >
                      <Label className="text-sm text-textGray">
                        {field.label} :
                      </Label>
                      {field.render ? (
                        field.render(selectedData[field.key])
                      ) : field.isEditable ? (
                        <Field
                          name={field.key}
                          as={Input}
                          className="md:w-3/4  text-sm"
                          value={values[field.key] || ""}
                          // onChange={handleChange}
                        />
                      ) : (
                        selectedData[field.key]?.toString()
                      )}

                      {/* <span className="w-3/4 text-end text-sm">
                        {field.render
                          ? field.render(selectedData[field.key]) // Custom render function
                          : typeof selectedData[field.key] === "object"
                          ? JSON.stringify(selectedData[field.key]) // Render objects as JSON
                          : selectedData[field.key]?.toString() || "N/A"}{" "}
                     
                      </span> */}
                    </div>
                  ))}

                  <div className="border-t-2 pt-4 space-y-3">
                    <div className="text-lg font-semibold">Bank Details</div>
                    {bankFields.map((field, index) => (
                      <div
                        key={index}
                        className="flex justify-between lg:flex-row flex-col gap-3"
                      >
                        <Label className="text-sm text-textGray">
                          {field.label} :
                        </Label>
                        {/* <span className="w-3/4 text-end text-sm">
                          {selectedData.bankDetails[field.key] || "N/A"}
                        </span> */}
                        {/* {values.bankDetails?.[field.key]} */}
                        <Field
                          name={`bankDetails.${field.key}`}
                          as={Input}
                          className="md:w-3/4 text-sm"
                          value={values.bankDetails?.[field.key] || ""}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 pt-4 space-y-3">
                    <div className="text-lg font-semibold">Documents</div>
                    {documentFields
                      .sort((a) => (selectedData[a.key] ? -1 : 1)) // Sort available files first
                      .map((field, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center border-b pb-3 w-full lg:flex-row flex-col gap-3"
                        >
                          <Label className="text-sm text-textGray">
                            {field.label} :
                          </Label>
                          {selectedData[field.key] ? (
                            <div className="w text-end text-sm">
                              <MyPdf
                                value={selectedData[field.key] as string}
                                isPdfShown={false}
                                selectedData={selectedData[field.key] as string}
                              >
                                Click Here
                              </MyPdf>
                              {/* <iframe
                                src={selectedData[field.key] as string}
                                className="w-full h-[500px]"
                                title="PDF Viewer"
                              /> */}
                              {/* <LocalPdfShow fileURL={selectedData[field.key] as string} />  */}
                            </div>
                          ) : (
                            <div className="">N/A</div>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="flex justify-end">
                    <AyButton type="submit">
                      <Loader state={isSubmitting}>Save Changes</Loader>
                    </AyButton>
                  </div>
                </TaskModalContent>
              </Form>
            )}
          </Formik>
        </TaskModal>
      )}
    </div>
  );
}
