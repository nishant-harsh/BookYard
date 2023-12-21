import { useAllReservation } from "../../hooks/useAdmin";

import { columns } from "./_components/columns";
import { DataTable } from "../common/data-table";

export default function ReservationPage() {
  const { allReservationData, reservationsLoding } = useAllReservation();

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reservations</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all reservations for this month!
          </p>
        </div>
      </div>
      {!reservationsLoding && allReservationData && (
        <DataTable data={allReservationData} columns={columns} />
      )}
    </div>
  );
}
