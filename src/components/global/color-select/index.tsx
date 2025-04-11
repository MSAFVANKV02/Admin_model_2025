import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useMemo,  useState } from "react";

import { dispatch, useAppSelector } from "@/redux/hook";
import { getColorsRedux } from "@/redux/actions/product_Slice";
import { makeToastError } from "@/utils/toaster";
import { IProducts } from "@/types/productType";


const animatedComponents = makeAnimated();

interface Color {
  value: string;
  label: string;
  id?: string;
}

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
  index:number
};

const ColorVariantSelectTab = ({
 
  values,
  className,
  productLocalImages,
  setProductLocalImages,
  setSelectedColor,
  index
}: Props) => {
  const [pickedColor, setPickedColor] = useState<Color | null>(null);
  // const [colorPickerToggle, setColorPickerToggle] = useState(false);
  // const colorPickerRef = useRef<HTMLDivElement>(null);
  // const colorPickerRef2 = useRef<HTMLButtonElement>(null);

  const [colorOptions, setColorOptions] = useState<
    { code: string; name: string; _id: string }[]
  >([]);

  // console.log(productLocalImages);
  

  const { colors } = useAppSelector((state) => state.products);

  const selectOptions = useMemo(() => {
    return colorOptions.map((color) => ({
      value: color.code,
      label: color.name,
      id: color._id,
    }));
  }, [colorOptions]);

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

  const handleColorChange = (selected: Color | null) => {
    if (!selected) return;

    const isColorUsed = productLocalImages.some(
      (img) => img.colorCode === selected.value
    );

    if (isColorUsed) {
      setSelectedColor(true);
      makeToastError(
        `The color ${selected.label} is already assigned to another image.`
      );
      return;
    } else {
      setSelectedColor(false);
      setPickedColor(selected);
      const updatedImages = [...productLocalImages];
      updatedImages[index] = {
        ...updatedImages[index],
        colorCode:selected.value,
        colorName:selected.label,
      };
      setProductLocalImages(updatedImages);
    }

    // if (isColorUsed) {
    //   makeToastError(`The color ${selected.label} is already used.`);
    //   // setSelectedColor(true);
    //   return;
    // }
    

    // setPickedColor(selected);

    // const updatedImages = [...productLocalImages];
    // if (updatedImages[0]) {
    //   updatedImages[0] = {
    //     ...updatedImages[0],
    //     colorCode: selected.value,
    //     colorName: selected.label,
    //   };
    // }

    // setSelectedColor(false);
    // setProductLocalImages(updatedImages);
    // setFieldValue("productImages", updatedImages);
  };

  // useEffect(() => {
  //   if (values?.variations?.length && colorOptions.length > 0) {
  //     const variationColorCode = values.variations[0]?.colorCode;
  //     const variationColorName = values.variations[0]?.colorName;
  
  //     const matchedColor = colorOptions.find(
  //       (opt) =>
  //         opt.code === variationColorCode && opt.name === variationColorName
  //     );
  
  //     if (matchedColor) {
  //       setPickedColor({
  //         value: matchedColor.code,
  //         label: matchedColor.name,
  //         id: matchedColor._id,
  //       });
  //     }
  //   }
  // }, [values.variations, colorOptions]);
  useEffect(() => {
    if (
      values?.variations?.length > 0 &&
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
          value: matchedColor.code,
          label: matchedColor.name,
          id: matchedColor._id,
        });
      } else {
        setPickedColor(null); // Don't show any picked color if not matched
      }
    } else {
      setPickedColor(null); // Reset if missing data
    }
  }, [values.variations, colorOptions, productLocalImages, index]);
  

  // const handleSaveNewColor = async (newColor: Color) => {
  //   const findSimilarColor = colors.find(
  //     (color) => color.colorCode === newColor.value
  //   );
  //   if (findSimilarColor) {
  //     makeToastError("Please apply a different color");
  //     return;
  //   }
  //   try {
  //     const { status } = await create_New_Color_Api({
  //       colorCode: newColor.value,
  //       colorName: newColor.label,
  //     });
  //     if (status === 201) {
  //       dispatch(getColorsRedux());
  //       setShowColorPicker(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  const formatOptionLabel = (option: Color) => (
    <div className="flex items-center">
      <div
        className="w-4 h-4 rounded-lg mr-2"
        style={{ backgroundColor: option.value }}
      />
      <span>{option.label}</span>
      {/* <button
        className="ml-auto hover:text-red-500"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          // Optional: Add delete logic
        }}
      >
        <Delete />
      </button> */}
    </div>
  );

  return (
    <div className={className}>
      <Select
        components={animatedComponents}
        isMulti={false}
        name="color"
        options={selectOptions}
        className="w-full text-xs"
        placeholder="Select Color"
        value={pickedColor}
        onChange={(val) => handleColorChange(val as Color)}
        closeMenuOnSelect={true}
        formatOptionLabel={formatOptionLabel}
      />

      {/* <div className="relative mt-5 md:block hidden">
        <button
          className={`w-full h-12 bg-[#F3F3F3] rounded-lg text-textSoft border`}
          type="button"
          onClick={() => setColorPickerToggle(!colorPickerToggle)}
          ref={colorPickerRef2}
        >
          + Add New Color
        </button>
        {colorPickerToggle && (
          <div className="absolute top-0 right-0 z-50" ref={colorPickerRef}>
            <ColorPicker
              setShowColor={setShowColorPicker}
              onSaveColor={handleSaveNewColor}
              colorOptions={colorOptions}
            />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default ColorVariantSelectTab;
