import { useModal } from "@/providers/context/context";
import ProductLayout, {
  ProductContent,
  ProductFooter,
  ProductHeader,
} from "./product-layout";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GeneralSection from "./Page_Sections/GeneralSection-page";
import FilesMediaSectionPage from "./Page_Sections/FilesMeadiaSection-page";
import PriceStockSectionPage from "./Page_Sections/PriceStockSection-page";
import ShippingSectionPage from "./Page_Sections/ShippingSection-page";
import { Form, Formik } from "formik";
import { InitialValues } from "./initialValues";
import { getValidationSchema } from "./ProductSchema";

import AddProductsNavbar from "@/components/products/Add_Products_TaskBar";
import AyButton from "@/components/myUi/AyButton";
import { add_Product_Api } from "@/services/products/route";
import { IProdAddRoot } from "@/types/add_Prod_Types";
import { makeToast, makeToastError } from "@/utils/toaster";

const pageToStep: any = {
  general: 1,
  "files-media": 2,
  "price-stock": 3,
  shipping: 4,
};

export default function ProductAddPage() {
  const { search, pathname } = useLocation(); // Access current URL
  const navigate = useNavigate(); // For navigation
  const { selectedPage, setSelectedPage } = useModal();
  const [currentStep, setCurrentStep] = useState(1);
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  //   ====== formik =========================
  const sectionRefs = {
    general: useRef<HTMLDivElement>(null),
    "files-media": useRef<HTMLDivElement>(null),
    "price-stock": useRef<HTMLDivElement>(null),
    shipping: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const currentPath = searchParams.get("q") || "general";
    setSelectedPage(currentPath);
    setCurrentStep(pageToStep[currentPath]);
  }, [searchParams, setSelectedPage]);

  //   ====== got to next step =================================
  const handleNextStep = () => {
    // setFormData((prevData) => ({ ...prevData, ...data }));
    if (currentStep === 4) {
      return;
    }
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    const nextPage: any = Object.keys(pageToStep).find(
      (key) => pageToStep[key] === nextStep
    );
    setSelectedPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`${pathname}?q=${nextPage}`);
  };

  const handlePrevStep = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    const prevPage: any = Object.keys(pageToStep).find(
      (key) => pageToStep[key] === prevStep
    );
    setSelectedPage(prevPage);
    navigate(`${pathname}?q=${prevPage}`);
  };

  //   ==== switch pages =======
  const renderPageComponent = (
    setFieldValue: any,
    values: any,
    errors: any
  ) => {
    switch (selectedPage || "general") {
      case "general":
        return (
          <div className="" ref={sectionRefs.general}>
            <GeneralSection
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
            />
          </div>
        );
      case "files-media":
        return (
          <div ref={sectionRefs["files-media"]}>
            <FilesMediaSectionPage
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
            />
          </div>
        );
      case "price-stock":
        return (
          <div ref={sectionRefs["price-stock"]}>
            <PriceStockSectionPage
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
            />
          </div>
        );
      case "shipping":
        return (
          <div ref={sectionRefs.shipping}>
            <ShippingSectionPage
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
              sectionRefs={sectionRefs}
            />
          </div>
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <ProductLayout>
      <Formik
        initialValues={InitialValues}
        validationSchema={getValidationSchema(currentStep)}
        enableReinitialize={true}
        onSubmit={async (values,{resetForm}) => {
          console.log("submit", values);
          if (currentStep !== 4) {
            return handleNextStep();
          }
          try {
            const productData: IProdAddRoot = {
              product_name: values.product_name ?? "",
              mrp: values.mrp ?? 0,
              product_sku: values.product_sku ?? "",
              barcode: values.barcode ?? "",
              brand: values.brand ?? "",
              categoryId: values.categoryId ?? "",
              keywords: values.keywords ?? [],
              minimum_quantity: values.minimum_quantity ?? 0,
              product_weight: values.product_weight ?? 0,
              product_dimensions: {
                product_height: values.product_dimensions?.product_height ?? 0,
                product_length: values.product_dimensions?.product_length ?? 0,
                product_width: values.product_dimensions?.product_width ?? 0,
              },
              tax_details: values.tax_details ?? {
                hsn_sac_number:  0,
                non_gst_goods: "",
                calculation_types: "",
                on_items_rate_details: [],
                isCess: false,
              },
              is_featured_product: values.is_featured_product,
              is_todays_deal: values.is_todays_deal,
              description: values.description ?? "",
              gallery_image: values.gallery_image ?? [],
              thumbnails: values.thumbnails ?? [],
              sizeImages: values.sizeImages ?? [],
              basePrice: values.basePrice ?? 0,
              samplePrice: values.samplePrice ?? 0,
              discount: values.discount ?? 0,
              discount_type: values.discount_type ?? "",
              price_per_pieces: values.price_per_pieces ?? [],
              selectWise: values.selectWise ?? "",
              variations: values.variations ?? [],
              cod: values.cod ?? false,
              freeShipping: values.freeShipping ?? false,
              status: values.status ?? "pending",
            };
        
            const response = await add_Product_Api(productData);
            console.log(response,'response product add');
            

            if(response.status == 200){
              makeToast(response.data.message??"Product Added Successfully");
              resetForm();

            }

          } catch (error:any) {
            console.error("Product submission error:", error);
            if(error.response.data){
              makeToastError(error.response.data.message);
            }
          }
        }}
        
      >
        {({ values, setFieldValue, errors }) => (
          <Form>
            <ProductHeader className="flex-col w-full items-start gap-5">
              <AddProductsNavbar />
              <div className="text-lg font-bold capitalize px-4">
                {currentStep === 1 && "Product Information"}
                {currentStep === 2 && "Product Files & Media"}
                {currentStep === 3 && "Product Price & Stock"}
                {currentStep === 4 && "Shipping Configuration"}
              </div>
            </ProductHeader>

            <ProductContent className="h-full px-4">
              {renderPageComponent(setFieldValue, values, errors)}
            </ProductContent>

            <ProductFooter>
              {/* <Button
                className={cn("bg-gray-300 hover:bg-gray-400 text-black", {
                  "opacity-50 cursor-not-allowed": currentStep === 1,
                })}
                type="button"
                disabled={currentStep === 1}
                onClick={handlePrevStep}
              >
                Prev
              </Button>
              <Button
                type="submit"
                variant={"b2bStyle"}
                className={cn(" text-white w-40", {
                  " ": currentStep === 4,
                })}
              >
                {currentStep === 4 ? "save Product" : " Next"}
              </Button> */}

              <AyButton
                type="button"
                disabled={currentStep === 1}
                onClick={handlePrevStep}
                title=""
                variant="cancel"
              >
                Prev
              </AyButton>
              {/* ------ */}
              <AyButton type="submit" title="">
                {currentStep === 4 ? "save Product" : " Next"}
              </AyButton>
            </ProductFooter>
          </Form>
        )}
      </Formik>
    </ProductLayout>
  );
}
