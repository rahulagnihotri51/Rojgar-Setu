
import { Briefcase, MapPin, Star, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function WorkerCard({ worker, hired, onHire }) {
  const [history, setHistory] = useState(false);

  const initials =
    worker.initials ||
    worker.name
      ?.trim()
      .split(/\s+/)
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    "W";

  const rating = Number(worker.rating) || 0;
  const distance = Number(worker.distance) || 0;

  const match = Math.min(
    98,
    70 +
      (worker.available ? 12 : 0) +
      (distance < 3 ? 9 : 5) +
      Math.round(rating)
  );

  return (
    <article className="card p-4 transition duration-200 hover:shadow-md">

      {/* Worker Profile */}
      <div className="flex gap-3">

        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
          {initials}
        </span>

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-2">

            <div className="min-w-0 flex-1">
              <h3 className="break-words font-bold text-slate-900">
                {worker.name || "Worker"}
              </h3>

              <p className="break-words text-sm text-blue-700">
                {worker.skill || "General Worker"}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1">

              <span className="pill whitespace-nowrap bg-emerald-100 text-emerald-700">
                {match}% Match
              </span>

              <span
                className={`pill whitespace-nowrap ${
                  worker.available
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {worker.available ? "● Available" : "Offline"}
              </span>

            </div>
          </div>

          {/* Worker Details */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">

            <span className="inline-flex items-center gap-1">
              <Briefcase size={13} />
              {worker.experience || "Experience not specified"}
            </span>

            <span className="inline-flex items-center gap-1">
              <MapPin size={13} />
              {distance} km
            </span>

            <button
              type="button"
              aria-expanded={history}
              onClick={() => setHistory(!history)}
              className="inline-flex items-center gap-1 font-semibold text-amber-600 transition hover:text-amber-700"
            >
              <Star
                size={13}
                className="fill-amber-400"
              />

              {rating} ({worker.jobs || 0}) · Reviews

              <ChevronDown
                size={13}
                className={`transition-transform ${
                  history ? "rotate-180" : ""
                }`}
              />
            </button>

          </div>
        </div>
      </div>

      {/* Work History */}
      {history && (
        <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs">

          <b className="text-slate-800">
            Verified work history
          </b>

          {worker.history?.length ? (
            worker.history.map((h, i) => (
              <div
                key={i}
                className="mt-2 border-t border-slate-200 pt-2"
              >
                <p className="font-semibold text-slate-700">
                  ★ {h.rating} · {h.jobTitle}
                </p>

                <p className="mt-1 text-slate-600">
                  {h.review}
                </p>
              </div>
            ))
          ) : (
            <p className="mt-2 text-slate-500">
              {worker.jobs || 0} completed jobs with
              consistently strong ratings.
            </p>
          )}

        </div>
      )}

      {/* Bottom Section */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">

        <b className="text-sm text-emerald-700">
          {worker.rate || "Rate not specified"}
        </b>

        <button
          type="button"
          disabled={!worker.available || hired}
          onClick={() => onHire(worker)}
          className={
            hired
              ? "cursor-not-allowed rounded-xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700"
              : !worker.available
                ? "cursor-not-allowed rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400"
                : "btn-primary py-2"
          }
        >
          {hired
            ? "✓ Requested"
            : worker.available
              ? "Request Worker"
              : "Not available"}
        </button>

      </div>

    </article>
  );
}
