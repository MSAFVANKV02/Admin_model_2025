import MyPageTab from "@/components/myUi/MyTab";

import CreateBannerFields from "@/components/web-setups/benner_widgets/Create_Banner_Fields";
import AllBannerFields from "@/components/web-setups/benner_widgets/All_Banner_Fields";

function FlashDealBannerPage() {
  return (
    <div>
      <MyPageTab
        tabs={[
          {
            title: "All Flash Banner",
            url: `/web-setup?banner=flash_banners&type=all-flash-slider`,
            value: "all-flash-slider",
            children: (
              <div>
                <AllBannerFields />
              </div>
            ),
          },
          {
            title: "Create Flash Banner",
            url: `/web-setup?banner=flash_banners&type=cr-flash-slider`,
            value: "cr-flash-slider",
            children: (
              <div>
                {/* <CreateKycSliders /> */}
                <CreateBannerFields />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default FlashDealBannerPage;
