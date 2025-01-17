import { ColumnDef } from "@tanstack/react-table";

import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
//   orderId: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  amount: z.string(),
  date: z.string(),
  businessName: z.string(),
  email: z.string().email(), // To validate email format
  mobile: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export const TopStoresColumn: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Product Name",
    cell: ({ row }) => <span className="span">{row.getValue("title")}</span>,
  },
  {
    accessorKey: "amount",
    header: "Orders",
    cell: ({ row }) => <span className="span">{row.getValue("amount")}</span>,
  },
  {
    accessorKey: "amounts",
    header: "Total sales(₹)",
    cell: ({ row }) => <span className="span">{row.getValue("amount")}</span>,
  },
 
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActionsDashboard row={row} isTopStoresTable={true}/>,
  // },
];
