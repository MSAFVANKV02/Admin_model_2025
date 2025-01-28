// =================================================================
// =================================================================
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { makeToast, makeToastError } from "@/utils/toaster";
import AyButton from "@/components/myUi/AyButton";
import WebFilesField from "./Web_Files_Field";

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
    console.log(src, "src");
  
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
      } else {
        const newImages = selectedFiles.map((file) => ({
          imageUrl: file,
          imageLink: "https://ayaboo.com/", // Default link
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
    const updatedImages = [...values[fieldName]];
    updatedImages[index].imageLink = updatedValue;
    setFieldValue(fieldName, updatedImages);
  };

  const userDetailsFields: {
    id: keyof FormData;
    name: keyof FormData;
    fileType?: string;
    label: string;
    imageLink: boolean;
  }[] = [
    {
      id: "home_banner",
      name: "home_banner",
      fileType: "text",
      label: "Home Banner",
      imageLink: true,
    },
    {
      id: "home_slider_1",
      name: "home_slider_1",
      fileType: "text",
      label: "Home Slider 1",
      imageLink: true,
    },
    {
      id: "home_slider_2",
      name: "home_slider_2",
      fileType: "text",
      label: "Home Slider 2",
      imageLink: true,
    },
    {
      id: "home_slider_3",
      name: "home_slider_3",
      fileType: "text",
      label: "Home Slider 3",
      imageLink: true,
    },
    {
      id: "kyc_slider",
      name: "kyc_slider",
      fileType: "text",
      label: "Kyc Slider",
      imageLink: false,
    },
    {
      id: "login_page",
      name: "login_page",
      fileType: "text",
      label: "Login Page",
      imageLink: false,
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
            <WebFilesField
              setFieldValue={setFieldValue}
              haveImageLink={true}
              images={values.home_banner}
              label="src"

              fieldName="home_banner"
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
                  "home_banner",
                  values,
                  setFieldValue
                )
              }
              />
              {userDetailsFields.map((field) => (
                <WebFilesField
                  key={field.name}
                  setFieldValue={setFieldValue}
                  haveImageLink={field.imageLink}
                  images={values[field.name]} // Pass the images correctly
                  label={field.label} // Use the label defined in the array
                  fieldName={field.name} // Pass the field name as a string (not values[field.name])
                  handleNewImageUpload={(src, fieldName) => {
                    handleNewImageUpload(
                      src,
                      fieldName as keyof FormData,
                      values,
                      setFieldValue
                    );
                  }}
                  handleLinkChange={
                    (e, index) =>
                      handleImageLinkChange(
                        e,
                        index,
                        field.name,
                        values,
                        setFieldValue
                      ) // Pass field.name here as well
                  }
                />
              ))}
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
