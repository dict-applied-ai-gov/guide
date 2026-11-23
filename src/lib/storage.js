import { useCallback, useEffect, useState } from "react";

const PREFIX = "aag:";
const EVENT = "aag-storage";

export function readStored(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStored(key, value) {
  try {
    if (value === undefined) window.localStorage.removeItem(PREFIX + key);
    else window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the page keeps working for this visit */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: key }));
}

export function useStored(key, fallback) {
  const [value, setValue] = useState(() => readStored(key, fallback));

  useEffect(() => {
    const sync = (e) => {
      if (e.type === "storage" && e.key !== PREFIX + key) return;
      if (e.type === EVENT && e.detail !== key) return;
      setValue(readStored(key, fallback));
    };
    window.addEventListener("storage", sync);
    window.addEventListener(EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(EVENT, sync);
    };
    // fallback is a literal at each call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        writeStored(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return [value, update];
}

export function useStorageVersion() {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const bump = () => setVersion((v) => v + 1);
    window.addEventListener("storage", bump);
    window.addEventListener(EVENT, bump);
    return () => {
      window.removeEventListener("storage", bump);
      window.removeEventListener(EVENT, bump);
    };
  }, []);
  return version;
}
