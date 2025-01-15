import UserCreateForm from "@/components/settings/user-managments/User_Create_Form";
import UserManagementTable from "@/components/settings/user-managments/UserManagement_Table";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

function UserManagementPage() {
  const [searchParams] = useSearchParams();
  const urlTypes = searchParams.get("type") as "users" | "create" | "edit" | null;
  const navigate = useNavigate();

  const handleTabClick = useCallback(
    (type: "users" | "create"|"edit") => {
      navigate(`/settings/user-management?type=${type}`);
    },
    [navigate]
  );

  const renderAdminSetupTabs = () => {
    switch (urlTypes) {
      case "users":
        return <UserManagementTable />;
      case "create":
      case "edit": // Both "create" and "edit" render the same form
        return <UserCreateForm />;
      default:
        return <UserManagementTable />;
    }
  };

  return (
    <div className="">
      <div className=" p-4 flex justify-between">
        <h1 className="font-bold">User Management</h1>
      </div>
      {/* ========= */}
      <div className="page-outer">
        <Tabs defaultValue="view" className="w-full">
          <TabsList className="border bg-transparent rounded-full py-6 ">
            <TabsTrigger
              value="offline"
              data-state={urlTypes === "users" ? "active" : "inactive"}
              className="data-[state=active]:bg-bg text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
              onClick={() => handleTabClick("users")}
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="create"
              data-state={urlTypes === "create" || urlTypes === "edit" ? "active" : "inactive"}
              className="data-[state=active]:bg-bg text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
              onClick={() => handleTabClick("create")}
            >
              User Setup
            </TabsTrigger>
          </TabsList>
          <div>{renderAdminSetupTabs()}</div>
        </Tabs>
      </div>
    </div>
  );
}

export default UserManagementPage;
