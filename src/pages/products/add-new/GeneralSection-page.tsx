import { Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Box } from "@mui/material";

// Define the type for form values
export interface GeneralFormValues {
  productName: string;
  mrp: number;
  sku: string;
  barcode?: string;
  brand?: string;
  keywords?: string;
  minQty: number;
  weight?: number;
  dimensions?: string;
  taxSlab?: string;
  status: boolean;
  todaysDeal: boolean;
  description?: string;
}


//   ==== formik =========================
type Props = {
  setFieldValue: any;
  values: GeneralFormValues;
};

export default function GeneralSectionPage({ values }: Props) {


  return (
    <Box
    display="flex"
    gap="13px"
    >
     <div className="w-3/4 flex flex-col gap-3">
     <div className="flex justify-between ">
        <Label htmlFor="productName">Product Name</Label>
        <Field
          id="productName"
          name="productName"
          placeholder="Enter Product Name"
          className="md:w-3/4"
          as={Input}
          value={values.productName} // Bind field value to Formik
        />
        <ErrorMessage
          name="productName"
          component="span"
          className="text-red-500"
        />
      </div>

      <div className="flex justify-between">
        <Label htmlFor="mrp">MRP</Label>
        <Field
          id="mrp"
          name="mrp"
          placeholder="Enter MRP"
          type="number"
          className="md:w-3/4"
          as={Input}
          value={values.mrp}
        />
        <ErrorMessage name="mrp" component="span" className="text-red-500" />
      </div>

      <div className="flex justify-between">
        <Label htmlFor="sku">SKU</Label>
        <Field
          id="sku"
          name="sku"
          placeholder="Enter SKU"
          className="md:w-3/4"
          as={Input}
          value={values.sku}
        />
        <ErrorMessage name="sku" component="span" className="text-red-500" />
      </div>

      <div className="flex justify-between">
        <Label htmlFor="barcode">Barcode</Label>
        <Field
          id="barcode"
          name="barcode"
          placeholder="Enter Barcode"
          className="md:w-3/4"
          as={Input}
          value={values.barcode}
        />
        <ErrorMessage
          name="barcode"
          component="span"
          className="text-red-500"
        />
      </div>
     </div>
     <div className="flex-grow">
      Category 
     </div>
    </Box>
  );
}
