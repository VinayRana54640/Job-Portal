import React, { Suspense } from "react";
import JobDescriptionClient from "./client";

export default function JobDescriptionPage() {
  return (
    <Suspense fallback={<div>Loading job...</div>}>
      <JobDescriptionClient />
    </Suspense>
  );
}
