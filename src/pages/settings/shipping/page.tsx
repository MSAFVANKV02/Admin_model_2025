import MyPageTab from "@/components/myUi/MyTab";
import React from "react";
import CreateShippingPartner from "./shipping-pages/create-shipping-partner";
import AllShippingPartners from "./shipping-pages/all-shipping-partners";


function ShippingPage() {
  return (
    <div>
      <div className=" p-4 flex justify-between">
        <h1 className="font-bold">Shipping Partner Management</h1>
      </div>

      <div className="page-outer">
        <MyPageTab
          tabs={[
            {
              title: "All Partners",
              url: "/settings/shipping?type=all",
              value: "all",
              children: (
                <div>
                  <AllShippingPartners />
                </div>
              ),
            },
            {
              title: "Create Partners",
              url: "/settings/shipping?type=create",
              value: "create",
              children: (
                <div className="max-w-screen-xl mx-auto py-10">
                  <CreateShippingPartner />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

export default ShippingPage;
