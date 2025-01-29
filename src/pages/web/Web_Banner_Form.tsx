// =================================================================
// =================================================================
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { makeToast, makeToastError } from "@/utils/toaster";
import AyButton from "@/components/myUi/AyButton";
import WebFilesField from "./Web_Files_Field";

import MediaFilesModal from "@/components/media/Media_Files_Modal";

type FormData = {
  home_slider_1: { imageUrl: string; imageLink: string }[];
  home_slider_2: { imageUrl: string; imageLink: string }[];
  home_slider_3: { imageUrl: string; imageLink: string }[];
  home_banner: { imageUrl: string; imageLink: string }[];
  kyc_slider: { imageUrl: string; imageLink: string }[]; // updated to object
  login_page: { imageUrl: string; imageLink: string }[];
};

export default function WebBannerForm() {
  const [loading, setLoading] = useState(false);
  const [selectedFieldName, setSelectedFieldName] = useState<{
    id: keyof FormData;
    name: keyof FormData;
    fileType?: string;
    label: string;
    haveImageLink: boolean;
    multiple?: boolean;
    mediaType?: "pdf" | "image";
  } | null>(null);

  const initialValues: FormData = {
    home_slider_1: [],
    home_slider_2: [],
    home_slider_3: [],
    home_banner: [],
    kyc_slider: [],
    login_page: [],
  };

  // const handleNewImageUpload = (
  //   src: string[],
  //   fieldName: keyof FormData,
  //   values: FormData,
  //   setFieldValue: (field: keyof FormData, value: any) => void
  // ) => {
  //   console.log(fieldName, "fieldName , handleNewImageUpload");

  //   if (src) {
  //     const selectedFiles = Array.from(src);
  //     if (
  //       fieldName === "home_banner" &&
  //       selectedFiles.length + values[fieldName].length > 2
  //     ) {
  //       makeToastError(
  //         "You can only select up to 2 images for the home banner"
  //       );
  //     } else if (selectedFiles.length + values[fieldName].length > 4) {
  //       makeToastError("You can only select up to 4 images for sliders");
  //     } else {
  //       const newImages = selectedFiles.map((file) => ({
  //         imageUrl: file,
  //         imageLink: "https://ayaboo.com/", // Default link
  //       }));
  //       setFieldValue(fieldName, values[fieldName].concat(newImages));
  //     }
  //   }
  // };
  const handleNewImageUpload = (
    src: string[],
    fieldName: keyof FormData,
    values: FormData,
    setFieldValue: (field: keyof FormData, value: any) => void
  ) => {
    const files = src;
    if (files) {
      const selectedFiles = Array.from(files);
      if (
        fieldName === "home_banner" &&
        selectedFiles.length + values[fieldName].length > 2
      ) {
        makeToastError(
          "You can only select up to 2 images for the home banner"
        );
      } else if (selectedFiles.length + values[fieldName].length > 4) {
        makeToastError("You can only select up to 4 images for sliders");
      } else if (fieldName === "kyc_slider") {
        setFieldValue(fieldName, [...values.kyc_slider, ...selectedFiles]); // Allow multiple files for kyc_slider
      } else if (fieldName === "login_page") {
        setFieldValue(fieldName, [...values.login_page, ...selectedFiles]); // Allow multiple files for kyc_slider
      } else {
        const newImages = selectedFiles.map((file) => ({
          imageUrl: file,
          imageLink: "https://ayaboo.com/",
        }));
        makeToast(`Image Selected: ${fieldName}`)
        setFieldValue(fieldName, values[fieldName].concat(newImages));
        handleCloseModal();
      }
    }
  };

  const handleImageLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldName: keyof FormData,
    values: FormData,
    setFieldValue: (field: keyof FormData, value: any) => void
  ) => {
    const baseLink = "https://ayaboo.com/";
    let updatedValue = e.target.value;

    if (!updatedValue.startsWith(baseLink)) {
      updatedValue = baseLink;
    }
    const updatedImages = [...values[fieldName]];
    updatedImages[index].imageLink = updatedValue;
    setFieldValue(fieldName, updatedImages);
  };

  const handleCloseModal = () => {
    setSelectedFieldName(null); // Close modal
  };

  const userDetailsFields: {
    id: keyof FormData;
    name: keyof FormData;
    fileType?: string;
    label: string;
    haveImageLink: boolean;
    multiple?: boolean;
    mediaType?: "pdf" | "image";
  }[] = [
    {
      id: "home_banner",
      name: "home_banner",
      fileType: "text",
      label: "Home Banner",
      haveImageLink: true,
      multiple: true,
      mediaType: "image",
    },
    {
      id: "home_slider_1",
      name: "home_slider_1",
      fileType: "text",
      label: "Home Slider 1",
      haveImageLink: true,
      multiple: true,
      mediaType: "image",
    },
    {
      id: "home_slider_2",
      name: "home_slider_2",
      fileType: "text",
      label: "Home Slider 2",
      haveImageLink: true,
      multiple: true,
      mediaType: "image",
    },
    {
      id: "home_slider_3",
      name: "home_slider_3",
      fileType: "text",
      label: "Home Slider 3",
      haveImageLink: true,
      multiple: true,
      mediaType: "image",
    },
    {
      id: "kyc_slider",
      name: "kyc_slider",
      fileType: "text",
      label: "Kyc Slider",
      haveImageLink: false,
      multiple: false,
      mediaType: "image",
    },
    {
      id: "login_page",
      name: "login_page",
      fileType: "text",
      label: "Login Page",
      haveImageLink: false,
      multiple: false,
      mediaType: "image",
    },
  ];

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log(values);
          try {
            setLoading(true);
            // Simulate API request or any async action
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // On success
            makeToast("Form saved successfully!");
          } catch (error) {
            makeToastError("Failed to save form. Please try again.");
            console.log(error);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="">
            <div className="lg:max-w-2xl  space-y-4 shadow-sm p-4 border rounded-md">
              {userDetailsFields.map((field) => (
                <div
                  key={field.id}
                  className=""
                  onClick={() => {
                    // console.log(field.name, "field.name}");
                    setSelectedFieldName(field); // Update selected field name
                  }}
                >
                  <WebFilesField
                    setFieldValue={setFieldValue}
                    haveImageLink={field.haveImageLink}
                    images={values[field.name]}
                    label={field.label}
                    fieldName={field.name} // Use field.name here
                    // handleNewImageUpload={(src, fieldName) => {
                    //   handleNewImageUpload(
                    //     src,
                    //     fieldName as keyof FormData,
                    //     values,
                    //     setFieldValue
                    //   );
                    // }}
                    handleLinkChange={(e, index) =>
                      handleImageLinkChange(
                        e,
                        index,
                        field.name,
                        values,
                        setFieldValue
                      )
                    }
                  />

                  {/* Show modal only for the selected field */}
                </div>
              ))}
            </div>

            {selectedFieldName && (
              <MediaFilesModal
                handleFileUpload={(src) => {
                  handleNewImageUpload(
                    src,
                    selectedFieldName.name,
                    values,
                    setFieldValue
                  )
                  // const updatedFiles = src.map((file) => ({
                  //   imageUrl: file,
                  //   imageLink: "https://ayaboo.com/",
                  // }));
                  // setFieldValue(selectedFieldName.name, updatedFiles);
                  // handleCloseModal(); // Close modal after selection
                }}
                fieldName={selectedFieldName.name}
                multiple={selectedFieldName.multiple}
                mediaType={selectedFieldName.mediaType}
              />
            )}

            <div className="flex justify-end mt-10">
              <AyButton title="Save" type="submit" loading={loading} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
