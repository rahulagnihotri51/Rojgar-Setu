
import {
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

export default function JobCard({ job, applied, onApply }) {
  const match = Math.min(
    98,
    78 +
      (job.distance < 3 ? 10 : job.distance < 8 ? 6 : 2) +
      (job.urgent ? 4 : 0)
  );

  return (
    <article className="card p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

      {/* Job Header */}
      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">

            <span className="pill whitespace-nowrap bg-emerald-100 text-emerald-700">
              {match}% Match
            </span>

            <span
              className={`pill whitespace-nowrap ${
                job.urgent
                  ? "bg-amber-100 text-amber-800"
                  : "bg-blue-50 text-blue-800"
              }`}
            >
              {job.urgent ? "⚡ Urgent" : job.type}
            </span>

          </div>

          <h3 className="mt-3 break-words font-bold text-slate-900">
            {job.title}
          </h3>

          <p className="mt-0.5 truncate text-sm text-slate-500">
            {job.company}
          </p>

        </div>

        <b className="max-w-[110px] shrink-0 break-words text-right text-sm font-bold text-emerald-700">
          {job.pay}
        </b>

      </div>

      {/* Job Details */}
      <div className="mt-4 space-y-3 text-xs text-slate-600">

        <p className="flex items-center gap-2">
          <MapPin
            size={15}
            className="shrink-0 text-blue-700"
          />

          <span className="min-w-0 break-words">
            {job.location} ·{" "}
            <b>{job.distance} km away</b>
          </span>
        </p>

        <p className="flex items-center gap-2">
          <CalendarDays
            size={15}
            className="shrink-0 text-blue-700"
          />

          <span>{job.time}</span>
        </p>

        <p className="flex items-center gap-2">
          <Users
            size={15}
            className="shrink-0 text-blue-700"
          />

          <span>
            {job.workers} worker
            {job.workers > 1 ? "s" : ""} needed · {job.skill}
          </span>
        </p>

      </div>

      {/* Apply Button */}
      <button
        type="button"
        disabled={applied}
        onClick={() => onApply(job)}
        className={`mt-4 w-full transition ${
          applied
            ? "cursor-not-allowed rounded-xl bg-emerald-50 py-2.5 text-sm font-bold text-emerald-700"
            : "btn-primary"
        }`}
      >
        {applied ? "✓ Applied" : "Apply Now"}
      </button>

    </article>
  );
}
