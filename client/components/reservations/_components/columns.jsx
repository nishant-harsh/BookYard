import { Checkbox } from "../../ui/checkbox";

import { statuses } from "../data";
import { DataTableColumnHeader } from "../../common/data-table-column-header";

import { cn } from "../../../lib/utils";
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
      <DataTableColumnHeader column={column} title="Reservation" />
    ),
    cell: ({ row }) => {
      const code = row.getValue("_id").slice(-5);
      return <div className="w-fit uppercase">{`Reserve-${code}`}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "book",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Book" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("book").title}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("user").name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const data = row.getValue("createdAt");
      const formattedDate = new Date(data).toLocaleDateString();
      return (
        <div className="text-muted-foreground">
          <span>{formattedDate || "-"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const Status = row.getValue("status");
      const status = statuses.find((status) => status.value === Status);

      if (!status) {
        return null;
      }

      return (
        <div
          className={cn(
            "flex items-center",
            Status === "Approved" ? "text-teal-600" : Status === "Pending"? "text-yellow-600" : "text-rose-600"
          )}
        >
          {status.icon && <status.icon className="mr-2 h-4 w-4 animate-pulse" />}
          <span>{status.label}</span>
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
