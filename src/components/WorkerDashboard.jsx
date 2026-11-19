
import {
  Award,
  MapPin,
  SlidersHorizontal,
  Star,
  UserRoundCheck,
  BriefcaseBusiness,
  Search
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { categories } from '../mockData'
import JobCard from './JobCard'

export default function WorkerDashboard({
  jobs,
  skill,
  setSkill,
  applications,
  onApply,
  notify,
  user,
  onAvailability
}) {
  const [available, setAvailable] = useState(user?.availability ?? true)

  const [radius, setRadius] = useState(() => {
    return Number(localStorage.getItem('rs-radius')) || 10
  })

  const [type, setType] = useState('All')
  const [tab, setTab] = useState('feed')

  const filtered = useMemo(() => {
    return jobs.filter(job => {
      const skillMatch = !skill || job.skill === skill
      const distanceMatch = Number(job.distance) <= radius

      const typeMatch =
        type === 'All' ||
        (type === 'On-Demand / Urgent'
          ? job.type === 'On-Demand' || job.urgent
          : job.type === type)

      return skillMatch && distanceMatch && typeMatch
    })
  }, [jobs, skill, radius, type])

  const toggle = () => {
    const nextAvailability = !available

    setAvailable(nextAvailability)
    onAvailability(nextAvailability)

    notify(
      nextAvailability
        ? 'You are visible to nearby employers'
        : 'You are now offline'
    )
  }

  const changeRadius = event => {
    const value = Number(event.target.value)

    setRadius(value)
    localStorage.setItem('rs-radius', String(value))
  }

  const resetFilters = () => {
    setSkill('')
    setType('All')
    setRadius(10)
    localStorage.setItem('rs-radius', '10')
  }

  const status = job => {
    return (
      jobs.find(item => item.id === job.id)
        ?.applicants?.find(
          applicant => String(applicant.workerId) === String(user?.id)
        )?.status ||
      job.applicationStatus ||
      'Pending'
    )
  }

  const colors = {
    Pending: 'bg-amber-100 text-amber-700',
    Accepted: 'bg-emerald-100 text-emerald-700',
    Rejected: 'bg-red-100 text-red-700',
    Completed: 'bg-indigo-100 text-indigo-700'
  }

  const initials = user?.name
    ? user.name
        .trim()
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0].toUpperCase())
        .join('')
    : 'W'

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

        <p className="mt-2 text-sm text-slate-500">
          Discover nearby jobs that match your skills.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[310px_1fr]">

        {/* Worker Profile */}
        <aside className="card h-fit p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-blue-100 font-bold text-blue-800">
                {initials}
              </span>

              <h3 className="mt-3 break-words font-bold text-slate-900">
                {user?.name || 'Ramesh Sharma'}
              </h3>

              <p className="mt-1 text-sm text-blue-700">
                {user?.skill || 'Electrician'} · {user?.experience || '4 years'}
              </p>
            </div>

            <Award className="shrink-0 text-amber-500" />
          </div>

          {/* Availability */}
          <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
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
              className={`h-7 w-12 shrink-0 rounded-full p-1 transition ${
                available ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white transition ${
                  available ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {/* Work Radius */}
          <div className="mt-5">
            <div className="flex justify-between text-sm">
              <b>Work radius</b>
              <span className="font-semibold text-blue-700">
                {radius} km
              </span>
            </div>

            <input
              value={radius}
              onChange={changeRadius}
              className="mt-3 w-full cursor-pointer accent-blue-700"
              type="range"
              min="1"
              max="25"
              aria-label="Work radius in kilometres"
            />

            <div className="flex justify-between text-xs text-slate-400">
              <span>1 km</span>
              <span>25 km</span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-5 border-t pt-4">
            <p className="text-sm">
              <b>Expected:</b> {user?.expectedRate || '₹850/day'}
            </p>

            <p className="mt-2 flex items-center gap-1 text-sm">
              <Star
                size={14}
                className="fill-amber-400 text-amber-400"
              />
              <b>{user?.rating || '4.8'}</b>
              <span className="text-slate-500">· trusted profile</span>
            </p>
          </div>
        </aside>

        {/* Main Dashboard */}
        <main className="min-w-0">

          {/* Tabs */}
          <div className="mb-4 flex overflow-x-auto border-b">
            <button
              type="button"
              onClick={() => setTab('feed')}
              className={`shrink-0 px-4 py-3 text-sm font-bold transition ${
                tab === 'feed'
                  ? 'border-b-2 border-blue-700 text-blue-800'
                  : 'text-slate-500 hover:text-blue-700'
              }`}
            >
              Job discovery
            </button>

            <button
              type="button"
              onClick={() => setTab('applications')}
              className={`shrink-0 px-4 py-3 text-sm font-bold transition ${
                tab === 'applications'
                  ? 'border-b-2 border-blue-700 text-blue-800'
                  : 'text-slate-500 hover:text-blue-700'
              }`}
            >
              My applications

              <span className="ml-1 rounded-full bg-blue-100 px-1.5 text-xs text-blue-800">
                {applications.length}
              </span>
            </button>
          </div>

          {/* Applications Tab */}
          {tab === 'applications' ? (
            <div className="card p-5 sm:p-6">
              {applications.length ? (
                <>
                  <h3 className="font-bold text-slate-900">
                    Applications sent
                  </h3>

                  <div className="mt-4 space-y-3">
                    {applications.map(job => (
                      <div
                        key={job.id}
                        className="flex flex-col gap-3 rounded-xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <b className="block break-words text-sm text-slate-900">
                            {job.title}
                          </b>

                          <small className="text-slate-500">
                            {job.company}
                          </small>
                        </div>

                        <span
                          className={`pill self-start sm:self-auto ${
                            colors[status(job)] || colors.Pending
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

                  <p className="mt-3 font-semibold text-slate-700">
                    No applications yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Jobs you apply for will appear here.
                  </p>

                  <button
                    type="button"
                    onClick={() => setTab('feed')}
                    className="btn-primary mt-4"
                  >
                    Explore jobs
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="card mb-5 p-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    size={18}
                    className="text-blue-700"
                  />

                  <b className="text-sm">Filter opportunities</b>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <select
                    value={skill}
                    onChange={event => setSkill(event.target.value)}
                    className="input"
                    aria-label="Filter by skill"
                  >
                    <option value="">All skills</option>

                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <select
                    value={type}
                    onChange={event => setType(event.target.value)}
                    className="input"
                    aria-label="Filter by job type"
                  >
                    {[
                      'All',
                      'On-Demand / Urgent',
                      'Part-Time',
                      'Permanent',
                      'Short-Term'
                    ].map(item => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={13} />
                    Within {radius} km of Mathura
                  </p>

                  {(skill || type !== 'All' || radius !== 10) && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900"
                    >
                      Reset filters
                    </button>
                  )}
                </div>
              </div>

              {/* Job Results */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-sm text-slate-500">
                  <b className="text-slate-900">{filtered.length}</b>{' '}
                  {filtered.length === 1 ? 'match' : 'matches'} for you
                </p>
              </div>

              {filtered.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {filtered.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      applied={applications.some(
                        application => application.id === job.id
                      )}
                      onApply={onApply}
                    />
                  ))}
                </div>
              ) : (
                <div className="card px-5 py-12 text-center">
                  <Search
                    size={36}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-3 font-bold text-slate-800">
                    No jobs found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your skill, job type or work radius.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="btn-primary mt-4"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </section>
  )
}
