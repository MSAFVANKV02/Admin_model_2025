import { OrderReturnColumn } from "@/components/tasks/table_columns/ordes/orders-return-table-columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { IOrders } from "@/types/orderTypes";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useMemo } from "react";

const Orders: IOrders[] = [
  {
    orderCode: "20240506–21040405",
    store: "Calicut",
    numOfProducts: 1,
    customer: "Sulfeekar",
    amount: "₨1,978.00",
    deliveryStatus: "Pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Un-paid",
    refund: "No Refund",
    createdAt: "12/12/2015",
    returnType: "refund",
  },
  {
    orderCode: "20240506–21040495",
    store: "Name",
    numOfProducts: 1,
    customer: "Name",
    amount: "₨1,978.00",
    deliveryStatus: "Pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Un-paid",
    refund: "No Refund",
    createdAt: "12/12/2015",
    returnType: "refund",
  },
  {
    orderCode: "20240506–21040477",
    store: "Name",
    numOfProducts: 1,
    customer: "Name",
    amount: "₨1,978.00",
    deliveryStatus: "Pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Un-paid",
    refund: "No Refund",
    createdAt: "12/12/2015",
    returnType: "replace",
  },
];

function CustomerRefundPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  //   const [returnPages, setReturnPages] = useState<"all" | "replace" | "refund">(
  //     "all"
  //   );
  const returnTypeFilter = searchParams.get("return") as
    | "all"
    | "replace"
    | "refund"
    | null;

  //   const filteredOrders =
  //     returnTypeFilter && returnTypeFilter !== "all"
  //       ? Orders.filter((order) => order.returnType === returnTypeFilter)
  //       : Orders;
  const filteredOrders = useMemo(() => {
    if (returnTypeFilter && returnTypeFilter !== "all") {
      return Orders.filter((order) => order.returnType === returnTypeFilter);
    }
    return Orders;
  }, [returnTypeFilter]);

  // Memoize the onClick handler for the tabs
  const handleTabClick = useCallback(
    (type: "all" | "replace" | "refund") => {
      navigate(`/sales/refunds?return=${type}`);
    },
    [navigate]
  );

  return (
    <div>
      <div className="">
        <h1>Refund Request All</h1>
      </div>
      {/* -=====- */}

      <div className="page-outer">
        <Tabs defaultValue="all" className="w-[400px]">
          <TabsList className="border bg-transparent rounded-full py-6 ">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-bg text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
              onClick={() => handleTabClick("all")}
            >
              Refund/Replace request
            </TabsTrigger>
            <TabsTrigger
              value="replace"
              className="data-[state=active]:bg-bg text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
              onClick={() => handleTabClick("replace")}
            >
              Replace request
            </TabsTrigger>
            <TabsTrigger
              value="refund"
              className="data-[state=active]:bg-bg text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
              onClick={() => handleTabClick("refund")}
            >
              Refund request
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <DataTable data={filteredOrders} columns={OrderReturnColumn} />

        {returnTypeFilter === "refund" && <div className=""></div>}
      </div>
    </div>
  );
}

export default CustomerRefundPage;
