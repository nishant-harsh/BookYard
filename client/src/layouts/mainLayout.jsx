import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useAuth";
import { useEffect } from "react";

export const MainLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useCurrentUser();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 h-full w-full">
        <div className="hidden md:flex h-full w-[260px] flex-col z-50">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full justify-between">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};
