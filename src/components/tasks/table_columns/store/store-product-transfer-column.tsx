"use client";

import { ColumnDef } from "@tanstack/react-table";
import StoreProductTransferAction from "../../table_actions/store/store-product-transfer-action";

export const StoreProductTransferTableColumn: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-bold text-black max-w-32">Date</div>,
    cell: ({ row }) => <div>{row.original.date}</div>,
  },
  {
    accessorKey: "store",
    header: () => <div className="font-bold text-black max-w-32">Transfer ID</div>,
    cell: () => <div>Store</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="font-bold text-black max-w-32">Store From</div>,
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "gst",
    header: () => (
      <div className="font-bold text-black max-w-32">Amount</div>
    ),
    cell: ({ row }) => <div>{row.original.gst}</div>,
  },

  {
    accessorKey: "pinCode",
    header: () => <div className="font-bold text-black max-w-32">Status</div>,
    cell: ({ row }) => <div>{row.original.pinCode}</div>,
  },

  {
    accessorKey: "actions",
    header: () => <div className="font-bold text-black max-w-32">Options</div>,
    cell: () => {
      //   const order = row.original;
      return (
        <div className="relative flex justify-end">
       
          <StoreProductTransferAction />
          {/* Additional action logic can go here */}
        </div>
      );
    },
  },
];
