import UserCreateForm from "@/components/settings/user-managments/User_Create_Form";
import UserManagementTable from "@/components/settings/user-managments/UserManagement_Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function UserManagementPage() {
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
              className="data-[state=active]:bg-bg text-xs w-32 py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
              value="view"
            >
             Users
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bg text-xs w-32 py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
              value="create"
            >
              Create
            </TabsTrigger>
          </TabsList>
          <TabsContent value="view">
           <UserManagementTable />
          </TabsContent>
          <TabsContent value="create">
            <UserCreateForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default UserManagementPage;
