import { useParams } from "react-router-dom";
import ProfileSidebar from "../../components/user-profiles/bar-options/profile_sidebar";
import ProfilePageForm from "./profile-pages/Profile/profile-page-form";
import SecurityPageForm from "./profile-pages/Security/security-page-form";
import NotificationSetupPage from "./profile-pages/notifications-setup/notification-setup-page";

const UserProfilePage = () => {
  const { page } = useParams();

  const renderProfilePage = (page?: string) => {
    switch (page) {
      case "profile":
        return <ProfilePageForm />;
      case "security":
        return <SecurityPageForm />;

      // case "billing":
      //   return <NotificationSetupPage />;
         case "notifications":
        return <NotificationSetupPage />;

      default:
        return <ProfilePageForm />;
    }
  };

  return (
    <div className="">
      <div className="p-3">
        <h1 className="text-xl font-bold">Admin Profile</h1>
      </div>

      <div className="bg-white min-h-[80vh] w-full rounded-md shadow-sm flex">
        {/* side bar starting */}
        <div
          className={`sm:w-[300px] w-full bg-slate ${page ? "md:block hidden" : ""} `}
        >
          <ProfileSidebar />
        </div>
        <div
          className={`flex-1 p-2 bg-gray-50  ${page ? "" : "md:block hidden"}`}
        >
          {renderProfilePage(page)}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
