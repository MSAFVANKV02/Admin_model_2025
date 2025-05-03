import MyBackBtn from "@/components/myUi/myBackBtn";
import { useWindowWidth } from "@react-hook/window-size";
import { useNavigate, useSearchParams } from "react-router-dom";
import HomeSliderGeneratePage from "./web_pages/Home_Sliders/home_slider_page";
import KycSliderPage from "./web_pages/kyc_slider/kyc-slider-page";
import LoginBannerPage from "./web_pages/login_page/login-banner-page";
import { IAdsBannerTypes } from "@/types/ads.bannerTypes";
import FlashDealBannerPage from "./web_pages/Flash_Banners/flash-deal-slider-page";
import AdsBannerPage from "./web_pages/ads/ads-page";

interface BannerSection {
  id: number;
  title: string;
  component: IAdsBannerTypes;
  icon: string;
  enabled: boolean;
}

export default function WebpSetupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onlyWidth = useWindowWidth();

  const url = searchParams.get("banner");

  const BannerSections: BannerSection[] = [
    {
      id: 1,
      title: "Home Sliders",
      component: "home_slider_1",
      icon: "",
      enabled: true,
    },
    {
      id: 2,
      title: "kyc Slider",
      component: "kyc_slider",
      icon: "",
      enabled: true,
    },
    {
      id: 3,
      title: "Set Login Banner",
      component: "login_page",
      icon: "",
      enabled: true,
    },
    {
      id: 4,
      title: "Flash Deals",
      component: "flash_banners",
      icon: "",
      enabled: true,
    },
    {
      id: 5,
      title: "Ads",
      component: "ads",
      icon: "",
      enabled: true,
    },
  ];

  const renderPageComponent = () => {
    switch (url || "home_slider_1") {
      case "home_slider_1":
      case "home_slider_2":
      case "home_slider_3":
        return <HomeSliderGeneratePage />;
      case "kyc_slider":
        return <KycSliderPage />;
      case "login_page":
        return <LoginBannerPage />;
      case "flash_banners":
        return <FlashDealBannerPage />;
          case "ads":
          return <AdsBannerPage />;

      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-[90vh] bg-white rounded-md shadow-lg p-6 flex gap-4 overflow-y-auto">
      {!(onlyWidth < 800 && url) ? (
        <div className={`w-[250px] bg-white min-h-[300px] h-fit shadow-sm`}>
          {/* Sidebar section */}
          <ul className="flex flex-col">
            {BannerSections.map((section, index) => (
              <li
                key={section.id}
                className={`p-3 text-sm capitalize hover:bg-blue-50 duration-300 transition-all ${
                  url === section.component || (!url && index === 0)
                    ? "text-textMain bg-blue-100"
                    : ""
                }  ${
                  !section.enabled
                    ? "bg-gray-50 text-gray-200 cursor-not-allowed"
                    : "cursor-pointer"
                } `}
                onClick={() => {
                  if (section.enabled) {
                    navigate(`/web-setup?banner=${section.component}`);
                  }
                }}
              >
                {section.title}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="pt-5">
            <MyBackBtn
              clickEvent={() => {
                navigate("/web-setup");
              }}
            />
          </div>
          <div className="flex-1">{renderPageComponent()}</div>
        </>
      )}
      {onlyWidth > 800 && <div className="flex-1">{renderPageComponent()}</div>}
    </div>
  );
}
