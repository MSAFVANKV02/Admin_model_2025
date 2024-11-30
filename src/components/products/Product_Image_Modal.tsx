import CloseIcon from "@mui/icons-material/Close";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip } from "@mui/material";
import {  makeToastError } from "@/utils/toaster";
import { FileFormValues } from "@/pages/products/add-new/Page_Sections/FilesMeadiaSection-page";

const colorOptions = [
  { code: "#FF5733", name: "Red" },
  { code: "#33FF57", name: "Green" },
  { code: "#3357FF", name: "Blue" },
  // Add more color options as needed
];

type MetadataFormProps = {
    productLocalImages: {
      image: File;
      colorCode: string;
      colorName: string;
    }[];
    setProductLocalImages: (images: {
      image: File;
      colorCode: string;
      colorName: string;
    }[]) => void;
    setFieldValue:any;
    setIsOpen:(value:boolean) => void;
    setSelectedColor:(value:boolean) => void;
    values: FileFormValues;
    
  };

export const ProductImageModal = ({
    productLocalImages,
    setProductLocalImages,
    setFieldValue,
    setSelectedColor,
    values
  
  }: MetadataFormProps) => {

    console.log(productLocalImages,'productLocalImages');
    


    const handleColorChange = (
      index: number,
      colorCode: string,
      colorName: string
    ) => {
        const isColorUsed = productLocalImages.some(
            (image, i) => image.colorCode === colorCode && i !== index
          );
        
          if (isColorUsed) {
            setSelectedColor(true);
            makeToastError(`The color ${colorName} is already assigned to another image.`);
            return;
          }else{
            setSelectedColor(false);

            const updatedImages = [...productLocalImages];
            updatedImages[index] = {
              ...updatedImages[index],
              colorCode,
              colorName,
            };
            setProductLocalImages(updatedImages);
          }
        
    };

    // const handleSaveColors = () => {
    //     // Validate: Ensure all images have a selected color
    //     const isAllColorsSelected = productLocalImages.every(
    //       (image) => image.colorCode && image.colorName
    //     );
    
    //     if (isAllColorsSelected) {
    //       // Save to Formik field
    //       setFieldValue("productImages", productLocalImages);
    //       setIsOpen(false); // Close the modal
    //     } else {
    //       alert("Please select colors for all product images.");
    //     }
    //   };

    // const handleDeleteImage = (index: number) => {
    //     const updatedImages = productLocalImages.filter((_, i) => i !== index);
    //     setProductLocalImages(updatedImages);
    //   };
    const handleDeleteImage = (index: number) => {
        // Get the image being deleted
        const imageToDelete = productLocalImages[index];
      
        // Update local state
        const updatedLocalImages = productLocalImages.filter((_, i) => i !== index);
        setProductLocalImages(updatedLocalImages);
      
        // Update Formik values if the image exists in the Formik state
        setFieldValue(
            "productImages",
            values.productImages.filter(
              (product) => product.image !== imageToDelete.image
            )
          );
        // setFieldValue(
        //   "productImages",updatedLocalImages
        // );
      };
      

  return (
    <div className="flex flex-col gap-3 h-[350px] overflow-y-auto">
      {productLocalImages.map((product, index) => (
        <div key={index} className="flex justify-between">
          <img  src={URL.createObjectURL(product.image)}alt="" className="w-10 h-10" />
          <div className="w-[70%]">
           <Select
              onValueChange={(value) => {
                const selectedColor = colorOptions.find(
                  (color) => color.code === value
                );
                if (selectedColor) {
                  handleColorChange(
                    index,
                    selectedColor.code,
                    selectedColor.name
                  );
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={
                    product.colorName || "Select a color"
                  }
                />
              </SelectTrigger>
              <SelectContent className="z-[10003]">
                {colorOptions.map((color) => (
                  <SelectItem
                    key={color.code}
                    value={color.code}
                  >
                    <div
                      className="flex items-center gap-2"
                      style={{ color: color.code }}
                    >
                      <span
                        className="block w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.code }}
                      ></span>
                      {color.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Tooltip title="Delete" placement="top">
            <button
              type="button"
              className="h-5 flex justify-center items-center bg-red-500 text-white rounded-full"
              onClick={() => handleDeleteImage(index)}
            >
              <CloseIcon fontSize="small" />
            </button>
          </Tooltip>
          
        </div>
      ))}
    </div>
  );
};
