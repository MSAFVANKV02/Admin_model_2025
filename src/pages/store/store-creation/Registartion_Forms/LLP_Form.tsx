import FileInputAdvanced from "@/components/myUi/FileInput_Advanced";

import { StoreTypes } from "@/types/storeTypes";
import { useState } from "react";

type FileInputFields = {
  AadhaarCard: File | string;
  PanCard: File | string;
  LocalBodyLicense: File | string;
  RoomRentAgreement: File | string;
  GstFile: File | string;
};

type Props = {
  values: StoreTypes;
  setFieldValue: (field: string, value: any) => void;
};

export default function LLPForm({
  values,
  setFieldValue,
}: Props) {
  const [fileNames, setFileNames] = useState<
    Record<keyof FileInputFields, string | null>
  >({
    AadhaarCard: null,
    PanCard: null,
    LocalBodyLicense: null,
    RoomRentAgreement: null,
    GstFile: null,
  });
  const fileFields: {
    id: keyof FileInputFields;
    label: string;
    fileType: string;
  }[] = [
    { id: "AadhaarCard", fileType: "file", label: "Aadhaar Card" },
    { id: "PanCard", fileType: "file", label: "PAN Card" },
    { id: "LocalBodyLicense", fileType: "file", label: "Local Body License" },
    { id: "RoomRentAgreement", fileType: "file", label: "Room Rent Agreement" },
    { id: "GstFile", fileType: "file", label: "GST File" },
  ];
  // console.log(values.AadhaarCard?.name ?? "");

  return (
    <div>
      {fileFields.map((field) => (
        <div
          key={field.id}
          className="flex items-center justify-between lg:flex-row flex-col mb-4"
        >
          <FileInputAdvanced
            title={field.label}
            value={values[field.id]}
            accept=".pdf"
            id={field.id}
            selectedData={fileNames[field.id] || "Choose File"}
            name={field.id}
            type={field.fileType}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setFileNames((prev) => ({
                  ...prev,
                  [field.id]: file.name,
                }));
                setFieldValue(field.id, file);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
