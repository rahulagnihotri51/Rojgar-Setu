
import { useState } from "react";
import {
  BriefcaseBusiness,
  Bell,
  Menu,
  X,
} from "lucide-react";

export default function Navbar({ role, setRole, onAlert, user, onLogout }) {
  const [open, setOpen] = useState(false);

  const initials = user?.name
    ?.trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setOpen(false);
  };

  const handleLogout = () => {
    setOpen(false);
    onLogout?.();
  };

  const handleAlert = () => {
    setOpen(false);
    onAlert?.();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        <button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="flex items-center gap-2 text-left"
          aria-label="Rojgar Setu home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-800 text-white">
            <BriefcaseBusiness size={20} />
          </span>

          <span>
            <b className="block text-base leading-4">Rojgar Setu</b>
            <small className="text-[10px] text-slate-500">
              काम से कामयाबी तक
            </small>
          </span>
        </button>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRole("worker")}
              aria-pressed={role === "worker"}
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
              aria-pressed={role === "employer"}
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
            onClick={handleAlert}
            className="relative rounded-xl p-2 text-amber-600 hover:bg-amber-50"
          >
            <Bell aria-hidden="true" size={21} />
            <i className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
          </button>

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
              className="text-xs font-bold text-slate-500 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="grid h-11 w-11 place-items-center rounded-lg hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Main navigation"
          className="border-t border-slate-100 bg-white p-4 md:hidden"
        >
          <p className="mb-3 text-sm font-bold">
            {user?.name || "User"}
            <span className="font-normal capitalize text-slate-500">
              {" · "}{user?.role || role}
            </span>
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleRoleChange("worker")}
              aria-pressed={role === "worker"}
              className="btn-secondary min-h-11"
            >
              Worker
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange("employer")}
              aria-pressed={role === "employer"}
              className="btn-secondary min-h-11"
            >
              Employer
            </button>
          </div>

          <button
            type="button"
            onClick={handleAlert}
            className="mt-3 min-h-11 w-full text-center text-sm font-semibold text-amber-700"
          >
            View live urgent alert
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 min-h-11 w-full text-center text-sm font-semibold text-red-600"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}
