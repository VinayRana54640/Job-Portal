"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Auth Page (Phone-only: Login & Signup)
 * - Single page with tabs: Login and Signup
 * - Phone number -> send OTP -> verify OTP
 * - No Google or external OAuth options
 * - Tailwind CSS styling aligned to previous pages
 * - Replace mock APIs with real SMS provider (Firebase/Twilio/Backend)
 */

// Mock API shims: replace with real endpoints
async function apiSendOTP({ phone, mode }) {
  // TODO: integrate Firebase signInWithPhoneNumber or server that calls Twilio Verify
  // Return a token/confirmationId to be used when verifying
  await new Promise((r) => setTimeout(r, 700));
  if (!/^\+\d{10,15}$/.test(phone)) {
    throw new Error("Enter a valid E.164 phone number");
  }
  // Simulate confirmation id
  return {
    confirmationId: "mock-confirmation-" + Math.random().toString(36).slice(2),
  };
}

async function apiVerifyOTP({ confirmationId, code }) {
  await new Promise((r) => setTimeout(r, 700));
  if (code === "123456") {
    // Simulate success if test code used
    return {
      userId: "usr_" + Math.random().toString(36).slice(2),
      token: "mock_jwt",
    };
  }
  // For demo, accept any 6-digit numeric otp
  if (!/^\d{6}$/.test(code)) throw new Error("Invalid code");
  return {
    userId: "usr_" + Math.random().toString(36).slice(2),
    token: "mock_jwt",
  };
}

const bgUrl =
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop";

function useCountdown(initial = 30) {
  const [left, setLeft] = useState(initial);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  const reset = (v = initial) => setLeft(v);
  return { left, reset };
}

function OtpInputs({ value, onChange, length = 6 }) {
  const inputs = Array.from({ length });
  const refs = useRef([]);
  const handleChange = (idx, v) => {
    const digit = v.replace(/\D/g, "").slice(-1);
    const arr = value.split("");
    arr[idx] = digit || "";
    const next = arr.join("");
    onChange(next);
    if (digit && idx < length - 1) refs.current[idx + 1]?.focus();
  };
  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) refs.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < length - 1)
      refs.current[idx + 1]?.focus();
  };
  return (
    <div className="flex gap-2">
      {inputs.map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className="w-12 h-12 text-center rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 text-lg"
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          maxLength={1}
        />
      ))}
    </div>
  );
}

export default function AuthPage() {
  const { login, logout } = useAuth();
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");
  const [otp, setOtp] = useState("");
  const [agree, setAgree] = useState(false); // signup tos
  const [name, setName] = useState(""); // signup name
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fullPhone = useMemo(() => {
    const p = `${countryCode}${phone.replace(/\D/g, "")}`;
    return p;
  }, [countryCode, phone]);

  const { left, reset } = useCountdown(30);

  // Web OTP UX hints via autocomplete and inputMode as per web.dev best practices
  // Ensure SMS uses origin-bound format on backend for autofill on supported devices.

  const canSend = useMemo(() => {
    // rudimentary: allow 10+ digits after code
    if (mode == "signup") {
      const digits = phone.replace(/\D/g, "");
      if (digits.length < 10) return false;
    }

    if (mode === "signup" && !agree) return false;
    if (mode === "signup" && name.trim().length < 2) return false;
    return true;
  }, [phone, mode, agree, name]);

  const canVerify = /^\d{6}$/.test(otp);

  const sendOtp = async () => {
    try {
      const url = mode == "signup" ? "/api/auth/signup" : "/api/auth/login";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sendOtp",
          email: email,
          phoneNumber: phone,
          name: name,
        }),
      });

      if (res.ok) {
        setLoading(true);
        setMsg("");
        setOtpSent(true);
        reset(30);
        setMsg("OTP sent. Please enter the 6-digit code.");
      } else {
        const errorData = await res.json();
        console.error("Error:", errorData);

        // Show error to user (e.g., toast, alert, or state)
        alert(errorData.error || "Something went wrong");
      }
    } catch (e) {
      setMsg(e.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const url = mode == "signup" ? "/api/auth/signup" : "/api/auth/login";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verifyOtp",
          email: email,
          phoneNumber: phone,
          name: name,
          otp: otp,
        }),
      });

      setLoading(true);
      setMsg("");
      if (res.ok) {
        const data = await res.json();
        console.log("Success:", data);
        login({ _id: data.userId }, data.token);
        window.location.href = "/"; // or use Next.js router: router.push("/dashboard")
      } else {
        const errorData = await res.json();
        console.error("Error:", errorData);

        // Show error to user (e.g., toast, alert, or state)
        alert(errorData.error || "Something went wrong");
      }

      setMsg("Success! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (e) {
      setMsg(e.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white">
      {/* Visual side */}
      <aside
        className="hidden lg:block lg:w-1/2 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(2,6,23,0.55), rgba(2,6,23,0.55)), url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 p-10 text-white flex flex-col justify-between">
          <a href="/" className="flex items-center gap-2">
            <img
              src="https://logo.clearbit.com/recruit-holdings.com"
              alt="Job4Grads"
              className="h-9 w-9 rounded"
            />
            <span className="text-xl font-semibold">Job4Grads</span>
          </a>
          <div>
            <h2 className="text-3xl font-semibold leading-tight">
              Join Job4Grads to discover roles, track applications, and get
              matched instantly.
            </h2>
            <p className="mt-3 text-white/80">
              Phone-based authentication keeps accounts secure and fast to
              access.
            </p>
          </div>
          <div className="text-white/80 text-sm">
            © {new Date().getFullYear()} Job4Grads. All rights reserved.
          </div>
        </div>
      </aside>

      {/* Form side */}
      <section className="w-full lg:w-1/2 flex items-center justify-center px-4 md:px-8">
        <div className="w-full max-w-md py-10">
          <div className="mb-6 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 lg:hidden">
              <img
                src="https://logo.clearbit.com/recruit-holdings.com"
                alt="Job4Grads"
                className="h-8 w-8 rounded"
              />
              <span className="font-semibold text-slate-900">Job4Grads</span>
            </a>
          </div>

          <div className="inline-flex rounded-lg bg-slate-100 p-1">
            <button
              className={`px-4 py-2 rounded-md text-sm ${
                mode === "login"
                  ? "bg-white text-slate-900 shadow"
                  : "text-slate-700"
              }`}
              onClick={() => {
                setMode("login");
                setOtpSent(false);
                setMsg("");
              }}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm ${
                mode === "signup"
                  ? "bg-white text-slate-900 shadow"
                  : "text-slate-700"
              }`}
              onClick={() => {
                setMode("signup");
                setOtpSent(false);
                setMsg("");
              }}
            >
              Signup
            </button>
          </div>

          <h1 className="mt-6 text-2xl font-semibold text-slate-900">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-slate-600">
            {mode === "login"
              ? "Enter mobile number to receive a one-time code."
              : "Sign up with mobile number and verify using the SMS code."}
          </p>

          {!otpSent ? (
            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  Email
                </label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {mode === "signup" && (
                <>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">
                      Full name
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">
                      Mobile number
                    </label>
                    <div className="flex gap-2">
                      <select
                        className="w-28 rounded-lg border border-slate-300 px-3 py-2"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        <option value="+91">+91 IN</option>
                        <option value="+1">+1 US</option>
                        <option value="+44">+44 UK</option>
                        <option value="+61">+61 AU</option>
                        <option value="+971">+971 AE</option>
                      </select>
                      <input
                        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
                        placeholder="10-digit mobile"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        inputMode="numeric"
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Use an active number to receive your OTP via SMS.
                    </p>
                  </div>
                </>
              )}

              {mode === "signup" && (
                <label className="flex items-center gap-2 text-slate-700">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree((v) => !v)}
                  />
                  <span>I agree to the Terms and Privacy Policy.</span>
                </label>
              )}

              <button
                onClick={sendOtp}
                disabled={!canSend || loading}
                className={`w-full rounded-lg px-5 py-3 ${
                  canSend && !loading
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Enter the 6-digit code sent to {email}
                </label>
                <OtpInputs value={otp} onChange={setOtp} />
                <p className="mt-2 text-xs text-slate-500">
                  Tip: On supported devices, the code may auto-fill if SMS is
                  received while this page is open.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setMsg("");
                  }}
                  className="text-slate-700 hover:underline"
                >
                  Change number
                </button>
                <button
                  onClick={async () => {
                    if (left > 0) return;
                    await sendOtp();
                  }}
                  className={`text-slate-700 hover:underline ${
                    left > 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={left > 0 || loading}
                >
                  Resend OTP {left > 0 ? `(${left}s)` : ""}
                </button>
              </div>

              <button
                onClick={verifyOtp}
                disabled={!canVerify || loading}
                className={`w-full rounded-lg px-5 py-3 ${
                  canVerify && !loading
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>
            </div>
          )}

          {!!msg && (
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              {msg}
            </div>
          )}

          <div className="mt-8 text-xs text-slate-500">
            By proceeding, consent is given to receive SMS for verification.
            Message and data rates may apply.
          </div>
        </div>
      </section>
    </div>
  );
}
