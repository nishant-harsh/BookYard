/* eslint-disable react/prop-types */
import { Ban, CheckCheck, MoreHorizontal } from "lucide-react";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useReservationStatus } from "../../../hooks/useAdmin";

export function DataTableRowActions({ row }) {
  const updateStatus = useReservationStatus();

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
          Update Status
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-teal-700 flex items-center gap-2 hover:bg-teal-50 hover:text-teal-800"
          disabled={row.original.status !== "Pending"}
          onClick={() => updateStatus.mutate({
            reservationId: row.original._id,
            status: "Approved"
          })}
        >
          <CheckCheck className="h-4 w-4" /> Approve
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-rose-700 flex items-center gap-2 hover:bg-rose-50 hover:text-rose-800"
          disabled={row.original.status !== "Pending"}
          onClick={() => updateStatus.mutate({
            reservationId: row.original._id,
            status: "Rejected"
          })}
        >
          <Ban className="h-4 w-4" /> Reject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
