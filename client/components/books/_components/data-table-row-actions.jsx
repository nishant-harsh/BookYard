/* eslint-disable react/prop-types */
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useDeleteBook } from "../../../hooks/useBooks";
import { useModal } from "../../../hooks/useModal";

export function DataTableRowActions({ row }) {
  const { onOpen } = useModal();
  const DeleteBook = useDeleteBook();

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
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => onOpen("editBook", row?.original)}
        >
          <Edit className="h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-rose-700 flex items-center gap-2 hover:bg-rose-50! hover:text-rose-800!"
          onClick={() => DeleteBook.mutate(row?.original?._id)}
        >
          <Trash className="h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
