import MyPageTab from "@/components/myUi/MyTab";

import CreateHomeSliders from "./Create_Home_Sliders";
import AllHomeSliders from "./All_Home_Sliders";
import { useLocation } from "react-router-dom";
import SelectSlider from "./select_slider";

function HomeSliderGeneratePage() {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const bannerParam = query.get("banner") || "home_slider_1";
  // const typeParam = query.get("type") || "cr-slider-1";

  const currentBanner = bannerParam.replace(/-/g, "_");

  return (
    <div>
      
      <MyPageTab
        tabs={[
          {
            title: "All Cover Images",
            // url: `/web-setup?banner=${currentBanner.replace(
            //   /_/g,
            //   "-"
            // )}&type=all-home-slider`,
            url: `/web-setup?banner=${currentBanner}&type=all-home-slider`,
            value: "all-home-slider",
            children: (
              <div>
                <SelectSlider />
                <AllHomeSliders />
              </div>
            ),
          },
          {
            title: "Create Slider Images",
            url: `/web-setup?banner=${currentBanner}&type=cr-home-slider`,
            value: "cr-home-slider",
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
