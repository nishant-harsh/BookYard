import { Checkbox } from "../../ui/checkbox";

import { statuses } from "../data";
import { DataTableColumnHeader } from "../../common/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { cn } from "../../../lib/utils";

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
      <DataTableColumnHeader column={column} title="Book" />
    ),
    cell: ({ row }) => {
      const code = row.getValue("_id").slice(-5);
      return (
        <div className="w-fit uppercase">{`Book-${code}`}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => {
      const author = row.getValue("author");
      return (
        <div className="text-muted-foreground">
          <span>{author || "-"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "pubYear",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published Year" />
    ),
    cell: ({ row }) => {
      const pubYear = row.getValue("pubYear");
      return (
        <div className="font-normal">
          <span>{pubYear || "-"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "genre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Genre" />
    ),
    cell: ({ row }) => {
      const genre = row.getValue("genre");
      return (
        <div className="font-normal p-1 px-4 w-full bg-sky-50 border rounded-full text-center">
          <span>{genre || "-"}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "availability",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Availability" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("availability")
      );

      if (!status) {
        return null;
      }

      return (
        <div className={cn("flex w-[100px] items-center", row.getValue("availability") ? "text-teal-600": "text-rose-600")}>
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4" />
          )}
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
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
