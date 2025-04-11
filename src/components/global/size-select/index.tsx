import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useMemo, useState } from "react";

import { dispatch, useAppSelector } from "@/redux/hook";
import { getSizesRedux } from "@/redux/actions/product_Slice";
import { makeToastError } from "@/utils/toaster";
import { IProducts, SelectOption } from "@/types/productType";
import AyButton from "@/components/myUi/AyButton";
import AddNewSize from "@/components/size/Add_New_Size";
import MultiSelect from "@/components/myUi/MultiSelect";

const animatedComponents = makeAnimated();

type Props = {
  setFieldValue: any;
  values: IProducts;
  className?: string;
  showError?: boolean;
};

const SizeSelectTab = ({ values, className, setFieldValue }: Props) => {
  const [selectedSizes, setSelectedSizes] = useState<SelectOption[]>([]) || [];

  const [colorOptions, setSizeOptions] = useState<
    { name: string; _id: string }[]
  >([]);

  // console.log(productLocalImages);

  const { sizes } = useAppSelector((state) => state.products);
  const [newSize, setNewSize] = useState(false);
  console.log(sizes);

  const selectOptions = useMemo(() => {
    return colorOptions.map((size) => ({
      _id: size._id,
      name: size.name,
    }));
  }, [colorOptions]);

  useEffect(() => {
    dispatch(getSizesRedux());
  }, []);

  useEffect(() => {
    if (sizes && sizes.length > 0) {
      setSizeOptions(
        sizes.map((size) => ({
          name: size.name,
          _id: size._id,
        }))
      );
    }
  }, [sizes]);

  const handleSizeChange = (selected: SelectOption[] | null) => {
    if (!selected) return;

    // Fix: Use references from `selectOptions`
    const updatedSelected = selected.map(
      (sel) => selectOptions.find((opt) => opt.label === sel.label) || sel
    );

    setSelectedSizes(updatedSelected);

    setFieldValue(
      "variations",
      values.variations.map((variation) => {
        const updatedDetails = updatedSelected.map((size) => {
          const existingDetail = variation.details.find(
            (detail) => detail.size === size.label
          );

          return {
            ...existingDetail,
            size: size.label,
            stock: existingDetail?.stock || 0,
            discount: existingDetail?.discount || 0,
            selling_price: existingDetail?.selling_price || 0,
            skuId: existingDetail?.skuId || "",
          };
        });

        return {
          ...variation,
          details: updatedDetails,
          sample: variation.sample || false,
        };
      })
    );
  };

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       colorPickerRef.current &&
  //       !colorPickerRef.current.contains(event.target as Node) &&
  //       event.target !== colorPickerRef2.current
  //     ) {
  //       setColorPickerToggle(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const formatOptionLabel = (option: SelectOption) => (
    <div className="flex items-center">
      <span>{option.label}</span>
    </div>
  );

  return (
    <div className={className}>
      {/* <Select
        components={animatedComponents}
        isMulti // Allow multiple selections
        name="size"
        options={selectOptions}
        className="w-full text-xs"
        placeholder="Select Sizes"
        value={selectedSizes}
        onChange={(val) => handleSizeChange(val as SelectOption[])} // handle array
        closeMenuOnSelect={false} // don't close on each select
        formatOptionLabel={formatOptionLabel}
      /> */}
      <MultiSelect
        options={selectOptions}
        // placeholder={placeholder}
        className="lg:w-3/4 border-slate-600"
        fieldName={"variations"}
        selectedValue={selectedSizes}
        setSelectedValues={(_, selectedOptions) => {
          // console.log(selectedOptions);

          const selectedArray = Array.isArray(selectedOptions)
            ? selectedOptions
            : [];

          setSelectedSizes(selectedArray);

          setFieldValue(
            "variations",
            values.variations.map((variation) => {
              const updatedDetails = selectedArray.map((size) => {
                const existingDetail = variation.details.find(
                  (detail) => detail.size === size.name
                );

                return {
                  ...existingDetail,
                  size: size.name,
                  stock: existingDetail?.stock || 0,
                  discount: existingDetail?.discount || 0,
                  selling_price: existingDetail?.selling_price || 0,
                  skuId: existingDetail?.skuId || "",
                };
              });

              return {
                ...variation,
                details: updatedDetails,
                sample: variation.sample || false,
              };
            })
          );
          // setSelectedProducts(selectedArray);
        }}
      />

      <div className="relative mt-5 md:block flex">
        <AyButton
          title="Add New Size"
          sx={{
            border: "1px dotted #EC922B",
            bgcolor: "#F3F3F3",
            color: "#737373",
            py: "0.6rem",
            width: "100%",
          }}
          outLineColor=""
          variant="outlined"
          onClick={() => setNewSize(true)}
        />
        <div className="absolute top-14 -right-0 z-50">
          <AddNewSize isOpen={newSize} onClose={() => setNewSize(false)} />
        </div>
      </div>
    </div>
  );
};

export default SizeSelectTab;
