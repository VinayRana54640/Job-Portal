"use client";

import React, { useEffect } from "react";

export function PaymentConfirmModal({
  open,
  tier,
  processing,
  onClose,
  onConfirm,
}) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !tier) return null;

  const isFree = tier.priceMonthly === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h3
              id="confirm-title"
              className="text-lg font-semibold text-slate-900"
            >
              Confirm plan
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-700"
              aria-label="Close"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Summary */}
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-slate-900 font-medium">{tier.name}</div>
                  <p className="text-sm text-slate-600">{tier.blurb}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-slate-900">
                    {isFree ? "Free" : `₹${tier.priceMonthly}`}
                  </div>
                  {!isFree && (
                    <div className="text-sm text-slate-600">per month</div>
                  )}
                </div>
              </div>

              <ul className="mt-4 grid grid-cols-1 gap-2 text-slate-700">
                {tier.features &&
                  tier.features.slice(0, 6).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] text-white">
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Billing box */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Total due today</span>
                <span className="font-semibold text-slate-900">
                  {isFree ? "₹0" : `₹${tier.priceMonthly}`}
                </span>
              </div>
              {!isFree && (
                <p className="mt-1 text-xs text-slate-600">
                  Recurs monthly until cancelled; taxes may apply at checkout.
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="w-1/3 rounded-lg border border-slate-300 px-5 py-3 text-slate-700 hover:bg-white"
            >
              Back
            </button>
            <button
              disabled={processing}
              onClick={() => onConfirm()}
              className={`w-2/3 rounded-lg px-5 py-3 ${
                processing
                  ? "cursor-not-allowed opacity-70"
                  : "hover:bg-slate-800"
              } bg-slate-900 text-white`}
            >
              {"Pay Now"}
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            By continuing, agreement to the Terms and Refund Policy is implied.
          </p>
        </div>
      </div>
    </div>
  );
}
