import type { Config } from "@netlify/functions";

// Runs every minute — advances PENDING→OPEN (openTime passed) and OPEN→CLOSED (closeTime passed).
export default async () => {
  const baseUrl = process.env.URL;
  const secret = process.env.CRON_SECRET;

  if (!baseUrl || !secret) {
    console.error("Missing URL or CRON_SECRET env var");
    return;
  }

  const res = await fetch(`${baseUrl}/api/cron/status-transition`, {
    method: "POST",
    headers: {
      "x-cron-secret": secret,
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    console.error(`Status transition failed: ${res.status}`);
    return;
  }

  const data = await res.json();
  console.log(`Status transition complete:`, data);
};

export const config: Config = {
  schedule: "* * * * *",
};
