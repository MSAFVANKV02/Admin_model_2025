import MyBackBtn from "@/components/myUi/myBackBtn";
import { useWindowWidth } from "@react-hook/window-size";
import { useNavigate, useSearchParams } from "react-router-dom";
import HomeSliderGeneratePage from "./web_pages/Home_Sliders/home_slider_page";




export default function WebpSetupPage() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onlyWidth = useWindowWidth();

  const url = searchParams.get("banner");



  const BannerSections = [
    {
      id: 1,
      title: "Home Sliders",
      component: "home-slider-1",
      icon: "",
      enabled: true,
    },
    {
      id: 2,
      title: "Home Sliders",
      component: "home-slider",
      icon: "",
      enabled: true,
    },
    {
      id: 3,
      title: "Seasonal Favorites",
      component: "seasonal-page",
      icon: "",
      enabled: true,
    },
    {
      id: 4,
      title: "Flash Deals",
      component: "flash-banner",
      icon: "",
      enabled: true,
    },
    {
      id: 5,
      title: "  Todays Deals",
      component: "todays-deal",
      icon: "",
      enabled: true,
    },
  ];


  const renderPageComponent = () => {
    switch (url || "home-slider-1") {
      case "home-slider-1":
    case "home-slider-2":
    case "home-slider-3":
        return <HomeSliderGeneratePage />;
      case "home-slider":
        return "<HomeSliderImageBanner />";
      // case "seasonal-page":
      //   return <BuildPageHome />;
      //   case "flash-banner":
      //     return <FlashImageBanner />;
      //     case "todays-deal":
      //     return <TodaysDealsOrderPage />;

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
                    navigate(
                      `/web-setup?banner=${section.component}`
                    );
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
  )
}