
import { StoreTypes } from "@/types/storeTypes";
import { ColumnDef } from "@tanstack/react-table";



export const TopStoresColumn: ColumnDef<StoreTypes>[] = [
  {
    accessorKey: "user.buildingName",
    header: "Store Name",
    cell: ({ row }) => <span className="span">{row.original.name}</span>,
  },
  {
    accessorKey: "user.emailId",
    header: "Orders",
    cell: ({ row }) => <span className="span">{row.original.emailId}</span>,
  },
  {
    accessorKey: "user.pinCode",
    header: "Total sales(₹)",
    cell: ({ row }) => <span className="span">{row.original.pinCode}</span>,
  },
 
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActionsDashboard row={row} isTopStoresTable={true}/>,
  // },
];
