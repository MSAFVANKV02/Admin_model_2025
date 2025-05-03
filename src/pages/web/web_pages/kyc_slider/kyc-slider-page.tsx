import MyPageTab from "@/components/myUi/MyTab";

import CreateBannerFields from "@/components/web-setups/benner_widgets/Create_Banner_Fields";
import AllBannerFields from "@/components/web-setups/benner_widgets/All_Banner_Fields";

function KycSliderPage() {
  return (
    <div>
      <MyPageTab
        tabs={[
          {
            title: "All Kyc Banner",
            url: `/web-setup?banner=kyc_slider&type=all-kyc-slider`,
            value: "all-kyc-slider",
            children: (
              <div>
                <AllBannerFields />
              </div>
            ),
          },
          {
            title: "Create Kyc Banner",
            url: `/web-setup?banner=kyc_slider&type=cr-kyc-slider`,
            value: "cr-kyc-slider",
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

export default KycSliderPage;
