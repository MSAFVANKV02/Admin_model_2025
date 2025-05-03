import { getAllAddedCoverImages } from "@/actions/banners/bannersAction";
import { useQueryData } from "@/hooks/useQueryData";
import {  IAdsBannerTypes, IBannerImageTypes } from "@/types/ads.bannerTypes";
import ImageSlider from "../SortableContent";
import { useSearchParams } from "react-router-dom";


function AllHomeSliders() {

  const [searchParams] = useSearchParams()

  const bannerParam = searchParams.get("banner") ?? "home_slider_1";
  const newBanner = bannerParam.replace(/-/g, "_") as IAdsBannerTypes;




  const {
    data: fetchedCoverImages,
    isFetching,
    refetch,
  } = useQueryData(
    [newBanner||"home_slider_1"],
    () => getAllAddedCoverImages(newBanner) // Wrap in an arrow function
  );

  // console.log(fetchedCoverImages);

  const { data: product = [] } = (fetchedCoverImages ?? {}) as {
    status?: number;
    data?: IBannerImageTypes[];
  };

  const images = product.map((item) => ({
    id: item._id ?? "",
    src: item.banner,
    alt: `Banner ${item._id ?? ""}`,
    isEnable: item.isEnable,
    refetch,
  }));

  if( isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-3 justify-center  ">
     
      {product.length > 0 ? (
        <ImageSlider images={images} refetch={refetch} />
      ) : (
        <div>
          <div className="text-center text-gray-500">No cover images found.</div>
        </div>
      )}
    </div>
  );
}

export default AllHomeSliders;
