
import {
  BriefcaseBusiness,
  LockKeyhole,
  LogIn,
  MapPin,
  UserPlus,
  Users,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { api } from "../api";
import { categories } from "../mockData";

export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("worker");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    identifier: "",
    password: "",
    skill: "Electrician",
    location: "Mathura",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const data =
        mode === "login"
          ? await api.login({
              identifier: form.identifier,
              password: form.password,
            })
          : await api.register({
              name: form.name,
              identifier: form.identifier,
              password: form.password,
              role,
              skill: role === "worker" ? form.skill : "",
              location: form.location,
            });

      onAuth(data);
    } catch (err) {
      setError(`${err.message}. You can still use Quick Demo Login.`);
    } finally {
      setBusy(false);
    }
  };

  const demo = async (demoRole) => {
    setBusy(true);
    setError("");

    try {
      onAuth(
        await api.login({
          identifier:
            demoRole === "worker" ? "ravi@demo.in" : "metro@demo.in",
          password: "demo123",
        })
      );
    } catch {
      onAuth({
        token: "demo-session",
        user: {
          id: `demo-${demoRole}`,
          name:
            demoRole === "worker" ? "Ramesh Sharma" : "Priya Agarwal",
          role: demoRole,
          skill: demoRole === "worker" ? "Electrician" : "",
          availability: true,
        },
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#082657] via-[#123f83] to-[#0b2b5e] p-4 sm:grid sm:place-items-center">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[.9fr_1.1fr]">
        <section className="hidden flex-col justify-between bg-[#0c3470] p-10 text-white md:flex">
          <div>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15">
              <BriefcaseBusiness />
            </span>

            <h1 className="mt-6 text-3xl font-black leading-tight">
              Right Work.
              <br />
              Right Worker.
              <br />
              <span className="text-amber-300">Right Time.</span>
            </h1>

            <p className="mt-4 text-sm leading-6 text-blue-100">
              Join Mathura & NCR’s trusted local opportunity network.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm">
            <b className="block">Safe. Local. Verified.</b>
            <span className="text-blue-100">
              Your profile helps better work find you.
            </span>
          </div>
        </section>

        <section className="p-6 sm:p-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
                Rojgar Setu
              </p>
              <h2 className="mt-1 text-2xl font-black text-slate-900">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h2>
            </div>

            <BriefcaseBusiness className="text-blue-700 md:hidden" />
          </div>

          <div className="mt-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-sm font-bold">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-lg py-2 ${
                mode === "login"
                  ? "bg-white text-blue-800 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Log in
            </button>

            <button
              type="button"
              onClick={() => setMode("register")}
              className={`rounded-lg py-2 ${
                mode === "register"
                  ? "bg-white text-blue-800 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "register" && (
              <>
                <Field label="I am a">
                  <div className="grid grid-cols-2 gap-2">
                    <RoleButton
                      active={role === "worker"}
                      onClick={() => setRole("worker")}
                      icon={<Users size={16} />}
                      text="Worker"
                    />
                    <RoleButton
                      active={role === "employer"}
                      onClick={() => setRole("employer")}
                      icon={<BriefcaseBusiness size={16} />}
                      text="Employer"
                    />
                  </div>
                </Field>

                <Field label="Full name">
                  <input
                    required
                    className="input"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                  />
                </Field>
              </>
            )}

            <Field label="Phone or email">
              <input
                required
                className="input"
                value={form.identifier}
                onChange={(e) => update("identifier", e.target.value)}
                placeholder="name@example.com or 98xxxxxx"
              />
            </Field>

            <Field label="Password">
              <div className="relative">
                <LockKeyhole
                  size={16}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  required
                  minLength="6"
                  className="input pl-9 pr-10"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Minimum 6 characters"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            {mode === "register" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {role === "worker" && (
                  <Field label="Primary skill">
                    <select
                      className="input"
                      value={form.skill}
                      onChange={(e) => update("skill", e.target.value)}
                    >
                      {categories.map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </Field>
                )}

                <Field label="Location">
                  <div className="relative">
                    <MapPin
                      size={15}
                      className="absolute left-3 top-3 text-slate-400"
                    />
                    <input
                      required
                      className="input pl-8"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                    />
                  </div>
                </Field>
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-xs text-red-700"
              >
                {error}
              </p>
            )}

            <button disabled={busy} className="btn-primary w-full">
              {mode === "login" ? <LogIn size={17} /> : <UserPlus size={17} />}
              {busy
                ? "Please wait…"
                : mode === "login"
                  ? "Log in securely"
                  : "Create account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-slate-400 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">
            OR
          </div>

          <p className="mb-3 text-center text-xs font-bold text-slate-500">
            Quick Demo Login
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => demo("worker")}
              className="btn-secondary py-2 text-xs"
            >
              Demo Worker
            </button>

            <button
              type="button"
              onClick={() => demo("employer")}
              className="btn-secondary py-2 text-xs"
            >
              Demo Employer
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
