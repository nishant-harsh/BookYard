/* eslint-disable react/prop-types */
import { useReserveBook } from "../hooks/useBooks";
import { Button } from "./ui/button";

const BookItem = ({ data }) => {
  const reserveBook = useReserveBook();
  return (
    <div
      key={data._id}
      className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 border rounded-xl border-slate-200 shadow-inner"
    >
      <div className="relative flex items-center justify-center bg-zinc-200 rounded-l-md">
        <img
          src={data.bookImage}
          alt={data.title}
          className="rounded-md object-cover w-[248px]"
        />
      </div>
      <div className="flex flex-col justify-between gap-4 p-2 md:p-0">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold leading-tight capitalize">
            {data.title}
          </h3>
          <p className="text-zinc-400 text-xs">{data.author}</p>
          <div className="flex flex-col mt-2 gap-1">
            <p className="text-zinc-500 text-sm">Published In {data.pubYear}</p>
            <p className="text-zinc-500 text-sm py-1 px-4 bg-muted w-fit rounded-full">
              {data.genre}
            </p>
          </div>
        </div>
        <Button
          variant="default"
          disabled={!data.availability}
          onClick={() => reserveBook.mutate(data._id)}
        >
          {data.availability ? "Reserve Book" : "Unavailable"}
        </Button>
      </div>
    </div>
  );
};

export default BookItem;
