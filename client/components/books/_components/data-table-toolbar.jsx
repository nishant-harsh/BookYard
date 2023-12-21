/* eslint-disable react/prop-types */
import { XCircle } from "lucide-react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { DataTableViewOptions } from "../../common/data-table-view-options";

import { genres, statuses } from "../data";
import { DataTableFacetedFilter } from "../../common/data-table-faceted-filter";
import { useModal } from "../../../hooks/useModal";

export function DataTableToolbar({ table }) {
  const { onOpen } = useModal();
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Button
          className="h-8 bg-sky-50 border-sky-200 text-sky-700"
          variant="outline"
          onClick={() => onOpen("createBook")}
        >
          Add Book
        </Button>
        <Input
          placeholder="Filter tasks..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("genre") && (
          <DataTableFacetedFilter
            column={table.getColumn("genre")}
            title="Genre"
            options={genres}
          />
        )}
        {table.getColumn("availability") && (
          <DataTableFacetedFilter
            column={table.getColumn("availability")}
            title="Availability"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XCircle className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
