import { StoreProductTransferTableColumn } from "@/components/tasks/table_columns/store/store-product-transfer-column";
import { DataTable } from "@/components/tasks/task_components/data-table";

const data = [
  {
    id: "1",
    name: "John Doe",
    date: "2023-01-01",
    store: "ABC Store",
    email: "johndoe@example.com",
    gst: "1234567890",
    pinCode: "12345",
    buildingNo: "123",
    actions: "Actions",
  },
];

export default function ProductTransferPage() {
  return (
    <div>
      <div className="p-4">
        <h1>Product transfer</h1>
      </div>
      <div className="page-outer">
        <DataTable data={data} columns={StoreProductTransferTableColumn} />
      </div>
    </div>
  );
}
