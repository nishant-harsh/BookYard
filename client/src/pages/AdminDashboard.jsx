/* eslint-disable react/prop-types */
import { BookCopy, Users2, ListTodo, ShieldAlert } from "lucide-react";
// import { Overview } from "@/components/overview";
import { DataTable } from "@/components/common/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAllReservation, useGetAllUsers } from "@/hooks/useAdmin";
import { useBooks } from "@/hooks/useBooks";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { statuses } from "@/components/reservations/data";
import { cn } from "@/lib/utils";

const bookCols = [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Book" />
    ),
    cell: ({ row }) => {
      const code = row.getValue("_id").slice(-5);
      return <div className="w-fit uppercase">{`Book-${code}`}</div>;
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
];

const reservationCols = [
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
            Status === "Approved"
              ? "text-teal-600"
              : Status === "Pending"
              ? "text-yellow-600"
              : "text-rose-600"
          )}
        >
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 animate-pulse" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
  },
];

const AdminDashboard = ({ totalBooks }) => {
  const { totalUsers } = useGetAllUsers();
  const { books, booksLoading } = useBooks();
  const {
    allReservationData,
    totalReservations,
    pendingReservation,
    reservationsLoding,
  } = useAllReservation();

  return (
    <div className="p-4 sm:px-8 w-full flex flex-col space-y-4">
      <h1 className="text-lg font-semibold uppercase">Overview</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookCopy className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalBooks}</div>
            <p className="text-xs text-muted-foreground">
              Available in library
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users2 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered to BookYard
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Reservations
            </CardTitle>
            <ListTodo className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalReservations}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <ShieldAlert className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReservation}</div>
            <p className="text-xs text-muted-foreground">To handle</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Books <span className="text-muted-foreground">(Preview)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            {!booksLoading && books && (
              <DataTable data={books} columns={bookCols} preview={true} />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Reservations{" "}
              <span className="text-muted-foreground">(Preview)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            {!reservationsLoding && allReservationData && (
              <DataTable
                data={allReservationData}
                columns={reservationCols}
                preview={true}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
