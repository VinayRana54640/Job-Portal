import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header({ navigateAuth }) {
  const { isLogin, user, logout } = useAuth(); // assumes user + logout exist [memory:2]
  const { shortlistedCount, setshortlistedCount } = useState(6);
  const { isPremium, setisPremium } = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false); // menu open state [memory:2]
  const menuRef = useRef(null); // ref for click-outside [memory:2]
  const btnRef = useRef(null); // ref to return focus after close [memory:2]

  const navigateToProfileView = () => {
    router.push("/profile-views");
  };

  // Close on outside click or Escape
  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return; // [memory:2]
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false); // [memory:2]
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false); // [memory:2]
    };
    document.addEventListener("mousedown", onDocClick); // [memory:2]
    document.addEventListener("keydown", onKey); // [memory:2]
    return () => {
      document.removeEventListener("mousedown", onDocClick); // [memory:2]
      document.removeEventListener("keydown", onKey); // [memory:2]
    };
  }, [open]);

  const handleLogout = async () => {
    try {
      await logout(); // from AuthContext [memory:2]
      setOpen(false); // [memory:2]
    } catch (e) {
      // optional: toast error [memory:2]
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 min-w-0">
          <img
            src="logo1.png"
            alt="Job4Grads"
            className="h-8 w-8 rounded shrink-0"
          />
          <span className="font-semibold text-slate-900 truncate">
            Job4Grads
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-slate-700">
          <a href="joblist" className="hover:text-slate-900">
            Jobs
          </a>
          <a href="/subscription" className="hover:text-slate-900">
            Pricing
          </a>
          <a href="/contact" className="hover:text-slate-900">
            Contact us
          </a>
        </nav>

        {/* Actions */}
        <div className="relative flex items-center gap-3">
          {/* <a
            href="#employers"
            className="hidden sm:inline-flex px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            aria-label="For Employers"
          >
            For Employers
          </a> */}

          {isLogin() ? (
            <div className="relative">
              <div class="flex gap-2">
                <button
                  type="button"
                  className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-rose-300 bg-rose-50/50 hover:bg-rose-100/50 transition animate-pulse"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-rose-600"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
                  </svg>

                  <div className="flex flex-col items-start -my-1">
                    <span className="text-[12px] font-medium text-slate-500  select-none">
                      {shortlistedCount} Shortlisted
                    </span>
                    <span className="text-[10px] text-rose-600 font-medium">
                      👀 247 recruiters
                    </span>
                  </div>

                  <span
                    className="text-xs font-bold text-rose-600 underline ml-1 whitespace-nowrap cursor-pointer"
                    onClick={navigateToProfileView}
                  >
                    See Who →
                  </span>
                </button>
                <button
                  ref={btnRef}
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={open}
                  aria-label="User menu"
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-2 px-2 py-1 rounded-full border border-slate-300 hover:bg-slate-50"
                >
                  <img
                    src={
                      user?.avatarUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=0ea5e9&color=fff&bold=true`
                    }
                    alt={user?.name || "User"}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="hidden sm:inline text-sm text-slate-700 max-w-[10rem] truncate">
                    {user?.name || "Profile"}
                  </span>
                  <svg
                    className="h-4 w-4 text-slate-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {open && (
                <div
                  ref={menuRef}
                  role="menu"
                  aria-label="User options"
                  className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-200 bg-white shadow-lg ring-1 ring-black/5 p-1"
                >
                  <a
                    href="/profile"
                    role="menuitem"
                    className="block w-full text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </a>
                  <button
                    role="menuitem"
                    className="block w-full text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              aria-label="Sign In"
              onClick={navigateAuth}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
