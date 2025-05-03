import MyPageTab from "@/components/myUi/MyTab";

import CreateBannerFields from "@/components/web-setups/benner_widgets/Create_Banner_Fields";
import AllBannerFields from "@/components/web-setups/benner_widgets/All_Banner_Fields";

function AdsBannerPage() {
  return (
    <div>
      <MyPageTab
        tabs={[
          {
            title: "All Ads Banner",
            url: `/web-setup?banner=ads&type=all-ads-slider`,
            value: "all-ads-slider",
            children: (
              <div>
                <AllBannerFields />
              </div>
            ),
          },
          {
            title: "Create Ads Banner",
            url: `/web-setup?banner=ads&type=cr-ads-slider`,
            value: "cr-ads-slider",
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

export default AdsBannerPage;
