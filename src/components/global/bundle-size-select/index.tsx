// import { useEffect, useMemo, useState } from "react";

// import { dispatch, useAppSelector } from "@/redux/hook";

// import { IProducts, SelectOption } from "@/types/productType";
// import AyButton from "@/components/myUi/AyButton";
// import MultiSelect from "@/components/myUi/MultiSelect";
// import { getBundleSizesRedux } from "@/redux/actions/size_color_Slice";
// import { IBundleSize } from "@/types/sizeType";
// import BundleCreation from "@/components/size/Bundle_Creation";

// // const animatedComponents = makeAnimated();

// type Props = {
//   setFieldValue: any;
//   values: IProducts;
//   className?: string;
//   showError?: boolean;
// };

// const BundleSizeSelect = ({ values, className, setFieldValue }: Props) => {
//   const [selectedSizes, setSelectedSizes] = useState<SelectOption[]>([]) || [];

//   const [bundleOptions, setSizeOptions] = useState<
//     { name: string; _id: string }[]
//   >([]);

//   // console.log(productLocalImages);

//   const { bundles } = useAppSelector((state) => state.sizeColor);
//   const [newSize, setNewSize] = useState(false);
//   //   console.log(bundles, "bundles");

//   const selectOptions = useMemo(() => {
//     return bundleOptions.map((size) => ({
//       _id: size._id,
//       name: size.name,
//     }));
//   }, [bundleOptions]);

//   useEffect(() => {
//     dispatch(getBundleSizesRedux());
//   }, []);

//   useEffect(() => {
//     if (bundles && bundles.length > 0) {
//       setSizeOptions(
//         bundles.map((size) => ({
//           name: size.name,
//           _id: size._id,
//         }))
//       );
//     }
//   }, [bundles]);

//   return (
//     <div className={className}>
//       <MultiSelect
//         options={selectOptions}
//         className="lg:w-3/4 border-slate-600"
//         fieldName={"variations"}
//         selectedValue={selectedSizes}
//         isDisabled={values.variations.length === 0}
//         setSelectedValues={(_, selectedOptions) => {
//           const selectedArray = Array.isArray(selectedOptions)
//             ? selectedOptions
//             : [];

//           setSelectedSizes(selectedArray);

//           const allSelectedBundles = selectedArray
//             .map((selected) => bundles.find((b) => b._id === selected._id))
//             .filter((b): b is IBundleSize => !!b); // type guard to filter non-null

//           setFieldValue(
//             "variations",
//             values.variations.map((variation) => {
//               // flatten all selected bundles into one array of bundle items
//               const updatedDetails = allSelectedBundles
//                 .flatMap((b) => b.bundle)
//                 .map((item) => {
//                   const existingDetail = variation.details?.find(
//                     (detail) => detail.size === item.size
//                   );

//                   return {
//                     ...existingDetail,
//                     size: item.size,
//                     bundleQuantity: item.quantity,
//                     stock: existingDetail?.stock ?? 0,
//                     discount: existingDetail?.discount ?? 0,
//                     selling_price: existingDetail?.selling_price ?? 0,
//                     skuId: existingDetail?.skuId ?? "",
//                   };
//                 });

//               return {
//                 ...variation,
//                 details: updatedDetails,
//                 sample: variation.sample ?? false,
//               };
//             })
//           );
//         }}
//       />

//       <div className="relative mt-5 md:block flex">
//         <AyButton
//           title="Add New Size"
//           sx={{
//             border: "1px dotted #EC922B",
//             bgcolor: "#F3F3F3",
//             color: "#737373",
//             py: "0.6rem",
//             width: "100%",
//           }}
//           outLineColor=""
//           variant="outlined"
//           onClick={() => setNewSize(true)}
//         />
//         <div className="absolute top-14 -right-0 z-50">
//           {/* <AddNewSize isOpen={newSize} onClose={() => setNewSize(false)} /> */}
//           <BundleCreation isOpen={newSize} onClose={() => setNewSize(false)} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BundleSizeSelect;
// ========== multi select above ============ //
import { useEffect, useMemo, useState } from "react";
import { dispatch, useAppSelector } from "@/redux/hook";
import { IProducts, SelectOption } from "@/types/productType";
import AyButton from "@/components/myUi/AyButton";
import {
  deleteColorsSizeRedux,
  getBundleSizesRedux,
} from "@/redux/actions/size_color_Slice";
import BundleCreation from "@/components/size/Bundle_Creation";
import SingleSelect from "@/components/myUi/SingleSelect";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  setFieldValue: any;
  values: IProducts;
  className?: string;
  showError?: boolean;
};

const BundleSizeSelect = ({ values, className, setFieldValue }: Props) => {
  const [selectedSize, setSelectedSize] = useState<SelectOption | null>(null);
  const [bundleOptions, setSizeOptions] = useState<SelectOption[]>([]);
  const [newSize, setNewSize] = useState(false);

  const { bundles } = useAppSelector((state) => state.sizeColor);

  const selectOptions = useMemo(
    () =>
      bundleOptions.map((size) => ({
        _id: size._id,
        name: size.name,
      })),
    [bundleOptions]
  );

  useEffect(() => {
    dispatch(getBundleSizesRedux());
  }, []);

  useEffect(() => {
    if (bundles && bundles.length > 0) {
      setSizeOptions(
        bundles.map((size) => ({
          name: size.name,
          _id: size._id,
        }))
      );
    }
  }, [bundles]);

  const formatOptionLabel = (option: SelectOption, { context }: any) => (
    <div className="flex items-center">
      <span>{option.name}</span>

      {context === "menu" && (
        <button
          className="ml-auto hover:text-red-500"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              deleteColorsSizeRedux({ id: option._id, value: "bundle" })
            );
            // Optional: Add delete logic
          }}
        >
          <Icon icon="mdi:delete" />
        </button>
      )}
    </div>
  );

  return (
    <div className={className}>
      <SingleSelect
        formatOptionLabel={formatOptionLabel}
        options={selectOptions}
        className="lg:w-3/4 border-slate-600"
        fieldName={"variations"}
        selectedValue={selectedSize}
        isDisabled={values.variations.length === 0}
        setSelectedValue={(_, selectedOption) => {
          setSelectedSize(selectedOption);

          const selectedBundle = bundles.find(
            (b) => b._id === selectedOption?._id
          );

          if (!selectedBundle) return;

          setFieldValue(
            "variations",
            values.variations.map((variation) => {
              const updatedDetails = selectedBundle.bundle.map((item) => {
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
                details: updatedDetails,
                sample: variation.sample ?? false,
              };
            })
          );
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
          <BundleCreation isOpen={newSize} onClose={() => setNewSize(false)} />
        </div>
      </div>
    </div>
  );
};

export default BundleSizeSelect;
