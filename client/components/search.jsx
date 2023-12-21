import { useMemo, useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { BookCheck, BookCopy, BookX, Filter } from "lucide-react";

export const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useMemo(() => {
    const debounceTimeout = 500; // 500ms delay
    let timer;

    return (searchTerm) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        search(searchTerm);
      }, debounceTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = (searchTerm) => {
    if (searchTerm == "") {
      navigate("/", { replace: true });
    } else {
      navigate(`/search/?bookName=${searchTerm}`);
    }
  };

  // Handle search term changes
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <div className="hidden md:flex items-center gap-3">
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[200px] lg:w-[300px]"
        onChange={handleChange}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-18" align="end" forceMount>
          <DropdownMenuItem onClick={() => navigate("/", { replace: true })}>
            <BookCopy className="h-4 w-4 text-muted-foreground mr-2" /> All
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/?available=true", { replace: true })}
          >
            <BookCheck className="h-4 w-4 text-muted-foreground mr-2" />{" "}
            Available
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/?available=false", { replace: true })}
          >
            <BookX className="h-4 w-4 text-muted-foreground mr-2" /> Unavailable
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
