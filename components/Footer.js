export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <a href="/" className="flex items-center gap-2 min-w-0">
            <img
              src="https://logo.clearbit.com/recruit-holdings.com"
              alt="Job4Grads"
              className="h-8 w-8 rounded shrink-0"
            />
            <span className="font-semibold text-slate-900 truncate">
              Job4Grads
            </span>
          </a>
          <p className="text-slate-600 mt-3">
            Connecting talent with opportunity through intelligent matching.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Candidates</h4>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>
              <a href="/joblist">Browse Jobs</a>
            </li>
            {/* <li>
              <a href="#">Companies</a>
            </li> */}
            {/* <li>
              <a href="#">Salary Guide</a>
            </li> */}
            <li>
              <a href="/advice">Career Advice</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Job Seekers</h4>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>
              <a href="/joblist">Search Job</a>
            </li>
            {/* <li>
              <a href="#">Resume Search</a>
            </li> */}
            <li>
              <a href="/subscription">Pricing</a>
            </li>
            {/* <li>
              <a href="#">Enterprise</a>
            </li> */}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Company</h4>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>
              <a href="/about">About</a>
            </li>
            {/* <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">Investors</a>
            </li> */}
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} Job4Grads. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy">Privacy</a>
            <a href="/terms-conditions">Terms</a>
            {/* <a href="#">Cookies</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
