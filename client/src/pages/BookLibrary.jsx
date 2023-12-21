import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import BookItem from "@/components/bookItem";
import { useBooks } from "@/hooks/useBooks";
import { useCurrentUser } from "@/hooks/useAuth";
import AdminDashboard from "./AdminDashboard";
import { useLocation } from "react-router-dom";

const PlaceHolder = () => {
  return (
    <>
      {[...Array(6)].map((num, idx) => (
        <div
          key={idx}
          className="flex gap-2 p-2 border rounded-xl border-slate-100"
        >
          <Skeleton className="h-[280px] w-[180px]" />
          <div className="flex flex-col justify-between w-fit">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-6 w-[180px]" />
              <Skeleton className="h-2 w-[180px]" />
              <Skeleton className="h-2 w-[180px]" />
              <Skeleton className="h-2 w-[180px]" />
              <Skeleton className="h-2 w-[180px]" />
            </div>
            <Skeleton className="h-12 w-[180px]" />
          </div>
        </div>
      ))}
    </>
  );
};

const BookLibrary = () => {
  const location = useLocation();
  const available = new URLSearchParams(location.search).get("available");
  const { books, booksLoading, booksError } = useBooks();
  const { isAdmin } = useCurrentUser();

  if (isAdmin) {
    return <AdminDashboard totalBooks={books.length} />;
  }

  let filteredBooks;

  if (available) {
    filteredBooks = books.filter((book) => {
      const status = available === "true" ? true : false;
      const regex = new RegExp(`\\b${status}\\b`, "g");
      return regex.test(book.availability);
    });
  } else {
    filteredBooks = books;
  }

  return (
    <div className="p-4 sm:px-8 w-full flex flex-col space-y-2 relative">
      <h1 className="text-lg font-semibold uppercase">Book Library</h1>
      <ScrollArea className="h-full max-h-[calc(100vh-15rem)] py-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {booksLoading && <PlaceHolder />}
          {!booksLoading &&
            filteredBooks.map((book) => (
              <BookItem key={book._id} data={book} />
            ))}
          {booksError && (
            <div className="h-[200px] rounded-md w-full flex items-center justify-center text-rose-700 bg-rose-50 font-medium">
              Something went wrong!
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BookLibrary;
