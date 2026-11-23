import { useEffect, useState } from "react";
import { course, days } from "@/data/course";

function manilaParts(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: course.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  return { date: `${get("year")}-${get("month")}-${get("day")}`, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function toMinutes(clock) {
  const [h, m] = clock.split(":").map(Number);
  const hour = h < 8 ? h + 12 : h;
  return hour * 60 + m;
}

export function formatClock(clock) {
  const [h] = clock.split(":").map(Number);
  const pm = h < 8 || h === 12;
  return `${clock} ${pm ? "PM" : "AM"}`;
}

function daysBetween(a, b) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}

export function useNow(intervalMs = 60000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}

export function trainingStatus(now) {
  const { date, minutes } = manilaParts(now);
  const day = days.find((d) => d.date === date);
  if (date < course.start) {
    const n = daysBetween(date, course.start);
    return { phase: "before", label: n === 1 ? "Starts tomorrow, 8:00 AM" : `Starts in ${n} days`, day: null };
  }
  if (date > course.end) return { phase: "after", label: "The training has ended. Your 30-day plan starts now.", day: null };
  if (!day) return { phase: "between", label: "", day: null };
  const session = day.sessions.find((s) => minutes >= toMinutes(s.start) && minutes < toMinutes(s.end));
  if (minutes < toMinutes("8:00")) return { phase: "today", label: `Day ${day.number} starts at 8:00 AM`, day, session: null };
  if (minutes >= toMinutes("5:00")) return { phase: "today-done", label: `Day ${day.number} is done for today`, day, session: null };
  return { phase: "live", label: session ? `Now: ${session.title}` : `Day ${day.number} in progress`, day, session, minutes };
}

export function currentSession(now, day) {
  const { date, minutes } = manilaParts(now);
  if (date !== day.date) return null;
  return day.sessions.find((s) => minutes >= toMinutes(s.start) && minutes < toMinutes(s.end)) || null;
}
