"use client";

import { useEffect, useState } from "react";

/**
 * A live order counter that fetches real data from /api/stats
 * and increments periodically to simulate real-time activity.
 */
export function LiveCounter() {
  const [count, setCount] = useState(47);

  useEffect(() => {
    // Fetch the real live order count from the API
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.liveOrders) setCount(data.liveOrders);
      })
      .catch(() => {});

    // Increment by 1-2 every 8-15 seconds (simulating new orders coming in)
    const interval = setInterval(() => {
      const increment = Math.random() > 0.5 ? 1 : 2;
      setCount((c) => c + increment);
    }, 8000 + Math.random() * 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="tabular-nums">
      {count}
    </span>
  );
}
