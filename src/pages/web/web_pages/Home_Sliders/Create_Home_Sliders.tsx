import Image from "@/components/global/image";
import MyCloseIcon from "@/components/icons/My_CloseIcon";
import AyButton from "@/components/myUi/AyButton";
import OpenMediaDrawer from "@/components/myUi/OpenMediaDrawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  create_Banner_Image_Api,
  RootBannerImageApi,
} from "@/services/banners/route";
import { IAdsBannerTypes } from "@/types/ads.bannerTypes";
import { makeToast } from "@/utils/toaster";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSearchParams } from "react-router-dom";

export interface SelectOption {
  _id: string;
  name: string;
}

const CreateHomeSliders = () => {
  const [searchParams] = useSearchParams();

  const bannerParam = searchParams.get("banner") ?? "home_slider_1";
  const newBanner = bannerParam.replace(/-/g, "_") as IAdsBannerTypes;

  // console.log(newBanner);

  const handleImageLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    values: RootBannerImageApi,
    setFieldValue: (field: keyof RootBannerImageApi, value: any) => void
  ) => {
    const baseLink = "https://ayaboo.com/";
    let updatedValue = e.target.value;

    if (!updatedValue.startsWith(baseLink)) {
      updatedValue = baseLink;
    }
    const updatedImages = [...values["bannerImages"]];
    updatedImages[index].redirectUrl = updatedValue;
    setFieldValue("bannerImages", updatedImages);
  };

  return (
    <div>
      <Formik<RootBannerImageApi>
        initialValues={{
          bannerImages: [
            {
              banner: "",
              redirectUrl: "https://ayaboo.com/",
              context: "",
              priority: 0,
              banner_type: newBanner as IAdsBannerTypes,
              isEnable: true,
            },
          ],
        }}
        onSubmit={async (values, { resetForm }) => {
          console.log(values, "values from frontend");
          try {
            const response = await create_Banner_Image_Api({
              bannerImages: values.bannerImages,
            });
            console.log(response, "response");

            if (response.status === 201 || response.status === 200) {
              makeToast(response.data.message);
              resetForm();
            }
          } catch (error) {
            console.error("error in create cover image", error);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="max-w-screen-md mt-5">
            {/*1. select an redirectUrl */}
            <div className="flex flex-col gap-3">
              {values.bannerImages.map((coverImage, index) => (
                <div
                  className="border border-dashed space-y-4  p-10 relative"
                  key={index}
                >
                  {index !== 0 && (
                    <div className="text-red-500 text-sm absolute right-3 top-3 hover:text-red-700">
                      <MyCloseIcon
                        onClick={() => {
                          setFieldValue(
                            "bannerImages",
                            values.bannerImages.filter((_, i) => i !== index)
                          );
                        }}
                      />
                    </div>
                  )}

                  <div className=" flex justify-between gap-1 ">
                    <Label className="text-textGray text-xs font-bold">
                      Select redirectUrl
                    </Label>
                    <div className="flex flex-col gap-3 w-3/4">
                      <Field
                        as={Input}
                        value={coverImage.redirectUrl}
                        type="text"
                        placeholder="add your url"
                        className="text-xs p-5"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleImageLinkChange(e, index, values, setFieldValue)
                        }
                        name={`bannerImages[${index}].redirectUrl`}
                      />
                      <ErrorMessage
                        name={`bannerImages[${index}].redirectUrl`}
                        component="span"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>

                  {/* select an redirectUrl */}
                  <OpenMediaDrawer
                    category="bannerImages"
                    title="Cover Image"
                    className="gap-1 flex-row overflow-hidden"
                    values={values}
                    multiple={false}
                    className2="lg:w-3/4"
                    name={`bannerImages[${index}].banner`}
                    mediaType="image"
                    handleFileChange={(event) => {
                      const files = event;
                      if (!files) return;
                      const srcArray = files.map((file) => file.imageurl);
                      // console.log(srcArray,'srcArray');

                      //   setFieldValue(fieldName, srcArray[0]);
                      setFieldValue(
                        `bannerImages[${index}].banner`,
                        srcArray[0]
                      );
                    }}
                  />
                  {coverImage.banner && (
                    <div className="flex justify-end ">
                      <div className=" md:w-3/4 ">
                        <div className="relative w-14 h-14 bg-gray-50">
                          <Image
                            src={coverImage.banner}
                            alt={`coverImage-${index}`}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center w-full">
              <button
                type="button"
                className="border border-dashed border-textMain bg-gray-50 shadow-sm w-full hover:bg-blue-50 duration-300 transition-all p-3 mt-5"
                onClick={() => {
                  setFieldValue("bannerImages", [
                    ...values.bannerImages,
                    {
                      banner: "",
                      index: values.bannerImages.length,
                      redirectUrl: "https://ayaboo.com/",
                      isEnable: true,
                      banner_type: newBanner,
                    },
                  ]);
                }}
              >
                Add New
              </button>
            </div>

            <div className="flex justify-end mt-5">
              <AyButton type="submit" title="" sx={{}} variant="cancel">
                Submit
              </AyButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateHomeSliders;
