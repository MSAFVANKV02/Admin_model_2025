// import MyDeleteIcon from "@/components/icons/My_DeleteIcon";
// import FileInput from "@/components/myUi/FileInput";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { makeToastError } from "@/utils/toaster";
// import { Form, Formik } from "formik";

// type FormData = {
//   home_slider_1: { imageUrl: File | string; imageLink: string }[];
// };

// export default function WebBannerForm() {
//   const initialValues: FormData = {
//     home_slider_1: [],
//   };

//   const handleNewImageUpload = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     values: FormData,
//     setFieldValue: (field: string, value: any) => void
//   ) => {
//     const files = event.target.files;
//     if (files) {
//       const selectedFiles = Array.from(files);
//       if (selectedFiles.length + values.home_slider_1.length > 4) {
//         makeToastError("You can only select up to 4 images");
//       } else {
//         const newImages = selectedFiles.map((file) => ({
//           imageUrl: file,
//           imageLink: "https://ayaboo.com/",
//         }));
//         setFieldValue("home_slider_1", values.home_slider_1.concat(newImages));
//       }
//     }
//   };

//   const handleImageLinkChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number,
//     values: FormData,
//     setFieldValue: (field: string, value: any) => void
//   ) => {
//     const baseLink = "https://ayaboo.com/";
//     let updatedValue = e.target.value;

//     // Ensure the value always starts with the baseLink
//     if (!updatedValue.startsWith(baseLink)) {
//       updatedValue = baseLink;
//     }

//     const updatedImages = [...values.home_slider_1];
//     updatedImages[index].imageLink = updatedValue;
//     setFieldValue("home_slider_1", updatedImages);
//   };

//   return (
//     <div>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={(values) => {
//           console.log(values);
//         }}
//       >
//         {({ values, setFieldValue }) => {
//           const selectedFileNames = values.home_slider_1
//             .map((img) =>
//               typeof img.imageUrl === "string" ? "" : img.imageUrl.name
//             )
//             .filter((name) => name)
//             .join(", ");
//           return (
//             <Form className="max-w-xl space-y-4">

//                 {/*i want use as a component for reduce my code  */}
//               <div className="flex justify-between gap-4">
//                 <Label>Home Slider</Label>
//                 <div className="lg:w-3/4 flex flex-col gap-3">
//                   <FileInput
//                   img="typcn:camera"
//                     type="file"
//                     accept="image/png, image/jpeg, image/jpg, image/webp"
//                     className=""
//                     id="home_slider_1"
//                     name="home_slider_1"
//                     multiple
//                     selectedData={selectedFileNames}
//                     onChange={(e) =>
//                       handleNewImageUpload(e, values, setFieldValue)
//                     }
//                   />
//                   <div className="flex flex-col gap-2">
//                     {values.home_slider_1.map((imageObj, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center gap-4  p-2 rounded"
//                       >
//                         <div className="relative w-16 h-16">
//                           {typeof imageObj.imageUrl === "string" ? (
//                             <img
//                               src={imageObj.imageUrl}
//                               alt={`Slider ${index + 1}`}
//                               className="w-full h-full object-cover border rounded"
//                             />
//                           ) : (
//                             <img
//                               src={URL.createObjectURL(imageObj.imageUrl)}
//                               alt={`Slider ${index + 1}`}
//                               className="w-full h-full object-cover border rounded"
//                             />
//                           )}
//                           <div className="absolute -right-4 -top-8">
//                             <MyDeleteIcon
//                               color="#5F08B1"
//                               onClick={() => {
//                                 const updatedImages = values.home_slider_1.filter(
//                                   (_, i) => i !== index
//                                 );
//                                 setFieldValue("home_slider_1", updatedImages);
//                               }}
//                               icon="zondicons:close-solid"
//                             />
//                           </div>
//                         </div>
//                         <Input
//                           placeholder="Enter image link"
//                           value={imageObj.imageLink}
//                           //   onChange={(e) => {
//                           //     const updatedImages = [...values.home_slider_1];
//                           //     updatedImages[index].imageLink = e.target.value;
//                           //     setFieldValue("home_slider_1", updatedImages);
//                           //   }}
//                           onChange={(e) =>
//                             handleImageLinkChange(
//                               e,
//                               index,
//                               values,
//                               setFieldValue
//                             )
//                           }
//                           className="flex-1"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// }
// =================================================================
// =================================================================
import React from "react";
import { Formik, Form } from "formik";
import { makeToastError } from "@/utils/toaster";
import ImageUploader from "@/components/web-setups/Image_Uploader";
import AyButton from "@/components/myUi/AyButton";

type FormData = {
  home_slider_1: { imageUrl: File | string; imageLink: string }[];
  home_slider_2: { imageUrl: File | string; imageLink: string }[];
  home_slider_3: { imageUrl: File | string; imageLink: string }[];
  home_banner: { imageUrl: File | string; imageLink: string }[];
};

export default function WebBannerForm() {
  const initialValues: FormData = {
    home_slider_1: [],
    home_slider_2: [],
    home_slider_3: [],
    home_banner: [],


  };

//   const handleNewImageUpload = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     fieldName: keyof FormData,
//     values: FormData,
//     setFieldValue: (field: keyof FormData, value: any) => void
//   ) => {
//     const files = event.target.files;
//     if (files) {
//       const selectedFiles = Array.from(files);
//       if (selectedFiles.length + values[fieldName].length > 4) {
//         makeToastError("You can only select up to 4 images");
//       } else {
//         const newImages = selectedFiles.map((file) => ({
//           imageUrl: file,
//           imageLink: "https://ayaboo.com/",
//         }));
//         setFieldValue(fieldName, values[fieldName].concat(newImages));
//       }
//     }
//   };

const handleNewImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormData,
    values: FormData,
    setFieldValue: (field: keyof FormData, value: any) => void
  ) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      if (fieldName === "home_banner" && selectedFiles.length + values[fieldName].length > 2) {
        makeToastError("You can only select up to 2 images for the home banner");
      } else if (selectedFiles.length + values[fieldName].length > 4) {
        makeToastError("You can only select up to 4 images for sliders");
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

    const updatedImages = [...values[fieldName]];
    updatedImages[index].imageLink = updatedValue;
    setFieldValue(fieldName, updatedImages);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="lg:max-w-xl  space-y-4 shadow-sm p-4 border rounded-md">
            <ImageUploader
              label="Home Slider 1"
              fieldName="home_slider_1"
              images={values.home_slider_1}
              setFieldValue={setFieldValue}
              handleFileUpload={(e, fieldName) =>
                handleNewImageUpload(
                  e,
                  fieldName as keyof FormData,
                  values,
                  setFieldValue
                )
              }
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

            {/* 2 */}
            <ImageUploader
              label="Home Slider 2"
              fieldName="home_slider_2"
              images={values.home_slider_2}
              setFieldValue={setFieldValue}
              handleFileUpload={(e, fieldName) =>
                handleNewImageUpload(
                  e,
                  fieldName as keyof FormData,
                  values,
                  setFieldValue
                )
              }
              handleLinkChange={(e, index) =>
                handleImageLinkChange(
                  e,
                  index,
                  "home_slider_2",
                  values,
                  setFieldValue
                )
              }
            />

            {/* 3. */}
            <ImageUploader
              label="Home Slider 3"
              fieldName="home_slider_3"
              images={values.home_slider_3}
              setFieldValue={setFieldValue}
              handleFileUpload={(e, fieldName) =>
                handleNewImageUpload(
                  e,
                  fieldName as keyof FormData,
                  values,
                  setFieldValue
                )
              }
              handleLinkChange={(e, index) =>
                handleImageLinkChange(
                  e,
                  index,
                  "home_slider_3",
                  values,
                  setFieldValue
                )
              }
            />

            {/* 4. */}
            <ImageUploader
              label="Home Banner"
              fieldName="home_banner"
              images={values.home_banner}
              setFieldValue={setFieldValue}
              handleFileUpload={(e, fieldName) =>
                handleNewImageUpload(
                  e,
                  fieldName as keyof FormData,
                  values,
                  setFieldValue
                )
              }
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

            <div className="flex justify-end">
              <AyButton title="Save" type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
