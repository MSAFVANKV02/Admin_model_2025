// import MyCloseIcon from "@/components/icons/My_CloseIcon";
// import MyEditIcon from "@/components/icons/My_EditIcon";
// import MyEyeIcon from "@/components/icons/My_EyeIcon";
// import TaskModal, {
//   TaskModalContent,
//   TaskModalHeader,
// } from "@/components/modals/TaskModal";
// import { Label } from "@/components/ui/label";
// import { useModal } from "@/providers/context/context";
// import { StoreTypes } from "@/types/storeTypes";
// import { useState } from "react";

// type Props = {
//   data: StoreTypes;
// };

// export default function StoreTableAction({ data }: Props) {
//   const { setIsOpen } = useModal();
//   const [selectedData, setSelectedData] = useState<StoreTypes | null>(null);

//   const handleViewClick = () => {
//     setSelectedData(data); // Set the selected row's data
//     setIsOpen(true); // Open the modal
//   };

//   const handleCloseModal = () => {
//     setSelectedData(null); // Clear selected data
//     setIsOpen(false); // Close the modal
//   };

//   return (
//     <div>
//       <div className="flex items-center">
//         <MyEyeIcon onClick={handleViewClick} />
//         <MyEditIcon onClick={() => {}} />
//       </div>

//       {/* Modal specifically tied to the selected data */}
//       {selectedData && (
//         <TaskModal className="xl:w-[50%] md:w-[70%] w-full md:h-[90%] h-full">
//           <TaskModalHeader>
//             <h5 className="font-bold capitalize">Store Details</h5>
//             <div className="">
//               <MyCloseIcon onClick={handleCloseModal} isTooltip={false} />
//             </div>
//           </TaskModalHeader>

//           <TaskModalContent className="space-y-3 sm:px-7 pt-5">
//             {/* Store Name */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">Store Name :</Label>
//               <span>{selectedData.name || "N/A"}</span>
//             </div>

//             {/* GST Number */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">GST Number :</Label>
//               <span>{selectedData.gstNumber || "N/A"}</span>
//             </div>

//             {/* Store Address */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">Store Address :</Label>
//               <span>{selectedData.Address || "N/A"}</span>
//             </div>

//             {/* Store Capacity in Cubic */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">
//                 Store Capacity (in cubic):
//               </Label>
//               <span>{selectedData.storeCapacity || "N/A"}</span>
//             </div>

//             {/* State */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">State :</Label>
//               <span>{selectedData.state || "N/A"}</span>
//             </div>

//             {/* Country */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">Country :</Label>
//               <span>{selectedData.country || "N/A"}</span>
//             </div>

//             {/* Pincode */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">Pincode :</Label>
//               <span>{selectedData.pinCode || "N/A"}</span>
//             </div>

//             {/* Google Location */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">Google Location :</Label>
//               <div className="">
//                 lat:{" "}
//                 <span>{selectedData?.googleLocation?.latitude || "N/A"}</span>
//                 lng:{" "}
//                 <span>{selectedData?.googleLocation?.longitude || "N/A"}</span>
//               </div>
//             </div>

//             {/* Store Manager */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">Store Manager :</Label>
//               <span>{selectedData.manager || "N/A"}</span>
//             </div>

//             {/* Email ID */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">Email ID :</Label>
//               <span>{selectedData.emailId || "N/A"}</span>
//             </div>

//             {/* Phone Number */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">Phone Number :</Label>
//               <span>{selectedData.phoneNumber || "N/A"}</span>
//             </div>

//             {/* User Name */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">User Name :</Label>
//               <span>{selectedData.userName || "N/A"}</span>
//             </div>

//             {/* Password */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">Password :</Label>
//               <span>{selectedData.password || "N/A"}</span>
//             </div>

//             {/* In-House Product */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">
//                 In-House Product :
//               </Label>
//               <span>{selectedData.inHouseProduct ? "Yes" : "No"}</span>
//             </div>

//             {/* Bank Details */}
//             <div className="border-t-2 pt-4 space-y-3">
//               <div className="text-lg font-semibold">Bank Details</div>

//               {/* Account Name */}
//               <div className="flex justify-between sm:flex-row flex-col gap-3">
//                 <Label className="text-sm text-textGray">Account Name :</Label>
//                 <span>{selectedData.bankDetails.accountName || "N/A"}</span>
//               </div>

//               {/* Account Number */}
//               <div className="flex justify-between sm:flex-row flex-col gap-3">
//                 <Label className="text-sm text-textGray">
//                   Account Number :
//                 </Label>
//                 <span>{selectedData.bankDetails.accountNumber || "N/A"}</span>
//               </div>

//               {/* IFSC */}
//               <div className="flex justify-between sm:flex-row flex-col gap-3">
//                 <Label className="text-sm text-textGray">IFSC :</Label>
//                 <span>{selectedData.bankDetails.ifscCode || "N/A"}</span>
//               </div>

//               {/* Shift Code */}
//               <div className="flex justify-between sm:flex-row flex-col gap-3">
//                 <Label className="text-sm text-textGray">Shift Code :</Label>
//                 <span>{selectedData.bankDetails.shiftCode || "N/A"}</span>
//               </div>

//               {/* UPI ID */}
//               <div className="flex justify-between sm:flex-row flex-col gap-3">
//                 <Label className="text-sm text-textGray">UPI ID :</Label>
//                 <span>{selectedData.bankDetails.upiId || "N/A"}</span>
//               </div>
//             </div>

//             {/* Store Capacity in Cubic Meter */}
//             <div className="flex justify-between sm:flex-row flex-col gap-3">
//               <Label className="text-sm text-textGray">
//                 Store Capacity (in cubic meters) :
//               </Label>
//               <span>{selectedData.storeCapacity || "N/A"}</span>
//             </div>
//           </TaskModalContent>
//         </TaskModal>
//       )}
//     </div>
//   );
// }
// =================================================================
import MyCloseIcon from "@/components/icons/My_CloseIcon";
import MyEyeIcon from "@/components/icons/My_EyeIcon";
import MyIcon from "@/components/icons/My_Icon";
import TaskModal, {
  TaskModalContent,
  TaskModalHeader,
} from "@/components/modals/TaskModal";
import MyPdf from "@/components/myUi/MyPdf";
import { Label } from "@/components/ui/label";
import ApproveStoreSeller from "@/hooks/approve-store-seller-route";
import { registrationTypes } from "@/pages/store/store-creation/store_input_filds";
import { useModal } from "@/providers/context/context";
import { useAppSelector } from "@/redux/hook";
import { IRegistrationTypes, StoreTypes } from "@/types/storeTypes";
import { ReactNode, useState } from "react";

type Props = {
  data: StoreTypes;
};

export default function StoreTableAction({ data }: Props) {
  const { setIsOpen } = useModal();
  const [selectedData, setSelectedData] = useState<StoreTypes | any>(null);
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
  }[] = [
    { label: "Account Type", key: "role" },
    {
      label: "Register Type",
      key: "registrationType",
      render: (data: IRegistrationTypes) => getRegistrationTypeName(data),
    },
    ...(selectedData?.role === "Seller"
      ? ([{ label: "Seller Name", key: "name" }] as const)
      : []),
    ...(selectedData?.role === "Store"
      ? ([{ label: "Store Name", key: "name" }] as const)
      : []),
    { label: "GST Number", key: "gstNumber" },
    { label: "Store Address", key: "Address" },
    { label: "Store Capacity (in cubic)", key: "storeCapacity" },
    { label: "State", key: "state" },
    { label: "Country", key: "country" },
    { label: "Pincode", key: "pinCode" },
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
    { label: "Store Manager", key: "manager" },
    { label: "Email ID", key: "emailId" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "User Name", key: "userName" },
    { label: "Password", key: "password" },
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
          color={`${data?.adminStatus === "rejected" ? "red":""}`}
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

          <TaskModalContent className="space-y-3 sm:px-7 pt-5">
            {/* Dynamic Fields */}
            {fields.map((field, index) => (
              <div
                key={index}
                className="flex justify-between lg:flex-row flex-col gap-3"
              >
                <Label className="text-sm text-textGray">{field.label} :</Label>
                <span className="w-3/4 text-end text-sm">
                  {field.render
                    ? field.render(selectedData[field.key]) // Custom render function
                    : typeof selectedData[field.key] === "object"
                    ? JSON.stringify(selectedData[field.key]) // Render objects as JSON
                    : selectedData[field.key]?.toString() || "N/A"}{" "}
                  {/* Convert to string */}
                </span>
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
                  <span className="w-3/4 text-end text-sm">
                    {selectedData.bankDetails[field.key] || "N/A"}
                  </span>
                </div>
              ))}
            </div>

            {/* Document Fields */}
            {/* <div className="border-t-2 pt-4 space-y-3">
              <div className="text-lg font-semibold">Documents</div>
              {[
                // Render available documents first
                ...documentFields.filter((field) => selectedData[field.key]),
                // Render missing documents last
                ...documentFields.filter((field) => !selectedData[field.key]),
              ].map((field, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-3 w-full sm:flex-row flex-col gap-3"
                >
                  <Label className="text-sm text-textGray">
                    {field.label} :
                  </Label>
                  {selectedData[field.key] ? (
                    <div className="w text-end text-sm">
                      <MyPdf
                        value={selectedData[field.key] as string}
                        isPdfShown={true}
                      />
                    </div>
                  ) : (
                    <div className="">N/A</div>
                  )}
                </div>
              ))}
            </div> */}
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
                          isPdfShown={true}
                        />
                      </div>
                    ) : (
                      <div className="">N/A</div>
                    )}
                  </div>
                ))}
            </div>
          </TaskModalContent>
        </TaskModal>
      )}
    </div>
  );
}
