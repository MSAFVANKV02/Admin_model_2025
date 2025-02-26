
import { StoreTypes } from "@/types/storeTypes";
import { ColumnDef } from "@tanstack/react-table";



export const TopSellerColumn: ColumnDef<StoreTypes>[] = [
  {
    accessorKey: "name",
    header: "Seller Name",
    cell: ({ row }) => <span className="span">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "emailId",
    header: "Sales quantity",
    cell: ({ row }) => <span className="span">{row.getValue("emailId")}</span>,
  },
 
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActionsDashboard row={row} isTopSellerTable={true}/>,
  // },
];
