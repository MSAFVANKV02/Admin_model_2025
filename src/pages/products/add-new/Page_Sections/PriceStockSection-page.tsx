import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IProducts } from "@/types/productType";
import { ErrorMessage, Field } from "formik";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PricePerPieces from "@/components/products/Price_Per_Pieces";

type Props = {
  setFieldValue: any;
  values: IProducts;
  errors: any;
};

export default function PriceStockSectionPage({
  values,
  setFieldValue,
}: Props) {
  return (
    <div className="f">
      <div
        className="md:w-1/2 flex
     flex-col gap-4"
      >
        {/* ===== basePrice ===== */}
        <FormFieldGenal
          value={values.basePrice}
          title="Base Price"
          id="basePrice"
          name="basePrice"
          placeholder="Enter Price"
          fieldAs={Input}
        />
        {/* ===== samplePrice ===== */}
        <FormFieldGenal
          value={values.samplePrice}
          title="Sample Price"
          id="samplePrice"
          name="samplePrice"
          placeholder="Enter Sample Price"
          fieldAs={Input}
        />
        {/* ===== discount ===== */}
        <FormFieldGenal
          value={values.discount}
          title="Discount (% / flat)"
          id="discount"
          name="discount"
          placeholder="Enter Discount"
          fieldAs={Input}
        />
        {/* ===== discount type ===== */}
        <div className="flex justify-between items-center">
          <Label className="text-sm text-textGray">Discount Type</Label>
          <Select
            onValueChange={(value) => {
              setFieldValue("discountType", value);
            }}
          >
            <SelectTrigger className="md:w-3/4 p-6">
              <SelectValue placeholder="Discount Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flat">Flat</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* === */}
          {/* ===== Price per Pieces  =====
          ================================= */}
          <PricePerPieces
          pricePerPieces={values.pricePerPieces}
          setFieldValue={setFieldValue}
        />
      </div>
    </div>
  );
}

//  =================================================================

type FormFieldGenalProps = {
  // children: React.ReactNode;
  className?: string;
  value: string | number | boolean | undefined;
  title: string; // Label for the field
  id: string;
  name: string;
  placeholder?: string;
  fieldAs?: React.ElementType;
  fieldClassName?: string;
  type?: string;
};
export function FormFieldGenal({
  className,
  value,
  title,
  id,
  name,
  placeholder,
  fieldAs,
  fieldClassName,
  type = "text", // default type is text
}: FormFieldGenalProps) {
  return (
    <div className={cn("flex md:flex-row flex-col md:items-center gap-3 justify-between", className)}>
      <Label htmlFor={name} className="text-textGray">
        {title}
      </Label>
      <div className="flex flex-col md:w-3/4 gap-2">
        <Field
          id={id}
          name={name}
          placeholder={placeholder}
          className={cn(` p-6`, fieldClassName)}
          type={type}
          as={fieldAs}
          value={value} // Bind field value to Formik
        />
        <ErrorMessage name={name} component="span" className="text-red-500" />
      </div>
    </div>
  );
}
