import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandApprovedTable from "./Brand_Approved_Table";
import BrandRequestedTable from "./Brand_Requested_Table";

type Props = {};

export default function BrandTable({}: Props) {
  return (
    <Tabs defaultValue="approved" className="w-full">
      <TabsList className="border bg-transparent rounded-full py-6 ">
        <TabsTrigger
          value="approved"
          className="data-[state=active]:bg-bg w-32 py-2 data-[state=active]:text-white data-[state=active]:rounded-full"
          onClick={() => {}}
        >
          Main
        </TabsTrigger>
        <TabsTrigger
          value="requested"
          className="data-[state=active]:bg-bg w-32 py-2 data-[state=active]:text-white data-[state=active]:rounded-full"
          onClick={() => {}}
        >
          All
        </TabsTrigger>
      </TabsList>
      <TabsContent value="approved">
        <BrandApprovedTable />
      </TabsContent>
      <TabsContent value="requested">
        <BrandRequestedTable />
      </TabsContent>
    </Tabs>
  );
}
