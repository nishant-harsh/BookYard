/* eslint-disable react/prop-types */
import { XCircle } from "lucide-react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { DataTableViewOptions } from "../../common/data-table-view-options";

import { statuses } from "../data";
import { DataTableFacetedFilter } from "../../common/data-table-faceted-filter";

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter reservations..."
          value={table.getColumn("book")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("book")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
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
