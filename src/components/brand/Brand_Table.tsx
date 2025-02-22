import BrandApprovedTable from "./Brand_Approved_Table";
import BrandRequestedTable from "./Brand_Requested_Table";
import { IBrand } from "@/types/brandtypes";
import MyPageTab from "../myUi/MyTab";

type Props = {
  brands: IBrand[];
};

export default function BrandTable({ brands }: Props) {
  const filterApprovedBrands = brands.filter((brand) => {
    return brand.status === "approved";
  });

  const filterRequestedBrands = brands.filter((brand) => {
    return brand.status === "pending";
  });

  return (
    <div className="">
      <MyPageTab
        tabs={[
          {
            title: "Approved Brands",
            value: "approved",
            url: "/products/brand?type=approved",
            children: <BrandApprovedTable brands={filterApprovedBrands} />,
          },
          {
            title: "Brand Requests",
            value: "requested",
            url: "/products/brand?type=requested",
            children: <BrandRequestedTable brands={filterRequestedBrands} />,
          },
        ]}
      />
      {/* <Tabs defaultValue="approved" className="w-full">
      <TabsList className="border bg-transparent rounded-full py-6 ">
        <TabsTrigger
          value="approved"
          className="data-[state=active]:bg-bg text-xs w-32 py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
          onClick={() => {}}
        >
         Approved Brands
        </TabsTrigger>
        <TabsTrigger
          value="requested"
          className="data-[state=active]:bg-bg text-xs w-32 py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
          onClick={() => {}}
        >
          Brand Requests
        </TabsTrigger>
      </TabsList>
      <TabsContent value="approved">
        <BrandApprovedTable brands={brands} />
      </TabsContent>
      <TabsContent value="requested">
        <BrandRequestedTable brands={brands}/>
      </TabsContent>
    </Tabs> */}
    </div>
  );
}
