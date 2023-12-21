import { useBooks } from "../../hooks/useBooks";

import { columns } from "./_components/columns";
import { DataTable } from "../common/data-table";

export default function BooksPage() {
  const { books, booksLoading } = useBooks();

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Books</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your books for this month!
          </p>
        </div>
      </div>
      {!booksLoading && books && <DataTable data={books} columns={columns} />}
    </div>
  );
}
