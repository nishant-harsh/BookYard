import { Checkbox } from "../../ui/checkbox";

import { roles } from "../data";
import { DataTableColumnHeader } from "../../common/data-table-column-header";

import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      const code = row.getValue("_id").slice(-5);
      return <div className="w-fit uppercase">{`User-${code}`}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "reservations",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Reservation Count" />
  //   ),
  //   cell: ({ row }) => {
  //     const data = row.getValue("reservations");
  //     return (
  //       <div className="text-muted-foreground">
  //         <span>{data}</span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const Role = row.getValue("role");
      const role = roles.find((role) => role.value === Role);

      if (!role) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {role.icon && (
            <role.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{role.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
