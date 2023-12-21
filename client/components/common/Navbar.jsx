import { Link } from "react-router-dom";

import Logo from "../../src/assets/BookYardLogo.png";
import { MobileSidebar } from "../mobile-sidebar";
import { UserNav } from "./user-nav";
import { Search } from "../search";
import { useCurrentUser } from "../../hooks/useAuth";

const Navbar = () => {
  const { isAdmin } = useCurrentUser();

  return (
    <div className="px-4 py-2 sm:px-6 flex justify-between items-center border-b border-b-slate-200">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <Link to="/" className="flex gap-1 items-center">
          <span>
            <img src={Logo} alt="logo" className="w-10 h-10 sm:w-14 sm:h-14" />
          </span>
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
            BOOKYARD
          </h1>
        </Link>
      </div>

      {!isAdmin && <Search />}

      <UserNav />
    </div>
  );
};

export default Navbar;
