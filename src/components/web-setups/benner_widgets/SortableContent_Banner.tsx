import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
// import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

import {
  delete_Cover_Image_Api,
  enable_Banner_Image_Api,
  reArrange_Cover_Image_Api,
} from "@/services/banners/route";
import Loader from "@/components/global/loader";
import MyDeleteIcon from "@/components/icons/My_DeleteIcon";
import My_Icon from "@/components/icons/My_Icon";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "@/components/global/image";
import { reArrange_Todays_Deals_Api } from "@/services/products/route";
import { makeToast } from "@/utils/toaster";


interface Image {
  id: string;
  src: string;
  alt?: string;
  idx?: number;
  isEnable: boolean;
  refetch: () => void;
}

interface ImageSliderProps {
  images: Image[];
  isTodaysDeal?: boolean;
  refetch: () => void;
}

// Sortable Image Component
// const SortableImage: React.FC<Image> = ({ id, src, alt, idx, }) => {
const SortableImage: React.FC<Image> = ({
  id,
  src,
  alt,
  idx,
  refetch,
  isEnable,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    width: "100%",
    height: "100%",
  };

  const handleDeleteImage = async () => {
    try {
      const response = await delete_Cover_Image_Api(id);
      if (response.status === 200) {
        makeToast(response.data.message);
        refetch();
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      // makeToast("Failed to delete image");
    }
  };

  const handleEnableImage = async (isEnable: boolean) => {
    try {
      const response = await enable_Banner_Image_Api(id, isEnable);
      if (response.status === 200) {
        makeToast(response.data.message);
        refetch();
      }
    } catch (error) {
      console.error("Error enabling image:", error);
      // makeToast("Failed to delete image");
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="aspect-square relative group"
    >
      <Image
        src={src}
        alt={alt || "Image"}
        className="w-full h-full object-cover "
      />
      <span className="absolute top-2 right-0 text-xs bg-bg py-1 px-3 text-white">
        {" "}
        {idx ?? 0}
      </span>
      <div className="absolute group-hover:flex hidden flex-col items-center top-2 left-0 shadow-md text-xs bg-white  text-textMain">
        {" "}
        <MyDeleteIcon color="var(--textMain)" onClick={handleDeleteImage} />
        {isEnable ? (
          <My_Icon
            icon="ion:eye"
            color="var(--textMain)"
            onClick={() => {
              handleEnableImage(false);
            }}
          />
        ) : (
          <My_Icon
            icon="system-uicons:eye-closed"
            color="var(--textMain)"
            onClick={() => {
              handleEnableImage(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

const ImageSliderSortable: React.FC<ImageSliderProps> = ({
  images,
  refetch,
  isTodaysDeal,
}) => {
  const [imagesArray, setImagesArray] = useState<Image[]>(images);
  // const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [imgDragged, setImgDragged] = useState<boolean>(false);

  // const slidesToShow = 5; // Always show 5 images per row

  useEffect(() => {
    setImagesArray(images);
  }, [images]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  //   const handleDragEnd = (event: DragEndEvent) => {
  //     const { active, over } = event;
  //     if (active.id !== over?.id) {
  //       setImagesArray((items) => {
  //         const oldIndex = items.findIndex((item) => item.id === active.id);
  //         const newIndex = items.findIndex((item) => item.id === over?.id);
  //         if (oldIndex === -1 || newIndex === -1) return items;

  //         const newArray = [...items];
  //         const [removed] = newArray.splice(oldIndex, 1);
  //         newArray.splice(newIndex, 0, removed);
  //         return newArray;
  //       });
  //     }
  //   };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setImgDragged(true);

    setImagesArray((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return items;

      const newArray = [...items];
      const [movedItem] = newArray.splice(oldIndex, 1);
      newArray.splice(newIndex, 0, movedItem);

      // Update indexes
      return newArray.map((item, index) => ({ ...item, idx: index + 1 })); // 1-based index
    });
  };

  const handleSubmit = async () => {
    const updatedCategories = imagesArray.map((item) => ({
      _id: item.id,
      priority: item.idx ?? 0, // Use updated index
    }));
    const updatedTodaysDeals = imagesArray.map((item) => ({
      productId: item.id,
      todaysIndex: item.idx ?? 0, // Use updated index
    }));
    try {
      setLoading(true);
      //   await axios.put(
      //     "http://localhost:5000/build/banner/reorder-category-cover",
      //     { updatedCategories },{withCredentials:true}
      //   );

      const route = isTodaysDeal
        ? reArrange_Todays_Deals_Api(updatedTodaysDeals)
        : reArrange_Cover_Image_Api(updatedCategories);

      const response = await route;
      if (response.status === 200) {
        makeToast(response.data.message);
        setImgDragged(false);
      }
      //   alert("Reordering saved successfully!");
    } catch (error) {
      console.error("Error saving reorder:", error);
      setImgDragged(false);
      //   alert("Failed to save reorder!");
    } finally {
      setLoading(false);
      setImgDragged(false);
    }
  };

  // const next = () => {
  //   if (currentIndex < imagesArray.length - slidesToShow) {
  //     setCurrentIndex((prev) => prev + 1);
  //   }
  // };

  // const prev = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex((prev) => prev - 1);
  //   }
  // };

  // const visibleImages = imagesArray.slice(
  //   currentIndex,
  //   currentIndex + slidesToShow
  // );

  return (
    <>
      <div className="flex justify-center flex-col gap-1">
        <div className="flex items-center">
          <span>
            <Icon icon="lets-icons:info-alt-duotone" fontSize={27} />
          </span>
          <span className="text-xs text-gray-400">
            For re-arrange order drag the image to next position
          </span>
        </div>
        {/* 2nd note */}
        <div className="flex items-center">
          <span>
            <Icon icon="lets-icons:info-alt-duotone" fontSize={27} />
          </span>
          <span className="text-xs text-gray-400">
            Do not forgot to save after change positions.
          </span>
        </div>
        {/* 3rd note */}
        <div className="flex items-center">
          <span>
            <Icon icon="lets-icons:info-alt-duotone" fontSize={27} />
          </span>
          <span className="text-xs text-gray-400">
            Eye icon will help you to enable disable the image on user side.
          </span>
        </div>
      </div>
      {/* ====== */}

      <div className="relative">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          // modifiers={[restrictToHorizontalAxis]}
        >
          <div className="grid grid-cols-5 gap-1">
            <SortableContext
              items={imagesArray.map((img) => img.id)}
              strategy={horizontalListSortingStrategy}
            >
              {/* {visibleImages.map((image,idx) => (
              <SortableImage
                key={image.id}
                id={image.id}
                src={image.src}
                alt={image.alt}
                idx={idx}
              />
            ))} */}
              {imagesArray.map((image) => (
                <SortableImage
                  isEnable={image.isEnable}
                  refetch={refetch}
                  key={image.id}
                  id={image.id}
                  src={image.src}
                  alt={image.alt}
                  idx={imagesArray.findIndex((img) => img.id === image.id) + 1} // Get correct index from full array
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>

        {/* Pagination Controls */}
        {/* <div className="mt-4 absolute right-0 flex justify-center space-x-4">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="h-10 w-10 flex justify-center items-center bg-black text-white rounded-full disabled:bg-gray-300"
          >
            <BiLeftArrow />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= imagesArray.length - slidesToShow}
            className="h-10 w-10 flex justify-center items-center bg-black text-white rounded-full disabled:bg-gray-300"
          >
            <BiRightArrow />
          </button>
        </div> */}

        {imgDragged && (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 bg-bg text-sm shadow-lg text-white px-4 py-2 rounded-sm disabled:bg-gray-400"
          >
            <Loader state={loading}>Re Arrange</Loader>
            {/* {loading ? "Saving..." : "Save Order"} */}
          </button>
        )}
      </div>
    </>
  );
};

export default ImageSliderSortable;
