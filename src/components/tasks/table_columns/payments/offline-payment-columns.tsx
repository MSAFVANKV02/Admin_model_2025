"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActionsDashboard } from "../../table_actions/data-table-action-dashboard";
import { IUserProps } from "@/types/adminUserTypes";


// import { DataTableColumnHeader } from "../task_components/data-table-column-header";

export const OfflinePaymentColumns: ColumnDef<IUserProps>[] = [
  {
    accessorKey: "numbers",

    header: () => <div className="font-bold text-black max-w-32 ">#</div>,
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },

  {
    accessorKey: "orderId",
    header: () => (
      <div className="font-bold text-black max-w-32 ">Order ID</div>
    ),
    cell: ({ row }) => {
      return <div className="">{row.original.user._id}</div>;
    },
  },
  {
    accessorKey: "orderId",
    header: () => (
      <div className="font-bold text-black max-w-32 ">Transaction ID</div>
    ),
    cell: () => {
      return <div className="">Transaction ID</div>;
    },
  },

  {
    accessorKey: "name",
    header: () => <div className="font-bold text-black max-w-32 ">Customer name</div>,
    cell: () => {
      return <div>Customer name</div>;
    },
  },

  {
    accessorKey: "date",
    header: () => (
      <div className="font-bold text-black max-w-32 ">Date</div>
    ),
    cell: ({ row }) => {
      return <div className="">{row.original.user?.createdAt}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="font-bold text-black max-w-32 ">Status</div>
    ),
    cell: ({ row }) => {
      return <div className="">{row.original.user.kycStatus}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="font-bold text-black max-w-32 ">Payment method</div>,
    cell: () => {
      return <div>UPI</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="font-bold text-black max-w-32 ">Amount</div>
    ),
    cell: ({ row }) => {
      return <div className="">{row.original?.user._id}</div>;
    },
  },
  {
    accessorKey: "actions",
    // header: "Actions",
    header: () => <div className="font-bold text-black"></div>,
    cell: ({ row }) => {
      return (
        <div className="relative flex justify-end">
          <DataTableRowActionsDashboard type="offline_dash_modal" row={row} />

          {/* Add menu logic here */}
        </div>
      );
    },
  },
];
