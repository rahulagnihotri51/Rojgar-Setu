
import {
  Award,
  MapPin,
  SlidersHorizontal,
  Star,
  UserRoundCheck,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { categories } from "../mockData";
import JobCard from "./JobCard";

export default function WorkerDashboard({
  jobs = [],
  skill,
  setSkill,
  applications = [],
  onApply,
  notify,
  user,
  onAvailability,
}) {
  const [available, setAvailable] = useState(user?.availability ?? true);

  const [radius, setRadius] = useState(() => {
    const savedRadius = Number(localStorage.getItem("rs-radius"));
    return savedRadius >= 1 && savedRadius <= 25 ? savedRadius : 10;
  });

  const [type, setType] = useState("All");
  const [tab, setTab] = useState("feed");

  useEffect(() => {
    localStorage.setItem("rs-radius", String(radius));
  }, [radius]);

  useEffect(() => {
    setAvailable(user?.availability ?? true);
  }, [user?.availability]);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchesSkill = !skill || j.skill === skill;
      const matchesRadius =
        j.distance == null || Number(j.distance) <= radius;

      const matchesType =
        type === "All" ||
        (type === "On-Demand / Urgent"
          ? j.type === "On-Demand" || j.urgent
          : j.type === type);

      return matchesSkill && matchesRadius && matchesType;
    });
  }, [jobs, skill, radius, type]);

  const toggle = () => {
    const value = !available;

    setAvailable(value);

    if (onAvailability) {
      onAvailability(value);
    }

    if (notify) {
      notify(
        value
          ? "You are visible to nearby employers"
          : "You are now offline"
      );
    }
  };

  const status = (job) => {
    const matchingJob = jobs.find(
      (item) => String(item.id) === String(job.id)
    );

    const applicant = matchingJob?.applicants?.find(
      (a) => String(a.workerId) === String(user?.id)
    );

    return (
      applicant?.status ||
      job.applicationStatus ||
      matchingJob?.applicationStatus ||
      "Pending"
    );
  };

  const colors = {
    Pending: "bg-amber-100 text-amber-700",
    Accepted: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-red-100 text-red-700",
    Completed: "bg-indigo-100 text-indigo-700",
  };

  return (
    <section
      id="dashboard"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6"
    >
      <div className="mb-7">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
          Worker workspace
        </span>

        <h2 className="mt-1 text-3xl font-black text-slate-900">
          Find your next opportunity
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[310px_1fr]">
        <aside className="card h-fit p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-blue-100 font-bold text-blue-800">
                {user?.name?.slice(0, 2).toUpperCase() || "RS"}
              </span>

              <h3 className="mt-3 font-bold">
                {user?.name || "Ramesh Sharma"}
              </h3>

              <p className="text-sm text-blue-700">
                {user?.skill || "Electrician"}
                {" · "}
                {user?.experience || "4 years"}
              </p>
            </div>

            <Award className="text-amber-500" />
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-3">
            <div>
              <b className="text-sm">Available Now</b>
              <p className="text-xs text-slate-500">
                Employers can find you
              </p>
            </div>

            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle availability"
              aria-pressed={available}
              className={`h-7 w-12 rounded-full p-1 ${
                available ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white transition ${
                  available ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          <div className="mt-5">
            <div className="flex justify-between text-sm">
              <b>Work radius</b>
              <span className="text-blue-700">{radius} km</span>
            </div>

            <input
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="mt-3 w-full accent-blue-700"
              type="range"
              min="1"
              max="25"
            />
          </div>

          <div className="mt-5 border-t pt-4">
            <p className="text-sm">
              <b>Expected:</b>{" "}
              {user?.expectedRate || "₹850/day"}
            </p>

            <p className="mt-2 flex items-center gap-1 text-sm">
              <Star
                size={14}
                className="fill-amber-400 text-amber-400"
              />
              <b>{user?.rating || "4.8"}</b>
              {" · trusted profile"}
            </p>
          </div>
        </aside>

        <main>
          <div className="mb-4 flex border-b">
            <button
              type="button"
              onClick={() => setTab("feed")}
              className={`px-4 py-3 text-sm font-bold ${
                tab === "feed"
                  ? "border-b-2 border-blue-700 text-blue-800"
                  : "text-slate-500"
              }`}
            >
              Job discovery
            </button>

            <button
              type="button"
              onClick={() => setTab("applications")}
              className={`px-4 py-3 text-sm font-bold ${
                tab === "applications"
                  ? "border-b-2 border-blue-700 text-blue-800"
                  : "text-slate-500"
              }`}
            >
              My applications
              <span className="ml-1 rounded-full bg-blue-100 px-1.5 text-xs text-blue-800">
                {applications.length}
              </span>
            </button>
          </div>

          {tab === "applications" ? (
            <div className="card p-6">
              {applications.length ? (
                <>
                  <h3 className="font-bold">Applications sent</h3>

                  <div className="mt-4 space-y-3">
                    {applications.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
                      >
                        <span>
                          <b className="block text-sm">{job.title}</b>
                          <small>{job.company}</small>
                        </span>

                        <span
                          className={`pill ${
                            colors[status(job)] ||
                            "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {status(job)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-10 text-center">
                  <UserRoundCheck
                    className="mx-auto text-slate-300"
                    size={36}
                  />

                  <p className="mt-3 font-semibold">
                    No applications yet
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="card mb-5 p-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    size={18}
                    className="text-blue-700"
                  />
                  <b className="text-sm">Filter opportunities</b>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <select
                    value={skill || ""}
                    onChange={(e) => setSkill(e.target.value)}
                    className="input"
                  >
                    <option value="">All skills</option>

                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>

                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="input"
                  >
                    {[
                      "All",
                      "On-Demand / Urgent",
                      "Part-Time",
                      "Permanent",
                      "Short-Term",
                    ].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <p className="mt-3 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin size={13} />
                  Within {radius} km of Mathura
                </p>
              </div>

              <p className="mb-3 text-sm text-slate-500">
                <b className="text-slate-900">{filtered.length}</b>{" "}
                matches for you
              </p>

              {filtered.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {filtered.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      applied={applications.some(
                        (a) => String(a.id) === String(job.id)
                      )}
                      onApply={onApply}
                    />
                  ))}
                </div>
              ) : (
                <div className="card py-10 text-center">
                  <p className="font-semibold text-slate-700">
                    No matching jobs found
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your skill, job type, or work radius.
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
}
