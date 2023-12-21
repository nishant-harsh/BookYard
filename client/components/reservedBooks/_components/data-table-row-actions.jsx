/* eslint-disable react/prop-types */
import { MoreHorizontal, Undo2, X } from "lucide-react";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useDeleteBookRequest, useReturnBook } from "../../../hooks/useBooks";

export function DataTableRowActions({ row }) {
  const returnBook = useReturnBook();
  const cancelRequest = useDeleteBookRequest();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="flex items-center font-medium" disabled>
          Return Book
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-teal-700 flex items-center gap-2 hover:bg-teal-50 hover:text-teal-800"
          disabled={row.original.status !== "Approved"}
          onClick={() => returnBook.mutate(row.original.book._id)}
        >
          <Undo2 className="h-4 w-4" /> Return
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center font-medium" disabled>
          Reserve Request
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-rose-700 flex items-center gap-2 hover:bg-rose-50 hover:text-rose-800"
          disabled={row.original.status === "Approved" || row.original.status === "Rejected"}
          onClick={() => cancelRequest.mutate(row.original._id)}
        >
          <X className="h-4 w-4" /> Cancel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
