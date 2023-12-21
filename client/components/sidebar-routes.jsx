import {
  BookMarked,
  Compass,
  Layout,
  LibraryBig,
  TableProperties,
  UserRoundCog,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import { useCurrentUser } from "../hooks/useAuth";

const memberRoutes = [
  {
    icon: Compass,
    label: "Browse",
    href: "/",
  },
  {
    icon: BookMarked,
    label: "Books Shelf",
    href: "/bookshelf",
  },
];

const adminRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: LibraryBig,
    label: "Books",
    href: "/books",
  },
  {
    icon: TableProperties,
    label: "Reservations",
    href: "/reservations",
  },
  {
    icon: UserRoundCog,
    label: "Users",
    href: "/users-detail",
  }
];

export const SidebarRoutes = () => {
  const { isAdmin } = useCurrentUser();

  const routes = isAdmin ? adminRoutes : memberRoutes;

  return (
    <>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </>
  );
};
