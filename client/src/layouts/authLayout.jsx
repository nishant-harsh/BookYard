import { Outlet, useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useAuth";

import Logo from "../assets/BookYardLogo.png";
import { useEffect } from "react";

export const AuthLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useCurrentUser();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      return navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="container h-[600px] md:h-screen p-8 flex md:p-0 flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-10 text-white border-l lg:flex -z-10">
        <div className="absolute inset-0 -z-20 bg-zinc-50" />
        <img
          src={Logo}
          className="inset-0 absolute m-auto w-3/5"
          alt="big logo"
        />
        <div className="relative z-20 flex items-center text-lg font-bold text-black gap-1">
          BookYard:{" "}
          <span className="text-zinc-400 font-medium">
            Sowing Seeds of Knowledge
          </span>
        </div>
        <div className="relative z-20 mt-auto text-zinc-400 text-xs">
          <blockquote className="space-y-2 text-center">
            <p className="text-sm">
              &ldquo;BookYard is not just a library management system, it&apos;s
              a community for book lovers. We believe in the power of reading to
              expand horizons and enrich lives. Our mission is to make
              literature accessible and enjoyable for everyone in our local
              community. With our user-friendly system, you can easily manage
              your books and returns, discover new titles. Join us at BookYard,
              where we&apos;re cultivating minds, one book at a time! 📚.&rdquo;
            </p>
            <footer>~ Navdeep Khede</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 relative h-full flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};
