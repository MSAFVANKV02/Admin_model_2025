"use client";

import { ColumnDef } from "@tanstack/react-table";
import CustomersActions from "./customers-actions";
import { IUserProps } from "@/types/adminUserTypes";

export const CustomersTableColumn: ColumnDef<IUserProps>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-bold text-black max-w-32">Name</div>,
    cell: ({ row }) => <div>{row.original.user.name}</div>,
  },
  {
    accessorKey: "shopName",
    header: () => (
      <div className="font-bold text-black max-w-32">Shop Name</div>
    ),
    cell: ({ row }) => <div>{row.original.user.shopName}</div>,
  },
  {
    accessorKey: "mobile",
    header: () => <div className="font-bold text-black max-w-32">Mobile</div>,
    cell: ({ row }) => <div>{row.original.user.mobile}</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="font-bold text-black max-w-32 ">Email</div>,
    cell: ({ row }) => <div>{row.original.user.email}</div>,
  },
  {
    accessorKey: "emailId",
    header: () => (
      <div className="font-bold text-black max-w-32">Business Email</div>
    ),
    cell: ({ row }) => <div>{row.original.kyc.emailId}</div>,
  },
  // {
  //   accessorKey: "gst",
  //   header: () => (
  //     <div className="font-bold text-black max-w-32">GST number</div>
  //   ),
  //   cell: ({ row }) => <div>{row.original.gst}</div>,
  // },

  {
    accessorKey: "pinCode",
    header: () => <div className="font-bold text-black max-w-32">PinCode</div>,
    cell: ({ row }) => <div>{row.original.user.pinCode}</div>,
  },

  {
    accessorKey: "kycApproved",
    header: () => (
      <div className="font-bold text-black max-w-32">Kyc Status</div>
    ),
    cell: ({ row }) => (
      <div>
        {row.original.user.kycApproved ? (
          <span className="text-xs bg-green-400 text-white p-1 rounded-sm shadow-lg font-bold">
            Approved
          </span>
        ) : (
          <span className="text-xs bg-red-400 text-white p-1 rounded-sm shadow-lg font-bold">
            Not Approved
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "isDeleted",
    header: () => (
      <div className="font-bold text-black max-w-32">Acc Status</div>
    ),
    cell: ({ row }) => (
      <div>
        {row.original.user.isDeleted ? (
          <span className="text-xs bg-red-400 text-white p-1 rounded-sm shadow-lg font-bold">
            User Account Is Deleted
          </span>
        ) : (
          <span className="text-xs bg-green-400 text-white p-1 rounded-sm shadow-lg font-bold">
            Active Account
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => (
      <div className="font-bold text-black  flex justify-center">Options</div>
    ),
    cell: ({ row }) => {
      //   const order = row.original;
      return (
        <div className="relative flex justify-center">
          <CustomersActions data={row.original} />
          {/* Additional action logic can go here */}
        </div>
      );
    },
  },
];
