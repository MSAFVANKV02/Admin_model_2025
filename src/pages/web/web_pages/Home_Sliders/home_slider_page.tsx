import MyPageTab from "@/components/myUi/MyTab";

import CreateHomeSliders from "./Create_Home_Sliders";
import AllHomeSliders from "./All_Home_Sliders";
import { useLocation } from "react-router-dom";
import SelectSlider from "./select_slider";

function HomeSliderGeneratePage() {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const bannerParam = query.get("banner") || "home-slider-1";
  // const typeParam = query.get("type") || "cr-slider-1";

  const currentBanner = bannerParam.replace(/-/g, "_");

  return (
    <div>
      <MyPageTab
        tabs={[
          {
            title: "All Cover Images",
            url: `/web-setup?banner=${currentBanner.replace(
              /_/g,
              "-"
            )}&type=all-slider-1`,
            value: "all-slider-1",
            children: (
              <div>
                <SelectSlider />
                <AllHomeSliders />
              </div>
            ),
          },
          {
            title: "Create Slider Images",
            url: `/web-setup?banner=${currentBanner.replace(
              /_/g,
              "-"
            )}&type=cr-slider-1`,
            value: "cr-slider-1",
            children: (
              <div>
                <SelectSlider />
                <CreateHomeSliders />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default HomeSliderGeneratePage;
