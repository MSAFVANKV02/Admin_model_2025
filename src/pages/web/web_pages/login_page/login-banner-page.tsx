import MyPageTab from "@/components/myUi/MyTab";

import CreateBannerFields from "@/components/web-setups/benner_widgets/Create_Banner_Fields";
import AllBannerFields from "@/components/web-setups/benner_widgets/All_Banner_Fields";

function LoginBannerPage() {
  return (
    <div>
      <MyPageTab
        tabs={[
          {
            title: "All Login Banner",
            url: `/web-setup?banner=login_page&type=all-login-slider`,
            value: "all-login-slider",
            children: (
              <div>
                <AllBannerFields />
              </div>
            ),
          },
          {
            title: "Create Login Banner",
            url: `/web-setup?banner=login_page&type=cr-login-slider`,
            value: "cr-login-slider",
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

export default LoginBannerPage;
