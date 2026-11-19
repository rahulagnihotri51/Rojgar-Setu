
import {
  ArrowRight,
  MapPin,
  Search,
  ShieldCheck,
  UsersRound,
  Zap,
} from "lucide-react";

import { categories } from "../mockData";

export default function Hero({ setRole, setSkill }) {

  const scrollToDashboard = () => {
    document.getElementById("dashboard")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleRole = (selectedRole) => {
    setRole(selectedRole);
    scrollToDashboard();
  };

  const handleSkill = (selectedSkill) => {
    setSkill(selectedSkill);
    scrollToDashboard();
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#092657] via-[#123f83] to-[#0c2d63] text-white">

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-18 sm:px-6 sm:py-24">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
              <ShieldCheck size={15} />
              Verified local opportunity network
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Right Work. Right Worker.{" "}
              <span className="text-amber-300">
                Right Time.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
              The trusted local bridge for skilled workers and
              businesses across Mathura & NCR.
            </p>

            {/* Search Section */}
            <div className="mt-7 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl sm:flex-row">

              <div className="flex flex-1 items-center gap-2 border-b border-slate-100 px-2 py-2 sm:border-b-0 sm:border-r">
                <Search size={18} className="shrink-0 text-blue-700" />

                <select
                  aria-label="Search skill"
                  onChange={(e) => setSkill(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-700 outline-none"
                >
                  <option value="">Search by skill</option>

                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-1 items-center gap-2 px-2 py-2">
                <MapPin size={18} className="shrink-0 text-blue-700" />

                <span className="text-sm text-slate-500">
                  Mathura, within 10 km
                </span>
              </div>

              <button
                type="button"
                onClick={scrollToDashboard}
                className="btn-primary bg-amber-500 hover:bg-amber-600"
              >
                Find matches
                <ArrowRight size={16} />
              </button>

            </div>

            {/* Role Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">

              <button
                type="button"
                onClick={() => handleRole("worker")}
                className="btn-primary bg-white text-blue-900 hover:bg-blue-50"
              >
                Find Work
                <span className="text-xs font-normal">
                  (Worker)
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleRole("employer")}
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold hover:bg-white/10"
              >
                Hire Workers
                <span className="text-xs font-normal">
                  (Employer)
                </span>
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">

          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            Explore popular work
          </p>

          <div className="flex gap-2 overflow-x-auto pb-1">

            {categories.map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => handleSkill(x)}
                className="whitespace-nowrap rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800 transition hover:bg-blue-100"
              >
                {x}
              </button>
            ))}

          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-slate-50">

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-5 sm:grid-cols-3 sm:px-6">

          <Stat
            icon={<UsersRound />}
            value="2,400+"
            label="Active Workers Nearby"
          />

          <Stat
            icon={<Zap />}
            value="38"
            label="Urgent Jobs Today"
          />

          <Stat
            icon={<ShieldCheck />}
            value="18 min"
            label="Average Match Time"
          />

        </div>
      </section>
    </>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-4">

      <span className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
        {icon}
      </span>

      <span>
        <b className="block text-xl">{value}</b>
        <small className="text-slate-500">{label}</small>
      </span>

    </div>
  );
}
