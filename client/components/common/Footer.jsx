import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="border-t border-t-slate-200 w-full p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-y-2 text-xs text-slate-500">
      <p>
        © 2023{" "}
        BookYard
        . All rights reserved.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-1 gap-x-10">
        <Link to="/" className="hover:underline hover:text-slate-700">
          Contact
        </Link>
        <Link to="/" className="hover:underline hover:text-slate-700">
          Terms of Service
        </Link>
        <Link to="/" className="hover:underline hover:text-slate-700">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
