import type { Config } from "@netlify/functions";

// Runs every 5 minutes — refreshes SGA prices for OPEN games where all picks are in.
// The first price is set when the last player submits; this keeps it current as odds move.
export default async () => {
  const baseUrl = process.env.URL;
  const secret = process.env.CRON_SECRET;

  if (!baseUrl || !secret) {
    console.error("Missing URL or CRON_SECRET env var");
    return;
  }

  const res = await fetch(`${baseUrl}/api/cron/price-refresh`, {
    method: "POST",
    headers: {
      "x-cron-secret": secret,
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    console.error(`Price refresh failed: ${res.status}`);
    return;
  }

  const data = await res.json();
  console.log(`Price refresh complete:`, data);
};

export const config: Config = {
  schedule: "*/5 * * * *",
};
