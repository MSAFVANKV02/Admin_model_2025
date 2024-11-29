import * as Yup from "yup";

// Define validation schemas for each section
export const GeneralSchema = Yup.object({
  productName: Yup.string()
    .min(1, "Name is required")
    .required("Name is required"),
  mrp: Yup.number()
    .positive("MRP must be greater than 0")
    .required("MRP is required"),
  sku: Yup.string().min(1, "SKU is required").required("SKU is required"),
  barcode: Yup.string().optional(),
  brand: Yup.string().optional(),
  keywords: Yup.string().optional(),
  minQty: Yup.number()
    .min(1, "Minimum Qty must be at least 1")
    .required("Minimum Qty is required"),
  weight: Yup.number().optional(),
  dimensions: Yup.string().optional(),
  taxSlab: Yup.string().optional(),
  status: Yup.boolean().default(false),
  todaysDeal: Yup.boolean().default(false),
  description: Yup.string().optional(),
});
// Combined schema
