import { SidebarRoutes } from "../sidebar-routes";

const Sidebar = () => {
  return <div className="h-full border-r border-r-slate-200 flex flex-col overflow-y-auto">
    <div className="flex flex-col w-full">
      <SidebarRoutes />
    </div>
  </div>;
};

export default Sidebar;
