/* eslint-disable react/prop-types */
import { MoreHorizontal, ShieldCheck, Trash, UserRound } from "lucide-react";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useDeleteUser, useUpdateRole } from "../../../hooks/useAdmin";

export function DataTableRowActions({ row }) {
  const updateRole = useUpdateRole();
  const deleteUser = useDeleteUser();

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
          className="flex items-center gap-2 font-medium"
          disabled
        >
          Update Role
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 text-orange-900 font-medium"
          onClick={() =>
            updateRole.mutate({
              userId: row.original._id,
              role: "Member",
            })
          }
        >
          <UserRound className="h-4 w-4" /> Member
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-violet-900 font-medium flex items-center gap-2 hover:bg-violet-50! hover:text-violet-800!"
          onClick={() =>
            updateRole.mutate({
              userId: row.original._id,
              role: "Admin",
            })
          }
        >
          <ShieldCheck className="h-4 w-4" /> Admin
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 font-medium"
          disabled
        >
          Delete User
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-rose-700 flex items-center gap-2 hover:bg-rose-50! hover:text-rose-800!"
          onClick={() => deleteUser.mutate(row.original._id)}
        >
          <Trash className="h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
