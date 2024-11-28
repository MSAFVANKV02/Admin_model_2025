import { useModal } from "@/providers/context/context";
import ProductLayout, {
  ProductContent,
  ProductFooter,
  ProductHeader,
} from "./product-layout";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GeneralSection from "./GeneralSection-page";
import FilesMediaSectionPage from "./FilesMeadiaSection-page";
import PriceStockSectionPage from "./PriceStockSection-page";
import ShippingSectionPage from "./ShippingSection-page";

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
  const searchParams = new URLSearchParams(search);

  useEffect(() => {
    const currentPath = searchParams.get("q") || "general";
    setSelectedPage(currentPath);
    setCurrentStep(pageToStep[currentPath]);
  }, [searchParams, setSelectedPage]);

  //   ====== got to next step =================================
  const handleNextStep = (data: any) => {
    // setFormData((prevData) => ({ ...prevData, ...data }));
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    const nextPage: any = Object.keys(pageToStep).find(
      (key) => pageToStep[key] === nextStep
    );
    setSelectedPage(nextPage);
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
  const renderPageComponent = () => {
    switch (selectedPage || "general") {
      case "general":
        return <GeneralSection />;
      case "files-media":
        return (
          <FilesMediaSectionPage
          //   handleSave={handleSave}
          //     onNext={handleNextStep}
          //     onPrev={handlePrevStep}
          //     formData={formData}
          />
        );
      case "price-stock":
        return (
          <PriceStockSectionPage
          // onNext={handleNextStep}
          // onPrev={handlePrevStep}
          // formData={formData}
          // handleSave={handleSave}
          />
        );
      case "shipping":
        return (
          <ShippingSectionPage
          // onNext={handleNextStep}
          // onPrev={handlePrevStep}
          // formData={formData}
          // setFormData={setFormData}
          // handleSave={handleSaveComplete}
          // setCurrentStep={setCurrentStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ProductLayout>
      <ProductHeader>
        <h5 className="text-lg font-bold">Product Information</h5>
      </ProductHeader>

      <ProductContent className="h-full">
        {renderPageComponent()}
        {/* Add components for General, Price & Stock, and Shipping steps */}
      </ProductContent>

      <ProductFooter>
        <Button
          className={cn("bg-gray-300 hover:bg-gray-400 text-black", {
            "opacity-50 cursor-not-allowed": currentStep === 1,
          })}
          disabled={currentStep === 1}
          onClick={handlePrevStep}
        >
          Prev
        </Button>
        <Button
          className={cn(" text-white", {
            " ": currentStep === 4,
          })}
          //   disabled={currentStep === 4}
          onClick={handleNextStep}
        >
          {currentStep === 4 ? "save Product" : " Next"}
        </Button>
      </ProductFooter>
    </ProductLayout>
  );
}
