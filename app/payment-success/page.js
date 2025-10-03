import React, { Suspense } from "react";
import PaymentSuccessPageClient from "./client";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading job...</div>}>
      <PaymentSuccessPageClient />
    </Suspense>
  );
}
