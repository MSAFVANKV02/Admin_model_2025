import { getAllProductsInAdmin } from "@/actions/products/productActions";
import MultiSelect from "@/components/myUi/MultiSelect";
import { Label } from "@/components/ui/label";
import { useQueryData } from "@/hooks/useQueryData";
import { ICouponType } from "@/types/ICouponTypes";
import { IProducts, SelectOption } from "@/types/productType";
import { ErrorMessage } from "formik";
import { useState } from "react";

type Props = {
  title: string;
  setFieldValue: any;
  values: Partial<ICouponType>;
  name: keyof Partial<ICouponType>;
  index: number;
  placeholder?:string
};

const CouponSelections = ({ title, setFieldValue, index, name,  placeholder }: Props) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectOption[]>([]);

  const {
    data: fetchedProducts,
    isFetching,
    refetch,
  } = useQueryData(
    ["all-products"],
    () =>
      getAllProductsInAdmin(
        [
          {
            key: "",
            value: "",
          },
        ],
        undefined
      ) // Wrap in an arrow function
  );
  // console.log(fetchedProducts,'fetchedProducts');

  // const { products } = useAppSelector((state) => state.products);

  const { data: product = [] } = (fetchedProducts ?? {}) as {
    status?: number;
    data?: IProducts[];
  };


  return (
    <div key={index}>
      <div className="flex justify-between lg:flex-row flex-col gap-2">
        <Label
          htmlFor="applicable_product_id"
          className="text-sm text-textGray"
        >
          {title}
        </Label>
        <MultiSelect
          placeholder={placeholder}
          className="lg:w-3/4 border-slate-600"
          fieldName="applicable_product_id"
        //   options={productOptions}
          selectedValue={selectedProducts} // ensure it's an array
          setSelectedValues={(fieldName, selectedOptions) => {
            setFieldValue(
              fieldName,
              selectedOptions.map((option: SelectOption) => option?._id)
            );
            setSelectedProducts(selectedOptions);
          }}
        />

        <ErrorMessage
          name={name}
          component="span"
          className="text-red-500 text-xs"
        />
      </div>
    </div>
  );
};

export default CouponSelections;
