// import Select from "react-select";
// import makeAnimated from "react-select/animated";
// import { useEffect, useMemo, useState } from "react";

// import { dispatch, useAppSelector } from "@/redux/hook";
// import { makeToastError } from "@/utils/toaster";
// import { IProducts } from "@/types/productType";
// import { getColorsRedux } from "@/redux/actions/size_color_Slice";

// const animatedComponents = makeAnimated();

// interface Color {
//   value: string;
//   label: string;
//   id?: string;
// }

// type Props = {
//   setFieldValue: any;
//   values: IProducts;
//   className?: string;
//   showError?: boolean;
//   productLocalImages: {
//     image: string;
//     colorCode: string;
//     colorName: string;
//   }[];
//   setProductLocalImages: (
//     images: {
//       image: string;
//       colorCode: string;
//       colorName: string;
//     }[]
//   ) => void;
//   setSelectedColor: (value: boolean) => void;
//   setShowColorPicker: (value: boolean) => void;
//   index: number;
// };

// const ColorVariantSelectTab = ({
//   values,
//   className,
//   productLocalImages,
//   setProductLocalImages,
//   setSelectedColor,
//   index,
// }: Props) => {
//   const [pickedColor, setPickedColor] = useState<Color | null>(null);
//   // const [colorPickerToggle, setColorPickerToggle] = useState(false);
//   // const colorPickerRef = useRef<HTMLDivElement>(null);
//   // const colorPickerRef2 = useRef<HTMLButtonElement>(null);

//   const [colorOptions, setColorOptions] = useState<
//     { code: string; name: string; _id: string }[]
//   >([]);

//   // console.log(productLocalImages);

//   const { colors } = useAppSelector((state) => state.sizeColor);

//   const selectOptions = useMemo(() => {
//     return colorOptions.map((color) => ({
//       value: color.code,
//       label: color.name,
//       id: color._id,
//     }));
//   }, [colorOptions]);

//   useEffect(() => {
//     dispatch(getColorsRedux());
//   }, []);

//   useEffect(() => {
//     if (colors && colors.length > 0) {
//       setColorOptions(
//         colors.map((color) => ({
//           code: color.colorCode,
//           name: color.colorName,
//           _id: color._id,
//         }))
//       );
//     }
//   }, [colors]);

//   const handleColorChange = (selected: Color | null) => {
//     if (!selected) return;

//     const isColorUsed = productLocalImages.some(
//       (img) => img.colorCode === selected.value
//     );

//     if (isColorUsed) {
//       setSelectedColor(true);
//       makeToastError(
//         `The color ${selected.label} is already assigned to another image.`
//       );
//       return;
//     } else {
//       setSelectedColor(false);
//       // setPickedColor(selected);
//       setPickedColor({
//         value: selected.value,
//         label: selected.label,
//         id: selected.id,
//       });
//       const updatedImages = [...productLocalImages];
//       updatedImages[index] = {
//         ...updatedImages[index],
//         colorCode: selected.value,
//         colorName: selected.label,
//       };
//       setProductLocalImages(updatedImages);
//     }
//   };

//   useEffect(() => {
//     if (
//       values?.variations?.length > 0 &&
//       colorOptions.length > 0 &&
//       productLocalImages[index] &&
//       productLocalImages[index].colorCode &&
//       productLocalImages[index].colorName
//     ) {
//       const variationColorCode = productLocalImages[index].colorCode;
//       const variationColorName = productLocalImages[index].colorName;

//       const matchedColor = colorOptions.find(
//         (opt) =>
//           opt.code === variationColorCode && opt.name === variationColorName
//       );

//       if (matchedColor) {
//         setPickedColor({
//           value: matchedColor.code,
//           label: matchedColor.name,
//           id: matchedColor._id,
//         });
//       } else {
//         setPickedColor(null); // Don't show any picked color if not matched
//       }
//     } else {
//       setPickedColor(null); // Reset if missing data
//     }
//   }, [values.variations, colorOptions, productLocalImages, index]);

//   // const handleSaveNewColor = async (newColor: Color) => {
//   //   const findSimilarColor = colors.find(
//   //     (color) => color.colorCode === newColor.value
//   //   );
//   //   if (findSimilarColor) {
//   //     makeToastError("Please apply a different color");
//   //     return;
//   //   }
//   //   try {
//   //     const { status } = await create_New_Color_Api({
//   //       colorCode: newColor.value,
//   //       colorName: newColor.label,
//   //     });
//   //     if (status === 201) {
//   //       dispatch(getColorsRedux());
//   //       setShowColorPicker(false);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   const handleClickOutside = (event: MouseEvent) => {
//   //     if (
//   //       colorPickerRef.current &&
//   //       !colorPickerRef.current.contains(event.target as Node) &&
//   //       event.target !== colorPickerRef2.current
//   //     ) {
//   //       setColorPickerToggle(false);
//   //     }
//   //   };

//   //   document.addEventListener("mousedown", handleClickOutside);
//   //   return () => {
//   //     document.removeEventListener("mousedown", handleClickOutside);
//   //   };
//   // }, []);

// const formatOptionLabel = (option: Color) => (
//   <div className="flex items-center">
//     <div
//       className="w-4 h-4 rounded-lg mr-2"
//       style={{ backgroundColor: option.value }}
//     />
//     <span>{option.label}</span>
//     {/* <button
//       className="ml-auto hover:text-red-500"
//       type="button"
//       onClick={(e) => {
//         e.stopPropagation();
//         // Optional: Add delete logic
//       }}
//     >
//       <Delete />
//     </button> */}
//   </div>
// );

//   return (
//     <div className={className}>
//       <Select
//         components={animatedComponents}
//         isMulti={false}
//         name="color"
//         options={selectOptions}
//         className="w-full text-xs"
//         placeholder="Select Color"
//         value={pickedColor}
//         onChange={(val) => handleColorChange(val as Color)}
//         closeMenuOnSelect={true}
//         formatOptionLabel={formatOptionLabel}
//       />

//       {/* <div className="relative mt-5 md:block hidden">
//         <button
//           className={`w-full h-12 bg-[#F3F3F3] rounded-lg text-textSoft border`}
//           type="button"
//           onClick={() => setColorPickerToggle(!colorPickerToggle)}
//           ref={colorPickerRef2}
//         >
//           + Add New Color
//         </button>
//         {colorPickerToggle && (
//           <div className="absolute top-0 right-0 z-50" ref={colorPickerRef}>
//             <ColorPicker
//               setShowColor={setShowColorPicker}
//               onSaveColor={handleSaveNewColor}
//               colorOptions={colorOptions}
//             />
//           </div>
//         )}
//       </div> */}
//     </div>
//   );
// };

// export default ColorVariantSelectTab;
// =====================

import { useEffect, useMemo, useState } from "react";

import { dispatch, useAppSelector } from "@/redux/hook";
import { makeToastError } from "@/utils/toaster";
import { IProducts, SelectOption } from "@/types/productType";
import {
  deleteColorsSizeRedux,
  getColorsRedux,
} from "@/redux/actions/size_color_Slice";
import SingleSelect from "@/components/myUi/SingleSelect";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  setFieldValue: any;
  values: IProducts;
  className?: string;
  showError?: boolean;
  productLocalImages: {
    image: string;
    colorCode: string;
    colorName: string;
  }[];
  setProductLocalImages: (
    images: {
      image: string;
      colorCode: string;
      colorName: string;
    }[]
  ) => void;
  setSelectedColor: (value: boolean) => void;
  setShowColorPicker: (value: boolean) => void;
  index: number;
};

const ColorVariantSelectTab = ({
  className,
  productLocalImages,
  setProductLocalImages,
  setSelectedColor,
  index,
}: Props) => {
  // const [pickedColor, setPickedColor] = useState<Color | null>(null);
  // const [colorPickerToggle, setColorPickerToggle] = useState(false);
  // const colorPickerRef = useRef<HTMLDivElement>(null);
  // const colorPickerRef2 = useRef<HTMLButtonElement>(null);

  const [pickedColor, setPickedColor] = useState<SelectOption | null>(null);

  const [colorOptions, setColorOptions] = useState<SelectOption[]>([]);

  // console.log(productLocalImages);

  const { colors } = useAppSelector((state) => state.sizeColor);

  const selectOptions = useMemo(
    () =>
      colorOptions.map((color) => ({
        _id: color._id,
        name: color.name,
        code: color.code,
      })),
    [colorOptions]
  );

  useEffect(() => {
    dispatch(getColorsRedux());
  }, []);

  useEffect(() => {
    if (colors && colors.length > 0) {
      setColorOptions(
        colors.map((color) => ({
          code: color.colorCode,
          name: color.colorName,
          _id: color._id,
        }))
      );
    }
  }, [colors]);

  useEffect(() => {
    if (
      colorOptions.length > 0 &&
      productLocalImages[index] &&
      productLocalImages[index].colorCode &&
      productLocalImages[index].colorName
    ) {
      const variationColorCode = productLocalImages[index].colorCode;
      const variationColorName = productLocalImages[index].colorName;

      const matchedColor = colorOptions.find(
        (opt) =>
          opt.code === variationColorCode && opt.name === variationColorName
      );

      if (matchedColor) {
        setPickedColor({
          code: matchedColor.code,
          name: matchedColor.name,
          _id: matchedColor._id,
        });
      } else {
        setPickedColor(null); // Don’t show if not matched
      }
    } else {
      setPickedColor(null); // Reset if missing data
    }
  }, [colorOptions, productLocalImages, index]);

  const formatOptionLabel = (option: SelectOption, { context }: any) => (
    <div className="flex items-center">
      <div
        className="w-4 h-4 rounded-lg mr-2"
        style={{ backgroundColor: option.code }}
      />
      <span>{option.name}</span>

      {context === "menu" && (
        <button
          className="ml-auto hover:text-red-500"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              deleteColorsSizeRedux({ id: option._id, value: "color" })
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
        selectedValue={pickedColor}
        // isDisabled={values.variations.length === 0}
        setSelectedValue={(_, selectedOption) => {
          setPickedColor(selectedOption);
          const isColorUsed = productLocalImages.some(
            (img) => img.colorName === selectedOption?.name
          );

          if (isColorUsed) {
            setSelectedColor(true);
            makeToastError(
              `The color ${selectedOption?.name} is already assigned to another image.`
            );
            return;
          } else {
            setSelectedColor(false);
            setPickedColor(selectedOption);
            // setPickedColor({
            //   value: selected.value,
            //   label: selected.label,
            //   id: selected.id,
            // });
            const updatedImages = [...productLocalImages];
            updatedImages[index] = {
              ...updatedImages[index],
              colorCode: selectedOption?.code ?? "",
              colorName: selectedOption?.name ?? "",
            };
            setProductLocalImages(updatedImages);
          }
        }}
      />
    </div>
  );
};

export default ColorVariantSelectTab;
