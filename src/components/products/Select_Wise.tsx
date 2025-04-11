import { IProducts, SelectOption } from "@/types/productType";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import AyButton from "../myUi/AyButton";
import { makeToastError } from "@/utils/toaster";
import BundleCreation from "../size/Bundle_Creation";
import SizeSelectTab from "../global/size-select";

type Props = {
  setFieldValue: (field: string, value: any) => void;
  values: IProducts;
  errors: any;
};

export default function SelectWise({ setFieldValue, values, errors }: Props) {


  const [newBundle, setBundle] = useState(false);
  const [selectedBundles] = useState([
    {
      name: "New",
      bundle: [
        { size: "S", quantity: 2 },
        { size: "m", quantity: 2 },
      ],
    },
    {
      name: "Fashion B2b",
      bundle: [
        { size: "S", quantity: 2 },
        { size: "l", quantity: 2 },
      ],
    },
  ]);

  const [selectedSizes, setSelectedSizes] = useState<SelectOption[]>([]) || [];

  const handleSizeChange = (selected: SelectOption[]) => {
    if (values.variations.length === 0) {
      makeToastError("Please select a color variant");
      return;
    }

    // Update the selected sizes
    setSelectedSizes(selected);

    // Ensure that we initialize details if it's empty and update sizes correctly
    setFieldValue(
      "variations",
      values.variations.map((variation) => {
        // Initialize details if it's empty and update sizes
        const updatedDetails = selected.map((size) => {
          const existingDetail = variation.details.find(
            (detail) => detail.size === size.name
          );

          // If the size exists, update it, otherwise create a new entry
          return {
            ...existingDetail, // Retain existing properties if size already exists
            size: size.name, // Update size (in case of new addition)
            stock: existingDetail?.stock || 0, // Retain or set default
            discount: existingDetail?.discount || 0,
            selling_price: existingDetail?.selling_price || 0,
            skuId: existingDetail?.skuId || "",
          };
        });

        // If the details array is empty, initialize it with the new size
        return {
          ...variation,
          details: updatedDetails.length
            ? updatedDetails
            : selected.map((size) => ({
                size: size.name,
                stock: 0,
                discount: 0,
                selling_price: 0,
                skuId: "",
              })),
          sample: variation.sample || false, // Sample moved outside details
        };
      })
    );
  };

  return (
    <div>
      {values.selectWise === "size" ? (
        <div className="flex justify-between md:flex-row flex-col md:items-center gap-2 w-full relative">
          <Label htmlFor="size" className="text-textGray">
            Select size
          </Label>
          <div className=" md:w-3/4">
            <div className="flex gap-3 md:flex-row flex-col md:items-center w-full">
              <SizeSelectTab 
              className="w-full"
              setFieldValue={setFieldValue}
              values={values}
              />
            
            </div>

            {<span className="text-red-500 text-xs">{errors.variations}</span>}
          </div>

          {/* add new sizes */}
        
        </div>
      ) : (
        <div className="flex justify-between items-center w-full relative">
          <Label htmlFor="size" className="text-textGray">
            Select Bundle
          </Label>
          <div className="flex w-3/4 gap-3 items-center">
            <Select
              onValueChange={(value) => {
                if (values.variations.length === 0) {
                  makeToastError("Please select a color variant");
                  return;
                }

                const selectedBundle =
                  selectedBundles.find((bundle) => bundle.name === value)
                    ?.bundle || [];

                setFieldValue(
                  "variations",
                  values.variations.map((variation) => {
                    const updatedDetails = selectedBundle.map((item) => {
                      const existingDetail = variation.details?.find(
                        (detail) => detail.size === item.size
                      );

                      return {
                        ...existingDetail,
                        size: item.size,
                        bundleQuantity: item.quantity,
                        stock: existingDetail?.stock ?? 0,
                        discount: existingDetail?.discount ?? 0,
                        selling_price: existingDetail?.selling_price ?? 0,
                        skuId: existingDetail?.skuId ?? "",
                      };
                    });

                    return {
                      ...variation,
                      // Directly update the `details` section for variations
                      details: updatedDetails,
                      sample: variation.sample ?? false, // Set the sample value outside details
                    };
                  })
                );
              }}
            >
              <SelectTrigger className="w-3/4 py-6">
                <SelectValue placeholder="Select Bundle" />
              </SelectTrigger>
              <SelectContent>
                {selectedBundles.map((bundle, index) => (
                  <SelectItem key={index} value={bundle.name}>
                    {bundle.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <AyButton
              title="Add New Bundle"
              outLineColor=""
              sx={{
                border: "1px dotted #EC922B",
                bgcolor: "#F3F3F3",
                color: "#737373",
                py: "0.6rem",
              }}
              variant="outlined"
              onClick={() => setBundle(true)}
            />
            <div className="absolute top-14 -right-0 z-50">
              <BundleCreation
                isOpen={newBundle}
                onClose={() => setBundle(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
