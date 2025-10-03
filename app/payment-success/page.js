"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/axiosClient";

function SuccessHero({ onGoDashboard }) {
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          Payment successful — welcome aboard
        </h1>
        <p className="mt-3 text-white/90 max-w-2xl">
          The plan is now active and a receipt has been sent to the registered
          email; use the dashboard to access premium features immediately.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={onGoDashboard}
            className="px-5 py-3 rounded-lg bg-white text-slate-900 hover:bg-white/90"
          >
            Go to Dashboard
          </button>
          <a
            href="/joblist"
            className="px-5 py-3 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
          >
            Browse Jobs
          </a>
        </div>
      </div>
    </section>
  );
}

function SuccessDetails() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState("PRO");
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [email, setEmail] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [reference, setReference] = useState("");
  const [date, setDate] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const getOrderStatus = async () => {
    const orderId = searchParams.get("order_id") || "";
    const res = await api.get("/api/cashfree?order_id=" + orderId);
    console.log("Order status:", res.data);
    setAmount(res.data.order_amount);
    setOrderId(res.data.order_id);
    setEmail(res.data.customer_details.customer_email);
    setOrderStatus(res.data.order_status);
    setDate(new Date(res.data.created_at).toLocaleString());
    setIsSuccess(res.data.order_status === "PAID");
  };

  useEffect(() => {
    getOrderStatus();
  }, []);
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white">
            <h2 className="text-2xl font-semibold text-slate-900">
              Payment summary
            </h2>
            <p className="text-slate-600 mt-2">
              Keep this reference for records; a copy has been emailed and is
              available in Account & Billing.
            </p>

            <div
              className={`mt-5 rounded-lg px-4 py-3 border text-sm ${
                isSuccess
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-amber-200 bg-amber-50 text-amber-900"
              }`}
              role="status"
              aria-live="polite"
            >
              {isSuccess
                ? "Payment confirmed and plan activated."
                : "Payment is being verified; features will unlock once the payment is confirmed."}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-sm uppercase tracking-wide text-slate-500">
                  Plan
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  {plan}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-sm uppercase tracking-wide text-slate-500">
                  Amount
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  {amount}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-sm uppercase tracking-wide text-slate-500">
                  Order ID
                </div>
                <div className="mt-1 font-medium text-slate-900 break-all">
                  {orderId}
                </div>
              </div>
              {/* <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-sm uppercase tracking-wide text-slate-500">
                  Payment ID
                </div>
                <div className="mt-1 font-medium text-slate-900 break-all">
                  {paymentId}
                </div>
              </div> */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-sm uppercase tracking-wide text-slate-500">
                  Email
                </div>
                <div className="mt-1 font-medium text-slate-900 break-all">
                  {email}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-sm uppercase tracking-wide text-slate-500">
                  Payment Status
                </div>
                <div className="mt-1 font-medium text-slate-900">
                  {orderStatus}
                </div>
              </div>
              {/* <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-sm uppercase tracking-wide text-slate-500">
                  Reference
                </div>
                <div className="mt-1 font-medium text-slate-900 break-all">
                  {reference}
                </div>
              </div> */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-sm uppercase tracking-wide text-slate-500">
                  Date
                </div>
                <div className="mt-1 font-medium text-slate-900">{date}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* <a
                href="/account/billing"
                className="rounded-lg bg-slate-900 text-white px-5 py-3 hover:bg-slate-800"
              >
                View receipt
              </a> */}
              <a
                href="/joblist"
                className="rounded-lg bg-slate-100 text-slate-900 px-5 py-3 hover:bg-slate-200"
              >
                Browse jobs
              </a>
              {/* <a
                href="/resources"
                className="rounded-lg bg-slate-100 text-slate-900 px-5 py-3 hover:bg-slate-200"
              >
                Resources
              </a> */}
            </div>

            <p className="mt-4 text-xs text-slate-500">
              If payment details look incorrect, contact support with Order ID
              and Payment ID for quick resolution.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 p-6 bg-white">
            <h3 className="text-lg font-semibold text-slate-900">Need help?</h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>
                Email:{" "}
                <a
                  className="text-slate-900 hover:underline"
                  href="mailto:support@job4grads.com"
                >
                  support@job4grads.com
                </a>
              </li>
              <li>
                Phone: <span className="text-slate-900">+91 7895933824</span>
              </li>
              <li>Hours: Mon–Fri, 9:30–18:30 IST</li>
            </ul>

            <div className="mt-6 rounded-xl border border-slate-200 p-4 bg-slate-50">
              <h4 className="font-semibold text-slate-900">Next steps</h4>
              <ul className="mt-2 text-sm text-slate-700 space-y-1">
                <li>Access premium filters and alerts from the dashboard.</li>
                <li>Update profile visibility to attract employers.</li>
                <li>Download the receipt from Account & Billing anytime.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 p-6 bg-white">
            <h3 className="text-lg font-semibold text-slate-900">FAQs</h3>
            <ul className="mt-3 text-slate-700 space-y-3">
              <li>
                Where is the receipt? Check the email inbox and Account &
                Billing.
              </li>
              <li>
                Why is status pending? It updates after gateway confirmation.
              </li>
              <li>
                Can the plan change? Upgrades are available from the dashboard.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const goDashboard = () => router.push("/dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <SuccessHero onGoDashboard={goDashboard} />
      <SuccessDetails />
      <Footer />
    </div>
  );
}
