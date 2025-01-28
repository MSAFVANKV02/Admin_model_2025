// =================================================================
// =================================================================
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { makeToast, makeToastError } from "@/utils/toaster";
import AyButton from "@/components/myUi/AyButton";
import WebFilesField from "./Web_Files_Field";

type FormData = {
  home_slider_1: { imageUrl: File | string; imageLink: string }[];
  home_slider_2: { imageUrl: File | string; imageLink: string }[];
  home_slider_3: { imageUrl: File | string; imageLink: string }[];
  home_banner: { imageUrl: File | string; imageLink: string }[];
  kyc_slider: File[];
  login_page: File[];
};

export default function WebBannerForm() {
  const [loading, setLoading] = useState(false);
  const initialValues: FormData = {
    home_slider_1: [],
    home_slider_2: [],
    home_slider_3: [],
    home_banner: [],
    kyc_slider: [],
    login_page: [],
  };

  

  const handleNewImageUpload = (
    src: string[],
    fieldName: keyof FormData,
    values: FormData,
    setFieldValue: (field: keyof FormData, value: any) => void
  ) => {
    console.log(src,'src');
    
    if (src) {
      const selectedFiles = Array.from(src);
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
        setFieldValue(fieldName, values[fieldName].concat(newImages));
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
    if (fieldName !== "kyc_slider" && fieldName !== "login_page") {
      const updatedImages = [...values[fieldName]];
      updatedImages[index].imageLink = updatedValue;
      setFieldValue(fieldName, updatedImages);
    }
  };

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
              <WebFilesField
              setFieldValue={setFieldValue}
              images={values.home_slider_1}
              label="src"

              fieldName="home_slider_1"
              handleNewImageUpload={(src, fieldName)=>{
                handleNewImageUpload(
                  src,
                  fieldName as keyof FormData,
                  values,
                  setFieldValue
                );
              }}
              handleLinkChange={(e, index) =>
                handleImageLinkChange(
                  e,
                  index,
                  "home_slider_1",
                  values,
                  setFieldValue
                )
              }
              />
             
              
            </div>

            <div className="flex justify-end mt-10">
              <AyButton title="Save" type="submit" loading={loading} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
