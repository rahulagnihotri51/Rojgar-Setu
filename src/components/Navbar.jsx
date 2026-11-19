
import {
  Bell,
  BriefcaseBusiness,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Navbar({
  role,
  setRole,
  onAlert,
  user,
  onLogout,
}) {
  const [open, setOpen] = useState(false);

  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((x) => x[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const handleLogout = () => {
    setOpen(false);
    onLogout();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="flex items-center gap-2 text-left"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-800 text-white">
            <BriefcaseBusiness size={20} />
          </span>

          <span>
            <b className="block text-base leading-4">
              Rojgar Setu
            </b>
            <small className="text-[10px] text-slate-500">
              काम से कामयाबी तक
            </small>
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 md:flex">

          <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRole("worker")}
              className={`rounded-lg px-3 py-2 ${
                role === "worker"
                  ? "bg-white text-blue-800 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Worker Mode
            </button>

            <button
              type="button"
              onClick={() => setRole("employer")}
              className={`rounded-lg px-3 py-2 ${
                role === "employer"
                  ? "bg-white text-blue-800 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Employer Mode
            </button>
          </div>

          <button
            type="button"
            aria-label="Live urgent alert"
            onClick={onAlert}
            className="relative rounded-xl p-2 text-amber-600 transition hover:bg-amber-50"
          >
            <Bell size={21} />
            <i className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">

            <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
              {initials}
            </span>

            <div className="leading-4">
              <b className="block max-w-24 truncate text-xs">
                {user?.name || "User"}
              </b>

              <small className="capitalize text-slate-500">
                {user?.role || role}
              </small>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-bold text-slate-500 transition hover:text-red-600"
            >
              Logout
            </button>

          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-slate-100 bg-white p-4 md:hidden">

          <p className="mb-3 text-sm font-bold">
            {user?.name || "User"}

            <span className="font-normal capitalize text-slate-500">
              {" "}· {user?.role || role}
            </span>
          </p>

          <div className="grid grid-cols-2 gap-2">

            <button
              type="button"
              onClick={() => {
                setRole("worker");
                setOpen(false);
              }}
              className="btn-secondary"
            >
              Worker
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("employer");
                setOpen(false);
              }}
              className="btn-secondary"
            >
              Employer
            </button>

          </div>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onAlert();
            }}
            className="mt-3 w-full text-center text-sm font-semibold text-amber-700"
          >
            View live urgent alert
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 w-full text-center text-sm font-semibold text-red-600"
          >
            Logout
          </button>

        </div>
      )}
    </header>
  );
}
