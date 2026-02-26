import { useEffect, useState } from "react";

export function useClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;

      setTime(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} ${ampm}`,
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
}
