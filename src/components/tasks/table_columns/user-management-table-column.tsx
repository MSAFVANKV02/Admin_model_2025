import { IUserTypes } from "@/types/adminUserTypes";
import { ColumnDef } from "@tanstack/react-table";


export const UserManagementColumn: ColumnDef<IUserTypes>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="span">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="span">{row.getValue("email")}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <span className="span capitalize">{row.getValue("role")}</span>,
  },
  {
    accessorKey: "pages",
    header: "Accessible Pages",
    cell: ({ row }) => {
      const pages = row.getValue("pages") as string[]; // Assert that pages is a string array
      return (
        <ul className="list-disc pl-4">
          {pages.map((page, index) => (
            <li key={index}>{page}</li>
          ))}
        </ul>
      );
    },
  }
  
];
